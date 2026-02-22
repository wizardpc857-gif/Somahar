// src/pages/MessagesPage.js
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import {
  collection, query, where, onSnapshot, addDoc,
  serverTimestamp, orderBy, doc, setDoc, getDoc, updateDoc
} from "firebase/firestore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MessagesPage() {
  const { currentUser } = useAuth();
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [activeChatId, setActiveChatId] = useState(chatId || null);
  const [otherUser, setOtherUser] = useState(null);
  const messagesEndRef = useRef();

  // Load chat list
  useEffect(() => {
    const q = query(collection(db, "chats"), where("participants", "array-contains", currentUser.uid));
    return onSnapshot(q, snap => setChats(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [currentUser.uid]);

  // Load messages for active chat
  useEffect(() => {
    if (!activeChatId) return;
    const q = query(collection(db, "chats", activeChatId, "messages"), orderBy("createdAt", "asc"));
    return onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
  }, [activeChatId]);

  async function sendMessage() {
    if (!newMsg.trim() || !activeChatId) return;
    await addDoc(collection(db, "chats", activeChatId, "messages"), {
      text: newMsg,
      senderId: currentUser.uid,
      senderName: currentUser.displayName,
      createdAt: serverTimestamp(),
      seen: false
    });
    await updateDoc(doc(db, "chats", activeChatId), {
      lastMessage: newMsg,
      lastMessageTime: serverTimestamp()
    });
    setNewMsg("");
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content" style={{ display: "flex", gap: 12, padding: 12, maxWidth: 900, marginLeft: 280, marginTop: 56 }}>
        {/* Chat list */}
        <div className="card" style={{ width: 280, flexShrink: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", fontWeight: 700, borderBottom: "1px solid var(--border)" }}>Messages</div>
          {chats.length === 0 && <div style={{ padding: 20, color: "var(--text2)", textAlign: "center" }}>No conversations yet</div>}
          {chats.map(chat => {
            const other = chat.participants?.find(p => p !== currentUser.uid);
            return (
              <div key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                style={{ padding: "12px 16px", cursor: "pointer", background: activeChatId === chat.id ? "var(--bg)" : "transparent",
                  borderBottom: "1px solid var(--border)", display: "flex", gap: 10 }}>
                <div className="avatar" style={{ width: 42, height: 42, background: "var(--primary)", fontSize: 18 }}>U</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{other}</div>
                  <div style={{ fontSize: 13, color: "var(--text2)" }}>{chat.lastMessage || "Start chatting"}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat window */}
        {activeChatId ? (
          <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", maxHeight: "calc(100vh - 90px)" }}>
            <div style={{ padding: "12px 16px", fontWeight: 700, borderBottom: "1px solid var(--border)" }}>Chat</div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column" }}>
              {messages.map(msg => (
                <div key={msg.id} className={`chat-message ${msg.senderId === currentUser.uid ? "sent" : "received"}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
              <input className="inp" placeholder="Type a message..." value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()} style={{ flex: 1 }} />
              <button className="btn btn-primary btn-sm" onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ color: "var(--text2)", textAlign: "center" }}>
              <div style={{ fontSize: 40 }}>💬</div>
              <div style={{ marginTop: 8 }}>Select a conversation</div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
