# Railway Deployment Guide

This guide walks you through deploying the FastAPI backend to Railway and connecting your Vercel frontend to it.

## Prerequisites

- Railway account (sign up at [railway.app](https://railway.app) - free tier available)
- GitHub repository with your code
- Vercel account with deployed frontend

## Step 1: Prepare Environment Variables

Before deploying, you'll need the following environment variables for Railway. Open your `backend/.env` file and note these values:

- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret key
- `GEMINI_API_KEY` - Google Gemini API key
- Any other custom environment variables

## Step 2: Deploy to Railway

### Option A: Deploy via Railway Dashboard (Recommended)

1. **Go to [Railway.app](https://railway.app) and sign in**

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository: `samade747/full-project`

3. **Configure Service**:
   - Railway will auto-detect it's a Python app
   - Set the **Root Directory** to: `backend`
   - Railway will automatically use the `Procfile` and `railway.json` we created

4. **Add Environment Variables**:
   - Go to your project → Variables tab
   - Add each environment variable from your local `.env` file:
     ```
     DATABASE_URL=<your-postgres-url>
     SECRET_KEY=<your-secret-key>
     GEMINI_API_KEY=<your-gemini-api-key>
     ```
   - Railway provides a free PostgreSQL database if you need one (Add a New Service → Database → PostgreSQL)

5. **Deploy**:
   - Railway will automatically build and deploy
   - Wait for deployment to complete
   - Copy your Railway app URL (looks like: `https://your-app.up.railway.app`)

### Option B: Deploy via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Link to your project
railway link

# Add environment variables
railway variables set DATABASE_URL=<your-value>
railway variables set SECRET_KEY=<your-value>
railway variables set GEMINI_API_KEY=<your-value>

# Deploy
railway up
```

## Step 3: Configure Vercel Frontend

1. **Add Environment Variable in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to: Settings → Environment Variables
   - Add new variable:
     - **Name**: `BACKEND_API_URL`
     - **Value**: Your Railway URL (e.g., `https://your-app.up.railway.app`)
     - **Environment**: Select all (Production, Preview, Development)
   - Click "Save"

2. **Redeploy Frontend**:
   - Go to Deployments tab
   - Click on the latest deployment → "..." menu → "Redeploy"
   - Or push a new commit to trigger automatic deployment

## Step 4: Verify Deployment

### Test Backend Health

Open your Railway URL in a browser:
```
https://your-app.up.railway.app/
```

You should see:
```json
{
  "message": "FastAPI backend is running!",
  "features": ["Authentication", "User Management", "AI Chatbot via /api/query"]
}
```

### Test Authentication

1. Open your Vercel app: `https://full-project-kappa.vercel.app`
2. Open browser DevTools (F12) → Network tab
3. Try to sign up or log in
4. Verify the request goes to Railway (not localhost)
5. Check for successful response (200 status code)

### Test Chatbot

1. Navigate to a docs page
2. Open the chatbot panel
3. Send a test message
4. Verify you receive a response from Gemini AI

## Troubleshooting

### Issue: "ERR_CONNECTION_REFUSED"
- **Cause**: Vercel environment variable not set
- **Fix**: Double-check `BACKEND_API_URL` is set in Vercel and redeploy

### Issue: "Database connection failed"
- **Cause**: DATABASE_URL not configured in Railway
- **Fix**: Add DATABASE_URL to Railway environment variables

### Issue: "API key not configured"
- **Cause**: GEMINI_API_KEY not set
- **Fix**: Add GEMINI_API_KEY to Railway variables and redeploy

### Issue: "CORS error"
- **Cause**: Railway URL not allowed by CORS
- **Fix**: Backend already allows all origins (`allow_origins=["*"]`), should work by default

### Issue: Railway build fails
- **Check**: Railway logs in dashboard
- **Common fix**: Ensure `requirements.txt` is complete and `runtime.txt` specifies correct Python version

## Railway Database Setup (Optional)

If you need a PostgreSQL database:

1. In Railway project, click "New" → "Database" → "Add PostgreSQL"
2. Railway will automatically create a database and add `DATABASE_URL` to your environment
3. Copy the connection string to use in your backend
4. Update `app/database/db.py` to use the Railway DATABASE_URL

## Cost Estimate

**Railway Free Tier**:
- $5 worth of usage per month
- Enough for development and light production use
- Usage based on: execution time, memory, and network

**Vercel Free Tier**:
- Already included with your current deployment
- Unlimited bandwidth for personal projects

## Next Steps

- [ ] Set up Railway PostgreSQL database
- [ ] Configure database migrations
- [ ] Set up monitoring and logs
- [ ] Add custom domain (optional)
- [ ] Set up CI/CD pipeline (optional)

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
