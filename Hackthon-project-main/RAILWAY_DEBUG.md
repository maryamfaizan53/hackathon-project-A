# Railway Deployment Debugging Guide

This guide helps you troubleshoot Railway deployment issues for the FastAPI backend.

## Quick Health Check

Once deployed, test these endpoints:

```bash
# Basic health check
curl https://hackthon-project-production.up.railway.app/health

# Database health check
curl https://hackthon-project-production.up.railway.app/db-health

# Root endpoint
curl https://hackthon-project-production.up.railway.app/
```

Expected responses:
- `/health`: `{"status":"healthy","service":"FastAPI Backend","version":"1.0.0"}`
- `/db-health`: Shows database connection status
- `/`: Shows API information and features

## Accessing Railway Logs

1. Go to https://railway.app/
2. Sign in to your account
3. Select your project: `hackthon-project-production`
4. Click on the "backend" service
5. Go to the "Deployments" tab
6. Click "View Logs" on the most recent deployment

### What to Look For in Logs

**Successful Startup:**
```
============================================================
🚀 Starting FastAPI Backend...
============================================================
✅ All required environment variables are set
🔄 Database connection attempt 1/3...
✅ Database connection successful on attempt 1
📊 Database health check: {'database_connected': True, ...}
✅ Database initialized successfully!
============================================================
✅ FastAPI Backend Started Successfully!
============================================================
```

**Database Connection Issues:**
```
⚠️ Database connection failed (attempt 1/3): connection timeout
   Retrying in 1.0 seconds...
❌ Failed to connect to database after 3 attempts
```

**Missing Environment Variables:**
```
⚠️ WARNING: Missing environment variables: SECRET_KEY, DATABASE_URL
   Some features may not work correctly!
```

## Environment Variables Checklist

Go to Railway Dashboard → Your Service → Variables tab and verify these are set:

### Required Variables

- [ ] **SECRET_KEY**: JWT secret key for authentication
  ```
  Example: VIT8dt_iKFtp3fcmcXPjCPTFS3uTqHntxuUus9DDK18
  ```

- [ ] **DATABASE_URL**: PostgreSQL connection string
  ```
  Format: postgresql://username:password@host:port/database
  Example: postgresql://user:pass@dpg-xxx.oregon-postgres.render.com/dbname
  ```

- [ ] **GEMINI_API_KEY**: Google Gemini API key for chatbot
  ```
  Example: AIzaSyDmgqT4G1LLb8M-tayLp32CYJQfdKoQiDI
  ```

- [ ] **ALGORITHM**: JWT algorithm (HS256)
  ```
  Default: HS256
  ```

- [ ] **ACCESS_TOKEN_EXPIRE_DAYS**: Token expiration in days
  ```
  Default: 7
  ```

- [ ] **MODEL_NAME**: Gemini model name
  ```
  Default: gemini-2.5-flash
  ```

### How to Set Variables in Railway

1. Go to your service in Railway dashboard
2. Click on "Variables" tab
3. Click "New Variable"
4. Enter the variable name and value
5. Click "Add"
6. Railway will automatically redeploy with new variables

## Common Issues and Fixes

### Issue 1: Connection Timeout / App Not Responding

**Symptoms:**
- `ERR_CONNECTION_TIMED_OUT`
- 500 errors on all endpoints
- Health endpoint not accessible

**Possible Causes:**
1. App crashed during startup
2. Database connection failed
3. Missing environment variables
4. Port binding issue

**Debug Steps:**
1. Check Railway logs for startup errors
2. Verify all environment variables are set
3. Test database connection separately
4. Check if Railway service is running

### Issue 2: Database Connection Failed

**Symptoms:**
```
⚠️ Database connection failed
❌ Database health check failed
```

**Possible Causes:**
1. Incorrect DATABASE_URL
2. Database is not accessible from Railway
3. Database credentials expired
4. Firewall blocking connection

**Debug Steps:**
1. Verify DATABASE_URL is correct
2. Check if database allows external connections
3. Test database connection from Railway shell:
   ```bash
   railway run python -c "from app.database.db import check_db_health; print(check_db_health())"
   ```
4. Check Render database settings (if using Render PostgreSQL)

### Issue 3: Missing Environment Variables

**Symptoms:**
```
⚠️ WARNING: Missing environment variables: SECRET_KEY
❌ CRITICAL ERROR: SECRET_KEY is missing or empty!
```

**Fix:**
1. Go to Railway dashboard → Variables
2. Add all required variables from checklist above
3. Wait for automatic redeployment

### Issue 4: 500 Error on Login Endpoint

**Symptoms:**
- `/health` works
- `/api/auth/login` returns 500

**Possible Causes:**
1. Database table doesn't exist
2. Database connection lost
3. Password hashing error
4. JWT token creation failed

**Debug Steps:**
1. Check `/db-health` endpoint
2. Look for errors in Railway logs mentioning "users table"
3. Verify SECRET_KEY is set correctly
4. Check if database was initialized (users table exists)

## Database Connection Testing

### Test Database URL Locally

```bash
cd backend
python -c "
from app.database.db import check_db_health
import json
print(json.dumps(check_db_health(), indent=2))
"
```

### Initialize Database

If the database exists but tables aren't created:

```bash
cd backend
python -c "
from app.database.db import init_db
init_db()
"
```

## Railway CLI Commands

Install Railway CLI:
```bash
npm install -g @railway/cli
```

Login:
```bash
railway login
```

View logs:
```bash
railway logs
```

Run commands in Railway environment:
```bash
railway run python -c "from app.database.db import check_db_health; print(check_db_health())"
```

## Verifying Deployment

After deployment, run this checklist:

1. **Health Check:**
   ```bash
   curl https://hackthon-project-production.up.railway.app/health
   ```
   Expected: `{"status":"healthy",...}`

2. **Database Health:**
   ```bash
   curl https://hackthon-project-production.up.railway.app/db-health
   ```
   Expected: `{"status":"healthy","database_connected":true,...}`

3. **Root Endpoint:**
   ```bash
   curl https://hackthon-project-production.up.railway.app/
   ```
   Expected: API info with features list

4. **CORS Test from Browser:**
   - Open https://hackthon-project-dusky.vercel.app
   - Open browser console
   - Should see "Backend API URL configured: https://hackthon-project-production.up.railway.app"
   - No CORS errors

5. **Login Test:**
   - Try logging in with test credentials
   - Check browser network tab for response
   - Should get 200 OK with token

## Contact Information

If issues persist:
1. Share Railway logs
2. Share error messages from browser console
3. Share database health check output
4. Verify all environment variables are set correctly

## Useful Links

- Railway Dashboard: https://railway.app/dashboard
- Railway Documentation: https://docs.railway.app/
- FastAPI Documentation: https://fastapi.tiangolo.com/
- PostgreSQL Connection Strings: https://www.postgresql.org/docs/current/libpq-connect.html
