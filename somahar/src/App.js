// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import FriendsPage from "./pages/FriendsPage";
import GroupsPage from "./pages/GroupsPage";
import NewsPage from "./pages/NewsPage";
import MemePage from "./pages/MemePage";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!currentUser ? <SignupPage /> : <Navigate to="/" />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/profile/:uid" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
      <Route path="/messages/:chatId" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
      <Route path="/friends" element={<PrivateRoute><FriendsPage /></PrivateRoute>} />
      <Route path="/groups" element={<PrivateRoute><GroupsPage /></PrivateRoute>} />
      <Route path="/news" element={<PrivateRoute><NewsPage /></PrivateRoute>} />
      <Route path="/memes" element={<PrivateRoute><MemePage /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <AppRoutes />
        <button
          onClick={() => setDark(d => !d)}
          style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999,
            background: "var(--primary)", color: "#fff", border: "none",
            borderRadius: "50%", width: 44, height: 44, fontSize: 20, cursor: "pointer" }}>
          {dark ? "☀️" : "🌙"}
        </button>
      </BrowserRouter>
    </AuthProvider>
  );
}
