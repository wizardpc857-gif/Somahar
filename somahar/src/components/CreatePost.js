// src/components/CreatePost.js
import { useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

export default function CreatePost() {
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePost() {
    if (!text.trim()) return toast.error("Write something first");
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        text,
        imageUrl: null,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        createdAt: serverTimestamp(),
        commentCount: 0,
      });
      setText("");
      toast.success("Post shared!");
    } catch (err) {
      toast.error("Failed to post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div className="avatar" style={{ width: 42, height: 42, fontSize: 18, background: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
          {currentUser?.displayName?.[0] || "U"}
        </div>
        <textarea className="inp" placeholder="What's on your mind?"
          value={text} onChange={e => setText(e.target.value)}
          style={{ flex: 1, resize: "none", minHeight: 60 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <button className="btn btn-primary btn-sm" onClick={handlePost} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
