# 📖 STEP-BY-STEP VISUAL GUIDE

## Prerequisites Check

Before you start, ensure you have:
- ✅ Node.js installed (`node --version` in terminal)
- ✅ npm installed (`npm --version` in terminal)
- ✅ MongoDB connection (Atlas or local)
- ✅ `.env` file in Backend folder with `MONGO_URI` and `JWT_SECRET`

---

## 🚀 STARTUP METHOD 1: AUTOMATIC (Windows)

### Step 1: Find START.bat
```
Your Workspace Root/
├── Backend/
├── Frontend/
├── START.bat  ← DOUBLE-CLICK THIS
└── ...
```

### Step 2: Double-Click START.bat
- ✅ Two new command windows open
- ✅ Backend starts in Terminal 1
- ✅ Frontend starts in Terminal 2
- ✅ Browser opens automatically to http://localhost:5173

**That's it! Skip to "Testing" section below.**

---

## 🚀 STARTUP METHOD 2: POWERPOINT (Windows)

Right-click START.ps1 → Run with PowerShell

Then same as Method 1.

---

## 🚀 STARTUP METHOD 3: MANUAL (All Platforms)

### Terminal 1 - Backend:
```bash
cd Backend
npm run dev
```

**Wait for this message:**
```
[dotenv] injecting env (2) from .env
Server is running on port 3000
✓ Connected to MongoDB
```

> ⚠️ **Don't proceed until you see "Server is running on port 3000"**

### Terminal 2 - Frontend (open new terminal):
```bash
cd Frontend
npm run dev
```

**Wait for this message:**
```
VITE v7.x.x  ready in XXXms

➜  Local:   http://localhost:5173/
```

### Browser:
Go to: `http://localhost:5173`

---

## 📱 WHAT YOU'LL SEE

### 1. Initial Load (0-3 seconds)
```
┌─────────────────────────────────┐
│                                 │
│       Loading...                │
│          ↻ (spinning)           │
│                                 │
│                        🔍        │
└─────────────────────────────────┘
```

### 2. Login Screen (After 3 seconds)
```
┌─────────────────────────────────┐
│    [Gradient Purple Background] │
│                                 │
│           Login                 │
│                                 │
│  [Email or Username Input]      │
│  [Password Input]               │
│                                 │
│     [LOGIN BUTTON]              │
│                                 │
│  Don't have account?            │
│  Register here (link)           │
│                                 │
│                        🔍        │
└─────────────────────────────────┘
```

### 3. Debug Panel (Click 🔍)
```
┌─────────────────────────────────┐
│     Backend Status              │
│                                 │
│  🟢 ✓ Backend is running        │
│     http://localhost:3000       │
│                                 │
│  [RETRY CONNECTION]             │
│                                 │
│  Troubleshooting:               │
│  - Ensure backend is running    │
│  - Check port 3000              │
│  - Check CORS enabled           │
│  - Check .env file              │
│                                 │
└─────────────────────────────────┘
```

---

## 🧪 TEST REGISTRATION

### Fill the Form:
```
Username:            test123
Email:               test@example.com
Password:            Password@123
Confirm Password:    Password@123
```

### Click "Register"

### Expected Result:
```
┌─────────────────────────────────┐
│  Welcome, test123!    [Logout]  │
│  (in navbar)                    │
│                                 │
│   [MAIN APP APPEARS HERE]       │
│     (Face Expression Feature)   │
│                                 │
│                        🔍        │
└─────────────────────────────────┘
```

**Console shows:**
```
🔄 Checking auth status...
✓ Auth check response status: 201
→ Register response: 201
✓ Registration successful
```

---

## 🔐 TEST LOGIN/LOGOUT

### Test 1: Logout
Click "Logout" button in navbar → Back to login

### Test 2: Login Again
```
Email/Username:      test123
Password:            Password@123
```

Click "Login" → Auto-logs in → Shows navbar

### Test 3: Session Persistence
Refresh page (F5) → Should stay logged in ✓

---

## ✅ SUCCESS CHECKLIST

After setup, you should be able to:

- [ ] Backend starts with "Server running on port 3000"
- [ ] Frontend starts with "Local: http://localhost:5173"
- [ ] Browser loads to http://localhost:5173
- [ ] See login form on page
- [ ] See 🔍 debug button (top-right)
- [ ] Click 🔍 shows green "Backend is running"
- [ ] Fill registration form
- [ ] Click Register
- [ ] Auto-logs in
- [ ] See navbar with "Welcome, username!"
- [ ] See Logout button
- [ ] Click Logout → back to login
- [ ] Login with same credentials works
- [ ] Refresh page → stays logged in
- [ ] No red errors in browser console (F12)

