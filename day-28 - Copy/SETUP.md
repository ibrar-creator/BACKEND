# Authentication System Setup Guide

This guide will help you set up and run the complete authentication system with login, register, and logout functionality.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas connection string)

## Installation Steps

### 1. Install Missing Dependencies

#### Backend
First, install the `cors` package in the backend:

```bash
cd Backend
npm install cors
```

Your Backend dependencies should now include:
- express
- mongoose
- jsonwebtoken
- bcrypt
- cookie-parser
- cors (newly installed)
- dotenv

#### Frontend
The frontend dependencies are already set up. If needed, verify with:

```bash
cd Frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/faceapp
JWT_SECRET=your_secret_key_here
PORT=3000
```

Or if using MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faceapp?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 3. Update MongoDB Connection

Ensure your `Backend/src/config/database.js` is properly configured to connect to MongoDB.

### 4. Start the Application

#### Terminal 1 - Backend Server

```bash
cd Backend
npm run dev
```

Expected output:
```
Server is running on port 3000
Database connected successfully (any similar message)
```

#### Terminal 2 - Frontend Development Server

```bash
cd Frontend
npm run dev
```

Expected output:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Features

### 1. **Register**
- Create new account with username, email, and password
- Password validation (minimum 6 characters)
- Password confirmation matching
- Automatic login after successful registration

### 2. **Login**
- Login with email or username
- Secure password comparison using bcrypt
- JWT token-based authentication
- Automatic session persistence

### 3. **Logout**
- Clear authentication token
- Remove user session
- Redirect to login page
- Token blacklisting on backend

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/logout` | Logout user |
| GET | `/api/auth/get-me` | Get current user (protected) |

### Request/Response Examples

#### Register
```json
POST /api/auth/register

Request:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Login
```json
POST /api/auth/login

Request:
{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "message": "User logged in successfully",
  "user": {
    "id": "...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Logout
```json
GET /api/auth/logout

Response:
{
  "message": "logout successfully."
}
```

## File Structure

### Frontend Components
```
Frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx          # Auth state management
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── Login.jsx        # Login form
│   │   │   │   ├── Register.jsx     # Register form
│   │   │   │   └── Navbar.jsx       # Navigation with logout
│   │   │   └── styles/
│   │   │       ├── auth.css         # Auth forms styling
│   │   │       └── navbar.css       # Navbar styling
│   │   └── Expression/              # Face expression feature
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # App styling
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Entry point
└── index.html
```

### Backend Structure
```
Backend/
├── src/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js       # Auth logic
│   ├── middlewares/
│   │   └── auth.middleware.js       # JWT verification
│   ├── models/
│   │   ├── user.model.js            # User schema
│   │   └── blacklist.model.js       # Blacklisted tokens
│   ├── routes/
│   │   └── auth.routes.js           # Auth routes
│   └── app.js                       # Express app setup
├── server.js                        # Server entry point
└── package.json
```

## Authentication Flow

1. **User Registration**
   - User fills in username, email, password
   - Password is hashed using bcrypt
   - JWT token is created and stored in cookie
   - User is automatically logged in

2. **User Login**
   - User enters email/username and password
   - Password is verified using bcrypt
   - JWT token is created and stored in cookie
   - User redirected to main application

3. **Session Persistence**
   - On app load, AuthContext checks if user has valid token
   - If valid, user stays logged in
   - If invalid/expired, user is sent to login page

4. **User Logout**
   - Token is cleared from cookies
   - Token is added to blacklist in database
   - User session is cleared from state
   - User is redirected to login page

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it in:
- `Backend/server.js`: Change `app.listen(3000, ...)`
- Update Frontend API calls in `Frontend/src/context/AuthContext.jsx`

### CORS Errors
- Ensure backend has CORS enabled (already configured)
- Check that frontend URL matches origin in `Backend/src/app.js`
- Default: Frontend at `http://localhost:5173`, Backend at `http://localhost:3000`

### MongoDB Connection Error
- Verify MongoDB is running locally or check connection string
- Check credentials if using MongoDB Atlas
- Ensure `MONGODB_URI` is set in `.env` file

### Cookies Not Working
- Ensure backend is setting `credentials: 'include'` in requests (already done)
- Check that domain/origin settings are correct

## Testing the Authentication

1. **Test Register**
   - Navigate to registration page
   - Fill in username, email, password
   - Click Register
   - Should automatically log in and show face expression feature

2. **Test Login**
   - Click Logout button
   - Return to login page
   - Enter email/username and password
   - Should log in and show main feature

3. **Test Session Persistence**
   - Log in to account
   - Refresh the page
   - Should remain logged in (session persists)

4. **Test Logout**
   - Click Logout button in navbar
   - Should be redirected to login page
   - Session should be cleared

## Additional Notes

- All passwords are hashed using bcrypt before storing
- JWT tokens expire after 3 days
- Tokens are stored in secure HTTP-only cookies
- Blacklist prevents token reuse after logout
- Form validation happens on both frontend and backend

## Need Help?

- Check the browser console for error messages
- Check the terminal/console for server errors
- Ensure all environment variables are set correctly
- Verify MongoDB is running and accessible
