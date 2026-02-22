// src/pages/HomePage.js
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, limit, onSnapshot, startAfter, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(PAGE_SIZE));
    const unsub = onSnapshot(q, snap => {
      const newPosts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPosts(newPosts);
      setLastDoc(snap.docs[snap.docs.length - 1]);
      setHasMore(snap.docs.length === PAGE_SIZE);
    });
    return unsub;
  }, []);

  async function loadMore() {
    if (!lastDoc) return;
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(PAGE_SIZE));
    const snap = await getDocs(q);
    const more = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setPosts(p => [...p, ...more]);
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setHasMore(snap.docs.length === PAGE_SIZE);
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <CreatePost />
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<div style={{ textAlign: "center", padding: 20, color: "var(--text2)" }}>Loading...</div>}
          endMessage={<div style={{ textAlign: "center", padding: 20, color: "var(--text3)" }}>No more posts</div>}
        >
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </InfiniteScroll>
      </main>
      <BottomNav />
    </>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {[["🏠","Home","/"],["👥","Friends","/friends"],["💬","Chat","/messages"],["🔔","Notif","/notifications"],["👤","Profile","/profile/me"]].map(([icon,label,to]) => (
        <a key={to} href={to} className="bottom-nav-item">
          <span className="b-icon">{icon}</span>
          {label}
        </a>
      ))}
    </nav>
  );
}
