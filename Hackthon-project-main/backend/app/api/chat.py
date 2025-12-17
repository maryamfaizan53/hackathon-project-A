# app/api/chat.py
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai
from openai import OpenAI
import requests
from typing import Optional, Dict, Any, List
from abc import ABC, abstractmethod

router = APIRouter()

# ========================================
# ABSTRACT AI PROVIDER BASE CLASS
# ========================================

class AIProvider(ABC):
    """Abstract base class for AI providers"""
    
    def __init__(self, name: str):
        self.name = name
    
    @abstractmethod
    def is_configured(self) -> bool:
        """Check if the provider has required API keys configured"""
        pass
    
    @abstractmethod
    def generate(self, prompt: str) -> str:
        """Generate a response for the given prompt"""
        pass
    
    def get_error_message(self, error: Exception) -> str:
        """Format provider-specific error message"""
        return f"❌ {self.name} error: {str(error)}"


# ========================================
# GEMINI PROVIDER (Primary)
# ========================================

class GeminiProvider(AIProvider):
    def __init__(self):
        super().__init__("Gemini")
        self.api_key = os.getenv("GEMINI_API_KEY")
        # Try gemini-1.5-flash first (newer), fallback to gemini-pro
        self.model_name = os.getenv("GEMINI_MODEL", os.getenv("MODEL_NAME", "gemini-1.5-flash"))
        
        if self.is_configured():
            genai.configure(api_key=self.api_key)
    
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your-gemini-api-key-here")
    
    def generate(self, prompt: str) -> str:
        try:
            model = genai.GenerativeModel(self.model_name)
            response = model.generate_content(prompt)
            return response.text if hasattr(response, 'text') else "No response generated."
        except Exception as e:
            error_msg = str(e).lower()
            if "quota" in error_msg or "429" in error_msg:
                raise Exception(f"API quota exceeded: {e}")
            elif "api_key" in error_msg or "401" in error_msg or "403" in error_msg:
                raise Exception(f"API key issue: {e}")
            else:
                raise Exception(f"Generation failed: {e}")


# ========================================
# OPENAI PROVIDER (Fallback 1)
# ========================================

class OpenAIProvider(AIProvider):
    def __init__(self):
        super().__init__("OpenAI")
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        
        if self.is_configured():
            self.client = OpenAI(api_key=self.api_key)
    
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your-openai-api-key-here")
    
    def generate(self, prompt: str) -> str:
        try:
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": "You are a helpful AI assistant specialized in Physical AI and Humanoid Robotics."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            error_msg = str(e).lower()
            if "quota" in error_msg or "rate_limit" in error_msg:
                raise Exception(f"Rate limit exceeded: {e}")
            elif "api_key" in error_msg or "authentication" in error_msg:
                raise Exception(f"Authentication failed: {e}")
            else:
                raise Exception(f"Generation failed: {e}")


# ========================================
# OPENROUTER PROVIDER (Fallback 2)
# ========================================

