# 🚀 Railway Deployment Checklist

## ✅ Pre-Flight Check (Already Done!)

- [x] Fixed `pyproject.toml` with all dependencies
- [x] Created `nixpacks.toml` for build configuration  
- [x] Updated `railway.json`
- [x] Pushed changes to GitHub

## 📋 Railway Configuration Steps

### Step 1: Access Railway Dashboard
1. Go to: **https://railway.app/dashboard**
2. Sign in with your GitHub account
3. Find your project (should be linked to your GitHub repo)

### Step 2: Configure Root Directory ⚠️ CRITICAL!
**This is the #1 reason deployments fail!**

1. Click on your service in Railway dashboard
2. Go to **Settings** tab
3. Scroll to **Source** section
4. Find **Root Directory** field
5. Enter: `backend`
6. Click **Save** or it will auto-save

**Why?** Your FastAPI app is in the `backend` folder, not the root!

### Step 3: Add Environment Variables

Click on **Variables** tab and add these:

#### Required Variables:

```env
SECRET_KEY=your-secret-key-here
GEMINI_API_KEY=your-google-gemini-api-key-here
```

#### Optional (if using database):
```env
DATABASE_URL=your-postgres-connection-string
```

**Where to get these values?**
- `SECRET_KEY`: From your local `.env` file in backend folder
- `GEMINI_API_KEY`: From your Google AI Studio account
- `DATABASE_URL`: From Railway PostgreSQL service (if you added one)

### Step 4: Add PostgreSQL Database (Optional)

If your app needs a database:

1. In your Railway project, click **New** → **Database** → **PostgreSQL**
2. Railway will automatically:
   - Create a PostgreSQL instance
   - Add `DATABASE_URL` to your variables
   - Connect it to your service

### Step 5: Deploy!

Railway should automatically deploy when you:
- Push code to GitHub (already done! ✅)
- Change environment variables
- Click "Redeploy" manually

**Watch the deployment:**
1. Click on your service
2. Go to **Deployments** tab
3. Click on the latest deployment
4. Monitor the logs in real-time

## 🔍 What to Look for in Logs

### Build Phase (Should see):
```
====== Building with Nixpacks ======
Installing Python 3.11...
Running: pip install --upgrade pip
Running: pip install -e .
Collecting fastapi...
Collecting uvicorn...
✓ Build completed successfully
```

### Deploy Phase (Should see):
```
Starting deployment...
Running: uvicorn app.main:app --host 0.0.0.0 --port $PORT
INFO: Uvicorn running on http://0.0.0.0:8080
INFO: Application startup complete.
Database initialized successfully! (Skipped)
```

## ✅ Verify Deployment Success

### Test 1: Health Check
Click on the Railway-generated URL or visit:
```
https://your-app-name.up.railway.app/
```

**Expected Response:**
```json
{
  "message": "FastAPI backend is running!",
  "features": ["Authentication", "User Management", "AI Chatbot via /api/query"]
}
```

### Test 2: API Documentation
Visit:
```
https://your-app-name.up.railway.app/docs
```

You should see FastAPI's interactive API documentation (Swagger UI)

### Test 3: Test an Endpoint
Try the authentication endpoint:
```
https://your-app-name.up.railway.app/api/auth/...
```

## 🚨 Common Issues & Quick Fixes

### Issue: "Application failed to start"

**Check 1: Root Directory**
- ✅ Make sure Root Directory = `backend`
- ❌ Common mistake: leaving it empty or setting it to `/`

**Check 2: Environment Variables**
- ✅ `SECRET_KEY` is set
- ✅ `GEMINI_API_KEY` is set
- ✅ No typos in variable names

**Check 3: Build Logs**
- Look for "ModuleNotFoundError" → dependency missing
- Look for "No module named 'app'" → Root directory wrong

### Issue: "Build succeeded but deploy failed"

**Check Deploy Logs for:**
- Port binding issues → Should use `$PORT` variable ✅ (already configured)
- Import errors → Check `app/main.py` imports
- Database connection → Add DATABASE_URL or comment out DB init

### Issue: "502 Bad Gateway"

**Possible causes:**
- App crashed after starting → Check deploy logs
- App is taking too long to start → Wait 30-60 seconds
- Port configuration wrong → We configured this correctly ✅

### Issue: Gemini API errors

**Solution:**
1. Verify `GEMINI_API_KEY` is correctly set in Railway Variables
2. Check your Google AI Studio account has API access enabled
3. Test the API key locally first

## 📊 Deployment Timeline

Typical deployment takes:
- **Build Phase**: 2-4 minutes (installing dependencies)
- **Deploy Phase**: 30-60 seconds (starting server)
- **Total**: ~3-5 minutes

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Build logs show "Build completed successfully"
- ✅ Deploy logs show "Uvicorn running on..."
- ✅ Railway URL returns JSON response
- ✅ `/docs` endpoint shows Swagger UI
- ✅ No error logs in "Logs" tab

## 🔗 Important Railway URLs

- **Dashboard**: https://railway.app/dashboard
- **Docs**: https://docs.railway.app
- **Discord Support**: https://discord.gg/railway
- **Status Page**: https://status.railway.app

## 📝 Next Steps After Deployment

1. **Copy your Railway URL** (e.g., `https://your-app.up.railway.app`)
2. **Update your frontend** to use this URL instead of localhost
3. **Test all features**: Auth, Chat, AI responses
4. **Set up monitoring**: Check Railway metrics and logs
5. **Configure custom domain** (optional): Railway Settings → Domains

## 🆘 Getting Help

If deployment still fails:

1. **Check Railway Logs**:
   - Build logs for installation issues
   - Deploy logs for runtime issues
   - Application logs for app errors

2. **Copy error messages** and share them

3. **Verify files are correct**:
   - `backend/pyproject.toml` has dependencies ✅
   - `backend/nixpacks.toml` exists ✅
   - `backend/railway.json` exists ✅
   - Root Directory = `backend` ⚠️

4. **Join Railway Discord** for community support

---

## 🎉 You're Ready!

All code fixes are complete and pushed to GitHub. Now just:
1. Set Root Directory to `backend` in Railway
2. Add your environment variables
3. Watch it deploy!

Good luck! 🚀
