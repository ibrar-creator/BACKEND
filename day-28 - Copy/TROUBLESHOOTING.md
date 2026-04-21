# TROUBLESHOOTING GUIDE - Authentication System

## Step 1: Verify Backend Setup

### 1.1 Check if `cors` package is installed
```bash
cd Backend
npm list cors
```
**Expected:** `cors` should be listed
**If missing:**
```bash
npm install cors
```

### 1.2 Check if `.env` file exists
```bash
cd Backend
ls -la | grep .env
```
**Expected:** You should see `.env` file
**If missing:** Create `Backend/.env` with:
```env
MONGO_URI=mongodb://Ibrar:CYEClq0ivUqeXUU4@ac-lg81eux-shard-00-00.v8rl0pp.mongodb.net:27017,ac-lg81eux-shard-00-01.v8rl0pp.mongodb.net:27017,ac-lg81eux-shard-00-02.v8rl0pp.mongodb.net:27017/?replicaSet=atlas-is7rxg-shard-0&ssl=true&authSource=admin
JWT_SECRET=0c82c488194e9dbfecb0014ea4a9af30086d9c7322ac61d94b3992c4eeea091e
```

### 1.3 Verify Backend Dependencies
```bash
cd Backend
npm install
```

---

## Step 2: Start Backend Server

### Option A: Using npm run dev (recommended)
```bash
cd Backend
npm run dev
```

**Expected Output:**
```
Server is running on port 3000
✓ Connected to MongoDB
```

### Option B: Using node directly (for testing)
```bash
cd Backend
node server.js
```

**Troubleshooting Output:**

| Output | Meaning | Solution |
|--------|---------|----------|
| `Error: Cannot find module 'cors'` | cors not installed | Run: `npm install cors` |
| `Error: Cannot find module 'dotenv'` | .env not loaded | Check: .env file exists and readable |
| `✗ MongoDB Connection Error` | Can't connect to MongoDB | Check: MONGO_URI is correct |
| `Server is running on port 3000` | ✓ Backend working | Continue to Step 3 |

---

## Step 3: Start Frontend Server

### In a NEW terminal window:
```bash
cd Frontend
npm run dev
```

**Expected Output:**
```
VITE v7.x.x  ready in xxx ms
➜ Local:   http://localhost:5173/
```

---

## Step 4: Test the Application

### 4.1 Open Browser
Go to: `http://localhost:5173`

### 4.2 Check Debug Status
- Click the **🔍 Debug Button** (top right corner)
- Should show: **"✓ Backend is running on http://localhost:3000"**
- If it shows red error, backend isn't running

### 4.3 If Backend Connection is ✓ Green
**Test Registration:**
1. Fill in registration form
2. Click "Register"
3. Should see success message (check browser console for details)
4. Should be redirected to main app

---

## Common Issues & Solutions

### ❌ Issue: "Backend is disconnected" (Red error)

**Cause:** Backend server not running

**Solution:**
1. Open new terminal
2. Run: `cd Backend && npm run dev`
3. Wait for: "Server is running on port 3000"
4. Back in browser, click 🔍 debug button → "Retry Connection"

---

