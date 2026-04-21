# Quick Setup & Run Guide

## One-Time Setup

### Step 1: Install Missing Dependency
```bash
cd Backend
npm install cors
```

### Step 2: Create Backend Environment File
Create a file named `.env` in the `Backend` folder:

```env
MONGODB_URI=mongodb://localhost:27017/faceapp
JWT_SECRET=your_secret_key_here_change_this_in_production
PORT=3000
```

**Note:** If using MongoDB Atlas instead of local:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faceapp
JWT_SECRET=your_secret_key_here
PORT=3000
```

---

## Running the Application

### Terminal 1: Start Backend Server
```bash
cd Backend
npm run dev
```

**Expected Output:**
```
Server is running on port 3000
```

### Terminal 2: Start Frontend Development Server
```bash
cd Frontend
npm run dev
```

**Expected Output:**
```
VITE v7.x.x  ready in XXXms

➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser
Go to: `http://localhost:5173`

---

## What You'll See

1. **Login Page** (first time or after logout)
   - Enter email or username
   - Enter password
   - Click "Login"

2. **Register Page** (click "Register here" link)
   - Create username, email, password
   - Confirm password
   - Click "Register"
   - Auto login after registration

3. **Main App** (after successful login)
   - Navbar shows your username
   - "Logout" button in top-right
   - Face Expression feature appears
   - Click "Logout" to sign out

---

## Test Credentials (After Registration)

Create your own account by registering!

Example:
- **Username:** testuser
- **Email:** test@example.com
- **Password:** password123

---

## Troubleshooting

### Issue: Port 3000 Already in Use
**Solution:** 
- Stop other services using port 3000
- Or change port in `Backend/server.js` and update API URL in `Frontend/src/context/AuthContext.jsx`

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Test connection with MongoDB Compass

### Issue: CORS Error in Browser
**Solution:**
- Backend CORS is already configured
- Ensure backend is running on `localhost:3000`
- Ensure frontend is running on `localhost:5173`

### Issue: Can't Login After Registering
**Solution:**
- Check browser console for errors (F12)
- Ensure backend is running
- Check that MongoDB has data (use MongoDB Compass)

### Issue: Form Not Styling Correctly
**Solution:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Ensure CSS files are in correct directories

---

## Features Summary

### ✅ Registration
- Create account with username, email, password
- Password validation (min 6 characters)
- Auto-login after registration

### ✅ Login
- Login with email OR username
- Secure password verification
- Session persistence

### ✅ Logout
- Clear session on logout
- Logout button in navbar
- Automatic redirect to login

### ✅ Session Management
- Stay logged in until logout
- Session persists on page refresh
- Token-based authentication

---

## File Structure Reference

**Key Frontend Files:**
```
Frontend/src/
├── context/AuthContext.jsx          ← Auth state & API calls
├── features/auth/components/
│   ├── Login.jsx                    ← Login form
│   ├── Register.jsx                 ← Register form
│   └── Navbar.jsx                   ← Logout button
├── App.jsx                          ← Main app with routing
└── main.jsx                         ← Entry point
```

**Key Backend Files:**
```
Backend/src/
├── routes/auth.routes.js            ← API endpoints
├── controllers/auth.controller.js    ← Login/Register logic
├── middlewares/auth.middleware.js    ← JWT verification
└── models/user.model.js             ← User schema
```

---

## API Endpoints Reference

```
POST   /api/auth/register    → Create new user
POST   /api/auth/login       → Login user
GET    /api/auth/logout      → Logout user
GET    /api/auth/get-me      → Get current user (protected)
```

---

## Common Tasks

### To Restart Both Servers
1. Press `Ctrl+C` in both terminals
2. Run the startup commands again

### To Stop Backend Only
- Press `Ctrl+C` in backend terminal
- Frontend will show connection error

### To Check Backend Status
- Visit: `http://localhost:3000/api/auth/get-me`
- Should show login error (that's correct if not logged in)

### To Clear Login Cache
- Browser DevTools → Application → Cookies
- Delete all cookies for the site
- Refresh page

---

## Next Steps

After running successfully:

1. **Test the flows:**
   - Register a new account
   - Login with that account
   - Refresh page (session should persist)
   - Logout and verify redirect to login

2. **Explore the code:**
   - Check how AuthContext manages state
   - Look at Login.jsx for form handling
   - Review Navbar.jsx for logout logic

3. **Optional: Enhance the app**
   - Add password reset functionality
   - Add email verification
   - Add user profile page
   - Integrate with more features

---

## Need Help?

- Check the SETUP.md file for detailed guide
- Check the IMPLEMENTATION_SUMMARY.md for complete overview
- Look at browser console (F12) for error messages
- Check terminal for server errors

**Everything is ready to run! Just follow the steps above.** 🚀
