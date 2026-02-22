// src/pages/FriendsPage.js
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

export default function FriendsPage() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "friendRequests"), where("to", "==", currentUser.uid), where("status", "==", "pending"));
    return onSnapshot(q, snap => setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [currentUser.uid]);

  async function accept(req) {
    await updateDoc(doc(db, "friendRequests", req.id), { status: "accepted" });
    toast.success("Friend request accepted!");
  }

  async function reject(req) {
    await deleteDoc(doc(db, "friendRequests", req.id));
    toast.success("Request rejected");
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ padding: "14px 16px", fontWeight: 700, fontSize: 18, borderBottom: "1px solid var(--border)" }}>
            Friend Requests ({requests.length})
          </div>
          {requests.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--text2)" }}>No pending requests</div>}
          {requests.map(req => (
            <div key={req.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
              <div className="avatar" style={{ width: 48, height: 48, background: "var(--primary)", fontSize: 22 }}>U</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{req.fromName || req.from}</div>
                <div style={{ fontSize: 13, color: "var(--text2)" }}>Wants to be your friend</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => accept(req)}>Accept</button>
              <button className="btn btn-outline btn-sm" onClick={() => reject(req)}>Reject</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
