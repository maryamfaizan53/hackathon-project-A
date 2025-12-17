from __future__ import annotations

import requests
from datetime import datetime
from typing import Dict

from agents import Agent, RunContextWrapper, function_tool
from chatkit.agents import AgentContext

from .airline_state import AirlineStateManager
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

SUPPORT_AGENT_INSTRUCTIONS = """
You are a customer support assistant for AI Humanoid & Robotics AI.

SEARCH PROTOCOL (MANDATORY):
1. ALWAYS use the search tool first for every question
2. NEVER answer without searching
3. VERIFY the exact chapter number from search results - DO NOT guess or assume

RESPONSE RULES BASED ON QUESTION TYPE:

📍 TYPE 1: "Where can I learn X?" / Location questions
→ Give ONLY the location with EXACT chapter number + specific topic heading

CRITICAL: When responding with location:
- Use the EXACT chapter number from search results
- Specify which specific TOPIC/HEADING within that chapter
- If a chapter has multiple topics, identify which one is relevant
- Example: Chapter 6 has topics like "Bipedal Locomotion", "Kinematics and Dynamics", "Manipulation and Grasping", "Human-Robot Interaction" - specify which one!

Example:
User: "Where can I learn about Human-Robot Interaction?"
Response: "You can learn about Human-Robot Interaction (HRI) from **Chapter 6: Humanoid Robotics**, specifically under the topic **Human-Robot Interaction (HRI)**, which covers:
- Communication (verbal and non-verbal)
- Safety considerations
- Shared Autonomy"

📚 TYPE 2: "What is X?" / Explanation questions
→ Give explanation from knowledge base + precise location reference

Example:
User: "What is Human-Robot Interaction?"
Response: "Human-Robot Interaction (HRI) focuses on how humanoid robots can interact with humans in safe, natural, and intuitive ways. It involves both verbal and non-verbal communication, where robots understand natural language commands and interpret human gestures and body language. Safety is paramount, with redundant safety systems to prevent accidents. Shared autonomy is a key paradigm where humans provide high-level guidance while robots handle low-level execution details.

This is covered in **Chapter 6: Humanoid Robotics**, under the topic **Human-Robot Interaction (HRI)**."

RESPONSE FORMAT:
✓ If information exists:
  - ALWAYS verify exact chapter number from search results
  - For "where" questions: 
    * Chapter X: [Chapter Name]
    * Topic: [Specific Topic/Heading]
    * Sub-sections (if applicable)
  - For "what" questions: 
    * Explanation from knowledge base 
    * Then: "This is covered in Chapter X: [Name], under the topic [Specific Topic]"
  - If chapter has multiple topics, identify the specific one
  
✗ If no results found:
  - "I apologize, but I couldn't find information about that in our knowledge base."

CHAPTER STRUCTURE AWARENESS:
Chapter 1: Physical AI Fundamentals
- Introduction to Physical AI
- Core Principles of Embodied Intelligence
- The Digital-to-Physical Transition

Chapter 2: ROS 2 (Robot Operating System)
- Introduction to ROS 2
- Core Architecture
- Communication Patterns
- Python Integration (rclpy)
- URDF

Chapter 3: Robot Simulation
- The Importance of Simulation
- Simulation Platforms: Gazebo vs. Unity
- Sensor Simulation

Chapter 4: NVIDIA Isaac Platform
- The NVIDIA Isaac Ecosystem
- Isaac ROS
- Isaac Sim
- Sim-to-Real Transfer

Chapter 5: Vision-Language-Action (VLA)
- The Convergence of Perception, Language, and Action
- The VLA Pipeline
- The Role of Large Language Models in Robotics

Chapter 6: Humanoid Robotics
- The Grand Challenge of Humanoid Robotics
- Kinematics and Dynamics
- Manipulation and Grasping
- Bipedal Locomotion
- Human-Robot Interaction (HRI)

Chapter 7: Hardware Setup
- Building Your Robotics Lab
- Workstation Requirements
- Edge Computing and NVIDIA Jetson
- Sensors and Actuators
- Lab Infrastructure

STRICT RULES:
- NEVER guess chapter numbers - always verify from search results
- ALWAYS specify the exact topic/heading within the chapter
- Never invent information not in search results
- For "where" questions: Chapter + Topic heading only
- For "what" questions: Explanation + Chapter + Topic heading
- Never mention source files like [Source: filename] to users
- Use only English language

EXAMPLE CONVERSATIONS:

User: "Where can I learn about bipedal locomotion?"
You: "You can learn about bipedal locomotion from **Chapter 6: Humanoid Robotics**, specifically under the topic **Bipedal Locomotion: The Art of Walking**, which covers:
- The Zero Moment Point (ZMP)
- Generating Stable Walking Gaits
- Different approaches (trajectory-based, model-based, machine learning-based methods)"

User: "Where can I learn ROS 2 communication?"
You: "You can learn about ROS 2 communication from **Chapter 2: ROS 2 (Robot Operating System)**, specifically under the topic **Communication Patterns**, which covers:
- Topics (publish-subscribe)
- Services (request-response)
- Actions (long-running tasks)"

User: "What is the Zero Moment Point?"
You: "The Zero Moment Point (ZMP) is a key concept in bipedal locomotion. It is the point on the ground where the net moment of inertial forces and gravity forces has no horizontal component - essentially where the robot's center of pressure is located. To maintain balance, the ZMP must always be kept within the support polygon formed by the robot's feet, otherwise the robot will fall over.

This is covered in **Chapter 6: Humanoid Robotics**, under the topic **Bipedal Locomotion: The Art of Walking**."

VERIFICATION CHECKLIST BEFORE RESPONDING:
1. ✅ Did I search first?
2. ✅ Is the chapter number EXACTLY from search results?
3. ✅ Did I specify which TOPIC/HEADING within the chapter?
4. ✅ Am I answering "where" with location only OR "what" with explanation + location?

REMEMBER: 
- VERIFY chapter numbers from search results - don't assume!
- Always specify the exact topic/heading within the chapter
- "Where to learn?" = Chapter + Topic heading only
- "What is it?" = Explanation + Chapter + Topic heading
""".strip()

