// src/components/PostCard.js
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  doc, updateDoc, setDoc, deleteDoc, getDoc,
  collection, onSnapshot, addDoc, serverTimestamp, increment
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

export default function PostCard({ post }) {
  const { currentUser } = useAuth();
  const [reactions, setReactions] = useState({});
  const [myReaction, setMyReaction] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [saved, setSaved] = useState(false);

  // Load reactions real-time
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", post.id, "reactions"),
      snap => {
        const r = {};
        snap.forEach(d => { r[d.id] = d.data(); });
        setReactions(r);
        setMyReaction(r[currentUser.uid]?.type || null);
      }
    );
    return unsub;
  }, [post.id, currentUser.uid]);

  // Load comments real-time
  useEffect(() => {
    if (!showComments) return;
    const unsub = onSnapshot(
      collection(db, "posts", post.id, "comments"),
      snap => setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, [post.id, showComments]);

  async function react(type) {
    const ref = doc(db, "posts", post.id, "reactions", currentUser.uid);
    if (myReaction === type) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, { type, userId: currentUser.uid });
    }
  }

  async function addComment() {
    if (!commentText.trim()) return;
    await addDoc(collection(db, "posts", post.id, "comments"), {
      text: commentText,
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      createdAt: serverTimestamp()
    });
    await updateDoc(doc(db, "posts", post.id), { commentCount: increment(1) });
    setCommentText("");
  }

  async function toggleSave() {
    const ref = doc(db, "users", currentUser.uid, "saved", post.id);
    if (saved) { await deleteDoc(ref); setSaved(false); }
    else { await setDoc(ref, { postId: post.id, savedAt: serverTimestamp() }); setSaved(true); }
    toast.success(saved ? "Removed from saved" : "Post saved!");
  }

  const blazeCount = Object.values(reactions).filter(r => r.type === "blaze").length;
  const freezeCount = Object.values(reactions).filter(r => r.type === "freeze").length;
  const timeAgo = post.createdAt?.toDate ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : "just now";

  return (
    <div className="card">
      <div className="post-header">
        <Link to={`/profile/${post.authorId}`}>
          <div className="post-avatar">{post.authorName?.[0] || "U"}</div>
        </Link>
        <div>
          <Link to={`/profile/${post.authorId}`}>
            <div className="post-name">{post.authorName}</div>
          </Link>
          <div className="post-time">{timeAgo}</div>
        </div>
      </div>

      {post.text && <div className="post-body">{post.text}</div>}
      {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="post" />}

      <div className="post-stats">
        <span>🔥 {blazeCount} · ❄️ {freezeCount}</span>
        <span onClick={() => setShowComments(!showComments)} style={{ cursor: "pointer" }}>
          💬 {post.commentCount || 0} comments
        </span>
      </div>

      <div className="post-actions">
        <button className={`post-action-btn ${myReaction === "blaze" ? "blazed" : ""}`} onClick={() => react("blaze")}>
          🔥 Blaze
        </button>
        <button className={`post-action-btn ${myReaction === "freeze" ? "frozen" : ""}`} onClick={() => react("freeze")}>
          ❄️ Freeze
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>
        <button className={`post-action-btn ${saved ? "saved" : ""}`} onClick={toggleSave}>
          🔖 Save
        </button>
        <button className="post-action-btn" onClick={() => { navigator.clipboard.writeText(window.location.origin + "/post/" + post.id); toast.success("Link copied!"); }}>
          ↗️ Share
        </button>
      </div>

      {showComments && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {comments.map(c => (
            <div key={c.id} className="comment-item">
              <div className="avatar" style={{ width: 32, height: 32, fontSize: 14 }}>{c.authorName?.[0]}</div>
              <div className="comment-bubble">
                <div className="comment-author">{c.authorName}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, padding: "8px 16px" }}>
            <input className="inp" placeholder="Write a comment..." value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addComment()}
              style={{ flex: 1 }} />
            <button className="btn btn-primary btn-sm" onClick={addComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
