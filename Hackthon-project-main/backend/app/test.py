from dotenv import load_dotenv
import os
from openai import OpenAI
import requests

load_dotenv()


def search(
        query: str
    ) :
        """Semantic vector search using OpenAI embeddings + Qdrant"""
        print(f"\n🔍 Searching: '{query}'")
        
        # Qdrant credentials
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
        
a = search("What is gazebo vs unity")
print(a)