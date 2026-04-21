import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:3000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔄 Checking auth status...');
      const response = await fetch(`${API_BASE_URL}/auth/get-me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✓ Auth check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✓ User found:', data.user);
        setUser(data.user);
        setIsAuthenticated(true);
        setError(null);
      } else {
        console.log('✗ No valid session');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('✗ Auth check failed:', err);
      setUser(null);
      setIsAuthenticated(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      console.log('🔄 Registering user:', username);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log('→ Register response:', response.status, data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('✓ Registration successful');
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      return data;
    } catch (err) {
      console.error('✗ Registration error:', err);
      setError(err.message);
      throw err;
    }
  };

  const login = async (emailOrUsername, password) => {
    try {
      console.log('🔄 Logging in user:', emailOrUsername);
      setError(null);

      const body = {};
      if (emailOrUsername.includes('@')) {
        body.email = emailOrUsername;
      } else {
        body.username = emailOrUsername;
      }
      body.password = password;

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('→ Login response:', response.status, data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('✓ Login successful');
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);
      return data;
    } catch (err) {
      console.error('✗ Login error:', err);
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      console.log('🔄 Logging out...');
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('✓ Logout successful');
    } catch (err) {
      console.error('✗ Logout error:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
