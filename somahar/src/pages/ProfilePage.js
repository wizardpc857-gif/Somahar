// src/pages/ProfilePage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, collection, query, where, onSnapshot, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { uid } = useParams();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followState, setFollowState] = useState("none"); // none | following | requested
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const isMe = currentUser?.uid === uid;

  useEffect(() => {
    getDoc(doc(db, "users", uid)).then(snap => {
      if (snap.exists()) {
        setProfile(snap.data());
        setEditName(snap.data().name);
        setEditBio(snap.data().bio || "");
      }
    });
    const q = query(collection(db, "posts"), where("authorId", "==", uid));
    return onSnapshot(q, snap => setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [uid]);

  // Follow counts real-time
  useEffect(() => {
    const fwrQ = query(collection(db, "follows"), where("followingId", "==", uid));
    const fwgQ = query(collection(db, "follows"), where("followerId", "==", uid));
    const u1 = onSnapshot(fwrQ, s => setFollowerCount(s.size));
    const u2 = onSnapshot(fwgQ, s => setFollowingCount(s.size));
    return () => { u1(); u2(); };
  }, [uid]);

  // My follow state
  useEffect(() => {
    if (isMe) return;
    const followId = `${currentUser.uid}_${uid}`;
    return onSnapshot(doc(db, "follows", followId), snap => {
      if (!snap.exists()) setFollowState("none");
      else if (snap.data().status === "pending") setFollowState("requested");
      else setFollowState("following");
    });
  }, [uid, currentUser?.uid, isMe]);

  async function handleFollow() {
    const followId = `${currentUser.uid}_${uid}`;
    const ref_ = doc(db, "follows", followId);
    if (followState === "none") {
      const status = profile?.isPrivate ? "pending" : "accepted";
      await setDoc(ref_, { followerId: currentUser.uid, followingId: uid, status, createdAt: serverTimestamp() });
      toast.success(profile?.isPrivate ? "Follow request sent" : "Following!");
    } else {
      await deleteDoc(ref_);
      toast.success("Unfollowed");
    }
  }

  async function saveProfile() {
    await updateDoc(doc(db, "users", currentUser.uid), { name: editName, bio: editBio });
    setProfile(p => ({ ...p, name: editName, bio: editBio }));
    setEditing(false);
    toast.success("Profile updated!");
  }

  if (!profile) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <div className="card" style={{ padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div className="avatar" style={{ width: 80, height: 80, fontSize: 36, background: "var(--primary)" }}>
              {profile.name?.[0]}
            </div>
            <div style={{ flex: 1 }}>
              {editing ? (
                <>
                  <input className="inp" value={editName} onChange={e => setEditName(e.target.value)} style={{ marginBottom: 8 }} />
                  <input className="inp" value={editBio} onChange={e => setEditBio(e.target.value)} placeholder="Bio" style={{ marginBottom: 8 }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-primary btn-sm" onClick={saveProfile}>Save</button>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{profile.name}</div>
                  <div style={{ color: "var(--text2)", marginBottom: 8 }}>{profile.bio || "No bio yet"}</div>
                  <div style={{ display: "flex", gap: 20, fontSize: 14, color: "var(--text2)", marginBottom: 12 }}>
                    <span><b style={{ color: "var(--text)" }}>{followerCount}</b> Followers</span>
                    <span><b style={{ color: "var(--text)" }}>{followingCount}</b> Following</span>
                    <span><b style={{ color: "var(--text)" }}>{posts.length}</b> Posts</span>
                  </div>
                  {isMe ? (
                    <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>Edit Profile</button>
                  ) : (
                    <button className={`btn btn-sm ${followState === "none" ? "btn-primary" : "btn-outline"}`} onClick={handleFollow}>
                      {followState === "none" ? "Follow" : followState === "requested" ? "Requested" : "Following"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, padding: "0 4px" }}>Posts</div>
        {posts.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "var(--text2)" }}>No posts yet</div>}
        {posts.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds).map(p => <PostCard key={p.id} post={p} />)}
      </main>
    </>
  );
}