---

## 🔴 IF SOMETHING IS RED OR BROKEN

### Check Browser Console (F12 → Console)

**Error: "Cannot connect to backend"**
```
❌ Solution: Start backend
→ Terminal 1: cd Backend && npm run dev
```

**Error: "Module not found"**
```
❌ Solution: Missing files or wrong path
→ Check Frontend/src/context/AuthContext.jsx exists
→ Check all import paths are correct (../../../context/)
```

**Error: "CORS error"**
```
❌ Solution: Restart backend
→ Terminal 1: Ctrl+C
→ npm run dev
→ Try again in browser
```

**Error: "Connection refused on localhost:3000"**
```
❌ Solution: Backend not running
→ Check Terminal 1 has "Server running on port 3000"
→ If not, make sure Ctrl+C stopped previous instance
→ Run: npm run dev
```

**Error: "404 not found" or blank page**
```
❌ Solution: Frontend not running
→ Check Terminal 2 has "Local: http://localhost:5173"
→ If not, Terminal 2: cd Frontend && npm run dev
```

---

## 📋 EXPECTED CONSOLE OUTPUT

### Backend Terminal (Terminal 1):
```
[dotenv@17.3.1] injecting env (2) from .env -- tip: 🔐 prevent building .env in docker
nodemon] starting `node server.js`
Server is running on port 3000
```

### Frontend Terminal (Terminal 2):
```
  VITE v7.3.1  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Browser Console (F12):
```
✓ Auth check response status: 401
✗ No valid session
```
(This is normal - no one logged in yet)

---

## 🎨 CSS & STYLING

If form looks wrong:
```
1. Hard refresh: Ctrl+Shift+R (not just F5)
2. Clear cache: F12 → Application → Clear Site Data
3. Restart frontend: Ctrl+C in Terminal 2, then npm run dev
```

---

## 🔧 PORT CONFLICTS

If port 3000 is taken:
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F

# Then run backend again
npm run dev
```

If port 5173 is taken:
```bash
# Stop frontend: Ctrl+C in Terminal 2
# Change port in Frontend/vite.config.js
# Or kill process using port 5173
```

---

## 📁 KEY FILES LOCATION

Everything you need is here:
```
Workspace Root/
├── Backend/
│   ├── .env (must have MONGO_URI & JWT_SECRET)
│   ├── src/
│   │   ├── app.js (has CORS ✓)
│   │   └── controllers/auth.controller.js
│   └── package.json (has cors ✓)
│
├── Frontend/
│   ├── src/
│   │   ├── context/AuthContext.jsx ✓
│   │   ├── features/auth/components/ ✓
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── DebugStatus.jsx
│   │   ├── App.jsx ✓
│   │   └── main.jsx ✓
│   └── package.json
│
├── START.bat (double-click to start) ✓
├── START.ps1 (for PowerShell) ✓
├── RUN.md (quick running guide)
└── QUICK_REF.md (quick reference)
```

---

## ✨ YOU'RE FULLY SETUP!

Just follow one of the startup methods and you're done!

**Next Steps:**
1. Start servers using START.bat or manually
2. Test registration
3. Test logout/login
4. Test session persistence
5. Enjoy your auth system! 🎉

---

## 📞 NEED HELP?

**Check these docs in order:**
1. `RUN.md` - How to run
2. `QUICK_REF.md` - Quick reference
3. `CHECKLIST.md` - Step-by-step verification
4. `TROUBLESHOOTING.md` - Detailed fixes
5. `IMPLEMENTATION_SUMMARY.md` - What was built

---

## 🎯 FINAL CHECKLIST

Before asking for help:

- [ ] Checked `.env` file has MONGO_URI
- [ ] Checked `.env` file has JWT_SECRET
- [ ] Ran Backend: `cd Backend && npm run dev`
- [ ] Ran Frontend: `cd Frontend && npm run dev`
- [ ] Went to http://localhost:5173
- [ ] Checked browser console (F12) for errors
- [ ] Clicked 🔍 debug button
- [ ] Read the error message carefully

**If you did all of ☝️ and still have issues, you have all the info to solve it!** 💪
