# সমাহার (Somahar) — Full Stack Social Media

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Firebase
1. Go to **console.firebase.google.com**
2. Create a new project → "Somahar"
3. Enable these services:
   - **Authentication** → Email/Password
   - **Firestore Database** → Start in test mode
   - **Storage** → Start in test mode
4. Go to **Project Settings** → **Your Apps** → **Web App**
5. Copy your config and paste into `src/firebase/config.js`

### 3. Deploy Firestore Rules
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
# Copy contents of firestore.rules
firebase deploy --only firestore:rules
```

### 4. Run the app
```bash
npm start
```

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

---

## 📁 Project Structure
```
src/
├── firebase/
│   └── config.js          # Firebase setup
├── context/
│   └── AuthContext.js     # Auth state
├── components/
│   ├── Navbar.js          # Top navigation
│   ├── Sidebar.js         # Left sidebar
│   ├── PostCard.js        # Post with reactions
│   └── CreatePost.js      # Create post form
├── pages/
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── HomePage.js        # Feed with infinite scroll
│   ├── ProfilePage.js     # Profile + follow system
│   ├── MessagesPage.js    # Real-time chat
│   ├── NotificationsPage.js
│   ├── FriendsPage.js
│   ├── GroupsPage.js
│   ├── NewsPage.js
│   └── MemePage.js
└── index.css              # Global styles + themes
```

## 🔥 Features
- ✅ Email/Password Auth
- ✅ Real-time Feed (Firestore)
- ✅ Create Post (text + image)
- ✅ Reactions: Blaze 🔥 / Freeze ❄️
- ✅ Comments (real-time)
- ✅ Save Posts
- ✅ Follow / Unfollow system
- ✅ Private account support
- ✅ Real-time Chat
- ✅ Notifications
- ✅ Friend Requests
- ✅ Dark / Light Mode
- ✅ Responsive (Desktop + Mobile)
- ✅ Infinite Scroll
- ✅ Noto Sans Bengali font

## 🗄️ Firestore Schema
```
users/{uid}
  - name, email, bio, photoURL
  - followers, following, isPrivate

posts/{postId}
  - text, imageUrl, authorId, authorName
  - createdAt, commentCount
  /reactions/{userId} - type: "blaze"|"freeze"
  /comments/{commentId} - text, authorId, authorName

chats/{chatId}
  - participants[], lastMessage
  /messages/{msgId} - text, senderId, seen

follows/{followerId_followingId}
  - followerId, followingId, status: "accepted"|"pending"

notifications/{userId}/items/{notifId}
  - text, read, createdAt

friendRequests/{reqId}
  - from, to, status: "pending"|"accepted"
```