class OpenRouterProvider(AIProvider):
    def __init__(self):
        super().__init__("OpenRouter")
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.model_name = os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3.1-8b-instruct:free")
        self.api_url = "https://openrouter.ai/api/v1/chat/completions"
    
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your-openrouter-api-key-here")
    
    def generate(self, prompt: str) -> str:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://hackthon-project-dusky.vercel.app",
                "X-Title": "Physical AI Textbook"
            }
            
            data = {
                "model": self.model_name,
                "messages": [
                    {"role": "system", "content": "You are a helpful AI assistant specialized in Physical AI and Humanoid Robotics."},
                    {"role": "user", "content": prompt}
                ]
            }
            
            response = requests.post(self.api_url, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                raise Exception(f"Rate limit exceeded: {e}")
            elif e.response.status_code in [401, 403]:
                raise Exception(f"Authentication failed: {e}")
            else:
                raise Exception(f"HTTP error {e.response.status_code}: {e}")
        except Exception as e:
            raise Exception(f"Request failed: {e}")


# ========================================
# GROQ PROVIDER (Fallback 3) - Fast, Free Inference
# ========================================

class GroqProvider(AIProvider):
    def __init__(self):
        super().__init__("Groq")
        self.api_key = os.getenv("GROQ_API_KEY")  # Changed from GROK to GROQ
        self.model_name = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")  # Free, fast model
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"
    
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your-groq-api-key-here")
    
    def generate(self, prompt: str) -> str:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": self.model_name,
                "messages": [
                    {"role": "system", "content": "You are a helpful AI assistant specialized in Physical AI and Humanoid Robotics."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7
            }
            
            response = requests.post(self.api_url, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                raise Exception(f"Rate limit exceeded: {e}")
            elif e.response.status_code in [401, 403]:
                raise Exception(f"Authentication failed: {e}")
            else:
                raise Exception(f"HTTP error {e.response.status_code}: {e}")
        except Exception as e:
            raise Exception(f"Request failed: {e}")


# ========================================
# ANTHROPIC CLAUDE PROVIDER (Fallback 4) - Strong reasoning
# ========================================

class AnthropicProvider(AIProvider):
    def __init__(self):
        super().__init__("Anthropic")
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        self.model_name = os.getenv("ANTHROPIC_MODEL", "claude-3-haiku-20240307")  # Fastest, cheapest
    
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your-anthropic-api-key-here")
    
    def generate(self, prompt: str) -> str:
        try:
            from anthropic import Anthropic
            client = Anthropic(api_key=self.api_key)
            
            message = client.messages.create(
                model=self.model_name,
                max_tokens=1000,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            return message.content[0].text
        except Exception as e:
            error_msg = str(e).lower()
            if "credit" in error_msg or "quota" in error_msg:
                raise Exception(f"Credit/quota exceeded: {e}")
            elif "api_key" in error_msg or "authentication" in error_msg:
                raise Exception(f"Authentication failed: {e}")
            else:
                raise Exception(f"Generation failed: {e}")


# ========================================
# COHERE PROVIDER (Fallback 5) - Free tier available
# ========================================

class CohereProvider(AIProvider):
    def __init__(self):
        super().__init__("Cohere")
        self.api_key = os.getenv("COHERE_API_KEY")
        self.model_name = os.getenv("COHERE_MODEL", "command-r")  # Free tier model
        self.api_url = "https://api.cohere.ai/v1/chat"
    
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your-cohere-api-key-here")
    
    def generate(self, prompt: str) -> str:
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": self.model_name,
                "message": prompt,
                "temperature": 0.7
            }
            
            response = requests.post(self.api_url, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result["text"]
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                raise Exception(f"Rate limit exceeded: {e}")
            elif e.response.status_code in [401, 403]:
                raise Exception(f"Authentication failed: {e}")
            else:
                raise Exception(f"HTTP error {e.response.status_code}: {e}")
        except Exception as e:
            raise Exception(f"Request failed: {e}")


# ========================================
# CHATBOT FALLBACK MANAGER
# ========================================

class ChatbotFallbackManager:
    """Manages fallback between multiple AI providers"""
    
    def __init__(self):
        # Initialize providers in priority order (OpenRouter first per user request)
        self.providers: List[AIProvider] = [
            OpenRouterProvider(),    # FREE - Try first (user preference)
            GeminiProvider(),        # FREE - Google's fast model
            GroqProvider(),          # FREE - Extremely fast inference
            CohereProvider(),        # FREE - Good for general tasks
            AnthropicProvider(),     # Paid - Strong reasoning
            OpenAIProvider(),        # Paid - Last resort
        ]
    
    def generate_response(self, prompt: str) -> Dict[str, Any]:
        """
        Try each provider in order until one succeeds.
        Returns response with content and metadata.
        """
        errors = []
        
        for provider in self.providers:
            if not provider.is_configured():
                print(f"⚠️ {provider.name} not configured, skipping...")
                continue
            
            try:
                print(f"🔄 Trying {provider.name} provider...")
                content = provider.generate(prompt)
                print(f"✅ {provider.name} succeeded!")
                
                return {
                    "content": content,
                    "provider": provider.name.lower(),
                    "success": True
                }
            except Exception as e:
                error_msg = str(e)
                print(f"❌ {provider.name} failed: {error_msg}")
                errors.append(f"{provider.name}: {error_msg}")
                continue
        
        # All providers failed
        return self._generate_error_response(errors)
    
    def _generate_error_response(self, errors: List[str]) -> Dict[str, Any]:
        """Generate user-friendly error message when all providers fail"""
        
        configured_count = sum(1 for p in self.providers if p.is_configured())
        
        if configured_count == 0:
            return {
                "content": self._get_no_provider_message(),
                "provider": "none",
                "success": False
            }
        else:
            return {
                "content": self._get_all_failed_message(errors),
                "provider": "none",
                "success": False
            }
    
    def _get_no_provider_message(self) -> str:
        return """🤖 **AI Chatbot Not Configured**

To enable AI-powered responses, please configure at least one API key:

📋 **Quick Setup Guide:**

1. **Gemini (Recommended - Free Tier)**
   - Get key: https://aistudio.google.com/app/apikey
   - Add to `.env`: `GEMINI_API_KEY=your-key-here`

2. **OpenAI (Fallback)**
   - Get key: https://platform.openai.com/api-keys
   - Add to `.env`: `OPENAI_API_KEY=your-key-here`

3. **OpenRouter (Free Models)**
   - Get key: https://openrouter.ai/keys
   - Add to `.env`: `OPENROUTER_API_KEY=your-key-here`

4. **Grok (xAI)**
   - Get key: https://console.x.ai/
   - Add to `.env`: `GROK_API_KEY=your-key-here`

After adding your API key(s), restart the backend server.

💡 **Tip:** Configure multiple providers for automatic fallback and better reliability!
"""
    
    def _get_all_failed_message(self, errors: List[str]) -> str:
        error_list = "\n".join([f"  - {error}" for error in errors])
        
        return f"""❌ **All AI Providers Failed**

The chatbot tried multiple AI services but all encountered errors:

{error_list}

**Possible Solutions:**
1. Check your API keys are valid and have remaining quota
2. Verify your internet connection
3. Try again in a few moments (rate limits may be temporary)
4. Configure additional backup providers

Need help? Check the logs or contact support.
"""


# ========================================
# FAST API ENDPOINTS
# ========================================

# Initialize fallback manager
fallback_manager = ChatbotFallbackManager()

class QueryRequest(BaseModel):
    query: str
    selected_text: Optional[str] = None
    top_k: Optional[int] = 4

@router.post("/chatkit/session")
async def chatkit_session():
    """Return a session placeholder for frontend Chat widget."""
    return {"session": "AI_SESSION", "expires_in": 3600}

@router.post("/query")
async def query_endpoint(body: QueryRequest):
    """Chat query endpoint using multi-provider fallback system.
    If `selected_text` is provided, answers must be derived only from it.
    Otherwise, answers general questions about Physical AI & Humanoid Robotics.
    """
    
    # Build the prompt
    if body.selected_text:
        prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics.

Answer the following question based ONLY on the provided text context. Do not use external knowledge.

Context:
{body.selected_text}

Question: {body.query}

Answer:"""
    else:
        prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics. You help users understand concepts related to robotics, artificial intelligence, autonomous systems, humanoid robots, and related technologies.

Be helpful, concise, and technically accurate. If you don't know something, say so.

Question: {body.query}

Answer:"""
    
    # Use fallback manager to generate response
    result = fallback_manager.generate_response(prompt)
    
    # Return in OpenAI-compatible format for frontend compatibility
    return {
        "choices": [{
            "message": {
                "content": result["content"],
                "provider": result["provider"]  # Track which provider was used
            }
        }]
    }