### ❌ Issue: CORS Error in console
```
Access to XMLHttpRequest at 'http://localhost:3000/api/auth/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Cause:** CORS not properly configured

**Solution:**
1. Check `Backend/src/app.js` has CORS enabled:
   ```javascript
   app.use(cors({
     origin: "http://localhost:5173",
     credentials: true,
     ...
   }));
   ```
2. Restart backend: `npm run dev`

---

### ❌ Issue: "Cannot POST /api/auth/register"

**Cause:** Route not found or typo in endpoint

**Solution:**
1. Check `Backend/src/routes/auth.routes.js` exists
2. Should have:
   ```javascript
   router.post('/register', registerUser);
   router.post('/login', loginUser);
   router.get('/logout', logoutUser);
   router.get('/get-me', authUser, getMe);
   ```
3. Check routes are mounted in `app.js`:
   ```javascript
   app.use("/api/auth", authRoutes);
   ```

---

### ❌ Issue: Form submits but nothing happens

**Solution:**
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for error messages
4. Common errors:
   - `TypeError: Cannot read property 'username' of undefined` → Backend response format wrong
   - `401 Unauthorized` → Token/auth issue
   - `500 Internal Server Error` → Backend code error

---

### ❌ Issue: MongoDB Connection Error

**Cause:** Invalid MONGO_URI in .env

**Solution:**
1. Check `.env` file has correct MONGO_URI
2. If using local MongoDB:
   ```env
   MONGO_URI=mongodb://localhost:27017/faceapp
   ```
3. If using MongoDB Atlas:
   - Verify credentials are correct
   - Check IP whitelist includes your IP
   - Ensure replica set is working

---

### ❌ Issue: "User already exists" even for new user

**Cause:** Database still has old records

**Solution:**
1. Clear MongoDB collection:
   ```
   Use MongoDB Compass or Atlas dashboard
   Delete all documents from 'users' collection
   ```
2. Or use new unique username/email

---

## Debug Mode - Detailed Logging

All requests are logged to console. Open DevTools (F12) and check:

### Console Logs Example:
```
🔄 Checking auth status...
✓ Auth check response status: 401
✗ No valid session

🔄 Registering user: john_doe
→ Register response: 201 {message: "User registered successfully", user: {...}}
✓ Registration successful

🔄 Logging in user: john@example.com
→ Login response: 200 {message: "User logged in successfully", user: {...}}
✓ Login successful
```

---

## Complete Startup Checklist

- [ ] Backend `.env` file exists
- [ ] `npm install cors` completed
- [ ] Backend starts without errors
- [ ] MongoDB shows: "✓ Connected to MongoDB"
- [ ] Frontend starts without errors
- [ ] Debug status shows: "✓ Backend is running"
- [ ] Can fill and submit registration form
- [ ] Registration response shows success in console
- [ ] Logged in user shows in navbar
- [ ] Logout button works
- [ ] Can login again after logout

---

## Quick Reset

If still having issues, do a complete reset:

### Backend Reset:
```bash
cd Backend
rm -rf node_modules package-lock.json
npm install
npm install cors
# Update .env file
npm run dev
```

### Frontend Reset:
```bash
cd Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Getting Help

1. **Check console errors** (F12 → Console)
2. **Check backend terminal** for error messages
3. **Check .env file** has correct values
4. **Use debug button** 🔍 to verify backend connection
5. **Look at response** in Network tab (F12 → Network)

---

## Network Debugging

### Using Network Tab (F12 → Network):

1. Open DevTools (F12)
2. Go to Network tab
3. Try to register/login
4. Click on the failed request
5. Check:
   - **Status:** Should be 200 (login), 201 (register), 400 (error)
   - **Response:** Check error message
   - **Headers:** Verify Content-Type is application/json

### Example Good Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Example Bad Response:
```json
{
  "message": "User with the same email or username already exists"
}
```

---

## Still Not Working?

Create a simple test file to verify the API works:

**Test from Console (F12 → Console):**
```javascript
// Test if backend is running
fetch('http://localhost:3000/api/health')
  .then(r => r.json())
  .then(d => console.log('Backend:', d))
  .catch(e => console.log('Backend error:', e));

// Test registration
fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    username: 'test123',
    email: 'test@example.com',
    password: 'password123'
  })
})
  .then(r => r.json())
  .then(d => console.log('Register result:', d))
  .catch(e => console.log('Error:', e));
```

---

**Last Resort:** Check that ports are available
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Check if port 5173 is in use
netstat -ano | findstr :5173
```

If ports are in use, either:
1. Stop the process using that port
2. Change the port in the code and update API_BASE_URL