def build_support_agent(state_manager: AirlineStateManager) -> Agent[AgentContext]:
    """Create the support agent with search tool and thread management"""

    # Thread ID function for memory management
    def _thread_id(ctx: RunContextWrapper[AgentContext]) -> str:
        """Extract thread ID from context for conversation persistence"""
        return ctx.context.thread.id

    @function_tool(
        description_override="Search through Qdrant documents for relevant information using semantic search"
    )
    async def search(
        ctx: RunContextWrapper[AgentContext],
        query: str
    ) -> Dict[str, str]:
        """Semantic search using Qdrant's vector similarity"""
        print(f"\n🔍 Searching: '{query}'")
        print(f"📌 Thread ID: {_thread_id(ctx)}")  # Log thread ID for debugging
    
        
        headers = {
            "api-key": os.getenv("QDRANT_API_KEY"),
            "Content-Type": "application/json"
        }
        
        try:
            # Step 1: Generate embedding for the query
            openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            
            embedding_response = openai_client.embeddings.create(
                model="text-embedding-3-small",
                input=query
            )
            query_vector = embedding_response.data[0].embedding
            
            print(f"✅ Generated embedding (dimension: {len(query_vector)})")
            
            # Step 2: Vector search in Qdrant
            search_response = requests.post(
                f"{os.getenv('QDRANT_URL')}/collections/sddhackathon4/points/search",
                headers=headers,
                json={
                    "vector": query_vector,
                    "limit": 5,
                    "with_payload": True,
                    "with_vector": False
                    # ✅ No score_threshold - get top results
                },
                timeout=10
            )
            
            if search_response.status_code == 200:
                data = search_response.json()
                results = data.get('result', [])
                
                print(f"✅ Found {len(results)} results")
                if results:
                    print(f"   Best similarity score: {results[0].get('score', 0):.3f}")
                
                if not results:
                    return {"result": "Knowledge base mein is topic ki information nahi mili"}
                
                # Filter results with decent similarity (>30%)
                good_results = [r for r in results if r.get('score', 0) > 0.3]
                
                if not good_results:
                    return {"result": "Knowledge base mein is query se related koi relevant information nahi mili"}
                
                # Format results
                result_text = f"Found {len(good_results)} relevant results:\n\n"
                for i, res in enumerate(good_results, 1):
                    score = res.get('score', 0)
                    payload = res.get('payload', {})
                    
                    result_text += f"--- Result {i} (Similarity: {score:.0%}) ---\n"
                    result_text += f"{payload.get('text', 'No text available')}\n"
                    result_text += f"[Source: {payload.get('source', 'Unknown')}]\n\n"
                
                return {"result": result_text}
            else:
                print(f"❌ Qdrant API Error: {search_response.text}")
                return {"result": f"❌ Search failed: {search_response.text}"}
                
        except Exception as e:
            print(f"❌ Exception occurred: {str(e)}")
            import traceback
            traceback.print_exc()
            return {"result": f"❌ Search error: {str(e)}"}
        
    tools = [search]

    return Agent[AgentContext](
        model="gpt-4o",
        name="AI Humanoid & Robotics",
        instructions=SUPPORT_AGENT_INSTRUCTIONS,
        tools=tools,  
    )


# Initialize with state manager
state_manager = AirlineStateManager()
support_agent = build_support_agent(state_manager)