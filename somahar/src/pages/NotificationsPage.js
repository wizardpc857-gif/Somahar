// src/pages/NotificationsPage.js
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notifications", currentUser.uid, "items"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      setNotifs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      snap.docs.forEach(d => { if (!d.data().read) updateDoc(doc(db, "notifications", currentUser.uid, "items", d.id), { read: true }); });
    });
  }, [currentUser.uid]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <div className="card">
          <div style={{ padding: "14px 16px", fontWeight: 700, fontSize: 18, borderBottom: "1px solid var(--border)" }}>Notifications</div>
          {notifs.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "var(--text2)" }}>No notifications</div>}
          {notifs.map(n => (
            <div key={n.id} className="notif-item">
              {!n.read && <div className="notif-dot" />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}>{n.text}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{n.createdAt?.toDate?.()?.toLocaleDateString?.()}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
