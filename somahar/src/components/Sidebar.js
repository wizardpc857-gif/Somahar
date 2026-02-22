// src/components/Sidebar.js
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/friends", icon: "👥", label: "Friends" },
  { to: "/messages", icon: "💬", label: "Messages" },
  { to: "/notifications", icon: "🔔", label: "Notifications" },
  { to: "/news", icon: "📰", label: "News" },
  { to: "/memes", icon: "😂", label: "Memes" },
  { to: "/groups", icon: "👥", label: "Groups" },
];

export default function Sidebar() {
  const { currentUser } = useAuth();
  return (
    <aside className="sidebar">
      <NavLink to={`/profile/${currentUser?.uid}`} className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        <span className="s-icon">👤</span> My Profile
      </NavLink>
      {links.map(l => (
        <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          <span className="s-icon">{l.icon}</span> {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
