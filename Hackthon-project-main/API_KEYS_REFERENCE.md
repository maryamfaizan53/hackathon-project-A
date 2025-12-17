# ========================================
# Backend Environment Variables
# ========================================

# JWT Authentication
SECRET_KEY=your-secret-key-here-minimum-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7

# Database - PostgreSQL Connection String
# Format: postgresql://username:password@host:port/database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# ========================================
# AI Provider API Keys (Multi-Provider Fallback)
# ========================================
# The chatbot will try providers in this order:
# 1. Gemini (recommended - generous free tier)
# 2. OpenAI (fallback if Gemini fails)
# 3. OpenRouter (fallback if OpenAI fails) 
# 4. Grok (last resort)
#
# Only GEMINI_API_KEY is required. Others are optional but recommended
# for better reliability and automatic fallback.

# Google Gemini API Key (Primary Provider)
# Get key: https://aistudio.google.com/app/apikey
# Free tier: Yes, very generous limits
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-1.5-flash

# OpenAI API Key (Fallback Provider 1)
# Get key: https://platform.openai.com/api-keys
# Free tier: No, requires payment method
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini

# OpenRouter API Key (Fallback Provider 2)
# Get key: https://openrouter.ai/keys
# Free tier: Yes, some models are free
OPENROUTER_API_KEY=your-openrouter-api-key-here
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free

# Grok API Key (Fallback Provider 3)
# Get key: https://console.x.ai/
# Free tier: Limited availability
GROK_API_KEY=your-grok-api-key-here
GROK_MODEL=grok-beta

# ========================================
# Setup Instructions
# ========================================
#
# 1. Copy these values to your backend/.env file
#
# 2. Fill in your actual values (at minimum, SECRET_KEY, DATABASE_URL, and GEMINI_API_KEY)
#
# 3. NEVER commit the .env file to version control
#    (it should already be in .gitignore)
#
# 4. For Railway deployment, set these in the Railway dashboard
#    under Variables tab
