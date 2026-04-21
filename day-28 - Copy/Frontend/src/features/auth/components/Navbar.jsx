import { useAuth } from '../../../context/AuthContext';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>FaceApp</h1>
        </div>
        
        <div className="navbar-content">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="username">Welcome, {user?.username}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="guest-section">
              <span className="guest-text">Not logged in</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
