# 🚀 QUICK REFERENCE CARD

## STARTUP (2 minutes)

### Terminal 1 - Backend
```bash
cd Backend && npm run dev
```
Expected: `Server is running on port 3000`

### Terminal 2 - Frontend
```bash
cd Frontend && npm run dev
```
Expected: `Local: http://localhost:5173/`

### Browser
Go to: `http://localhost:5173`

---

## WHAT TO EXPECT

| Step | What You See | Action |
|------|-------------|--------|
| 1. Page loads | Loading... spinner | Wait 3 seconds |
| 2. Shows login form | Email/Username + Password fields | Try registering new account |
| 3. Register works | Auto-logs in, shows main app | Click logout to test |
| 4. Logout button | Returns to login | Login with same credentials |
| 5. Refresh page | Should stay logged in | ✅ Done! |

---

## DEBUG MODE 🔍

**Click 🔍 button (top-right)**

Should show:
```
✓ Backend is running on http://localhost:3000
```

If red error → Backend not running

---

## INSTALLED FILES

✅ New Components:
- Login.jsx, Register.jsx, Navbar.jsx
- DebugStatus.jsx (for troubleshooting)
- AuthContext.jsx (state management)

✅ New Styles:
- auth.css, navbar.css, debug.css, App.css

✅ Updated:
- App.jsx (added auth system)
- app.js (added CORS)

---

## MOST COMMON ISSUES

| Problem | Solution |
|---------|----------|
| Red 🔍 error | Run `cd Backend && npm run dev` |
| Can't register | Check console (F12) for errors |
| CORS error | Restart backend |
| Can't login | Try with email instead of username |
| Form not styled | Hard refresh (Ctrl+Shift+R) |

---

## PORTS MUST BE

- Backend: `http://localhost:3000/api`
- Frontend: `http://localhost:5173`

---

## FOLDER STRUCTURE

```
Backend/
├── .env (has MONGO_URI & JWT_SECRET)
├── src/app.js (has CORS)
└── npm run dev → starts server

Frontend/
├── src/context/AuthContext.jsx
├── src/features/auth/components/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Navbar.jsx
│   └── DebugStatus.jsx
└── npm run dev → starts app
```

---

## FULL DOCS

- 📖 [QUICK_START.md](QUICK_START.md) - 3 min setup
- 📖 [SETUP.md](SETUP.md) - Detailed guide
- 📖 [CHECKLIST.md](CHECKLIST.md) - Step-by-step verification
- 📖 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Fix issues
- 📖 [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - What was built

---

## TEST REGISTRATION

```
Username: test123
Email: test@example.com
Password: Password@123
Confirm: Password@123
```

→ Click Register

→ Should auto-login

→ Should show main app with "Welcome, test123!"

---

## TEST LOGIN

```
Email: test@example.com (or username)
Password: Password@123
```

→ Click Login

→ Should show main app

---

## KEY ENDPOINTS

```
POST   /api/auth/register   - Create account
POST   /api/auth/login      - Sign in
GET    /api/auth/get-me     - Check session
GET    /api/auth/logout     - Sign out
GET    /api/health          - Check backend
```

---

## API RESPONSE FORMAT

**Success (201/200):**
```json
{
  "message": "User registered/logged in successfully",
  "user": {
    "id": "...",
    "username": "test123",
    "email": "test@example.com"
  }
}
```

**Error (400/401):**
```json
{
  "message": "User with the same email already exists"
}
```

---

## FEATURES

✅ Register with username, email, password  
✅ Login with email or username  
✅ Logout with button in navbar  
✅ Session persists on page refresh  
✅ Password hashing (bcrypt)  
✅ JWT token authentication  
✅ CORS enabled  
✅ Error messages  
✅ Loading states  
✅ Responsive design  
✅ Debug mode  

---

## QUICK FIXES

**Backend not starting?**
```bash
cd Backend
npm install cors
npm run dev
```

**CORS error?**
- Restart backend: `npm run dev`

**Can't see form?**
- Hard refresh: Ctrl+Shift+R

**Console errors?**
- Press F12 → Console tab
- Look for `❌` or `✗` messages
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## FILE LOCATIONS TO CHANGE PORT

If port 3000 is taken, change in:
1. `Backend/server.js` - `app.listen(3000)`
2. `Frontend/src/context/AuthContext.jsx` - `const API_BASE_URL = 'http://localhost:3000/api'`

---

## NODE MODULES SAVED?

If you have errors about missing packages:

```bash
cd Backend && npm install
cd ../Frontend && npm install
```

---

## YOU'RE READY! 🎉

Follow the **STARTUP** section at the top.

If issues, check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

Good luck! 🚀
