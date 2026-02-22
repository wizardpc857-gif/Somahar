import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">S</div>
          <span className="logo-text">Somahar</span>
        </Link>
      </div>

      {/* Center - Nav Icons */}
      <div className="navbar-center">
        <Link to="/" className={`nav-icon-btn ${isActive("/") ? "active" : ""}`} title="Home">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </Link>
        <Link to="/friends" className={`nav-icon-btn ${isActive("/friends") ? "active" : ""}`} title="Friends">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        </Link>
        <Link to="/groups" className={`nav-icon-btn ${isActive("/groups") ? "active" : ""}`} title="Groups">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </Link>
        <Link to="/news" className={`nav-icon-btn ${isActive("/news") ? "active" : ""}`} title="Watch">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
          </svg>
        </Link>
      </div>

      {/* Right - Profile & Actions */}
      <div className="navbar-right">
        <Link to="/messages" className="navbar-action-btn" title="Messenger">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </Link>
        <Link to="/notifications" className="navbar-action-btn" title="Notifications">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </Link>
        <div className="navbar-profile" onClick={() => setShowMenu(!showMenu)}>
          <div className="profile-avatar-sm">
            {currentUser?.displayName?.[0]?.toUpperCase() || "U"}
          </div>
          {showMenu && (
            <div className="profile-dropdown">
              <Link to={`/profile/${currentUser?.uid}`} className="dropdown-item" onClick={() => setShowMenu(false)}>
                <div className="profile-avatar-sm">{currentUser?.displayName?.[0]?.toUpperCase() || "U"}</div>
                <div>
                  <div className="dropdown-name">{currentUser?.displayName || "User"}</div>
                  <div className="dropdown-sub">প্রোফাইল দেখুন</div>
                </div>
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-btn" onClick={handleLogout}>
                <div className="dropdown-icon">🚪</div>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
