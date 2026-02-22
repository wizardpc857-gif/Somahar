// src/pages/LoginPage.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("Fill all fields");
    try {
      setLoading(true);
      await login(email, password);
      toast.success("Welcome back!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">সমাহার</div>
        <div className="auth-sub">Sign in to continue</div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input className="inp" type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)} />
          <input className="inp" type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--text2)" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 600 }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
