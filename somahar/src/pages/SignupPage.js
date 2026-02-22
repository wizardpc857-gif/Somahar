// src/pages/SignupPage.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Fill all fields");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    try {
      setLoading(true);
      await signup(email, password, name);
      toast.success("Account created!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Create Account</div>
        <div className="auth-sub">Join সমাহার today</div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input className="inp" type="text" placeholder="Full name"
            value={name} onChange={e => setName(e.target.value)} />
          <input className="inp" type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)} />
          <input className="inp" type="password" placeholder="Password (min 6 chars)"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button className="btn btn-green btn-block" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--text2)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600 }}>Log In</Link>
        </div>
      </div>
    </div>
  );
}
