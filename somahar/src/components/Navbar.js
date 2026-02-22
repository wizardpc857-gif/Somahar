// src/components/Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [notifCount, setNotifCount] = useState(0);
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "notifications", currentUser.uid, "items"),
      where("read", "==", false)
    );
    return onSnapshot(q, snap => setNotifCount(snap.size));
  }, [currentUser]);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">সমাহার</Link>
      <input className="navbar-search" placeholder="Search..." />
      <div className="navbar-actions">
        <Link to="/notifications">
          <button className="nav-icon-btn">
            🔔 {notifCount > 0 && <span className="badge">{notifCount}</span>}
          </button>
        </Link>
        <Link to="/messages">
          <button className="nav-icon-btn">💬 {msgCount > 0 && <span className="badge">{msgCount}</span>}</button>
        </Link>
        <Link to={`/profile/${currentUser?.uid}`}>
          <button className="nav-icon-btn">👤</button>
        </Link>
        <button className="nav-icon-btn" onClick={handleLogout} title="Logout">🚪</button>
      </div>
    </nav>
  );
}
