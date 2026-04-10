# FrameRate Blog — Setup Guide

## 🚀 Quick Start

Open `index.html` in your browser to see the site running in **demo mode** with sample content.

---

## 🔥 Firebase Setup (Production Mode)

### Step 1: Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → give it a name → Create
3. Register a **Web app** (</> icon)
4. Copy your `firebaseConfig` object

### Step 2: Replace Config Values
Search all HTML files for `YOUR_API_KEY` and replace with your real values:
```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
};
```
Files to update: `index.html`, `pages/blog.html`, `pages/post.html`, `admin/login.html`, `admin/dashboard.html`

### Step 3: Enable Authentication
- Firebase Console → **Authentication** → Sign-in method → Enable **Email/Password**
- Create your admin user: Authentication → Users → Add user

### Step 4: Create Firestore Database
- Firebase Console → **Firestore Database** → Create database → Start in test mode
- The `posts` and `comments` collections are created automatically when you add your first post.

**Firestore Rules** (set after testing):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /comments/{commentId} {
      allow read: if true;
      allow create: if true;
      allow delete: if request.auth != null;
    }
  }
}
```

### Step 5: Enable Firebase Storage
- Firebase Console → **Storage** → Get started
- Used for blog thumbnail uploads in the admin dashboard

**Storage Rules**:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📁 File Structure

```
youtuber-blog/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← All styles (dark/light mode)
├── js/
│   └── main.js             ← Shared JS (theme, utilities)
├── pages/
│   ├── blog.html           ← Blog listing with search & filters
│   ├── post.html           ← Single post (comments, likes, share)
│   ├── about.html          ← About page with gear list
│   └── contact.html        ← Contact form
└── admin/
    ├── login.html          ← Firebase Auth login
    └── dashboard.html      ← Full CRUD admin panel
```

---

## 🎛️ Admin Panel

Visit `/admin/login.html` to access the dashboard.

**Demo credentials** (no Firebase needed):
- Email: `admin@framerate.blog`  
- Password: `admin123`

**Features:**
- ✅ Add / Edit / Delete blog posts
- ✅ Image upload to Firebase Storage (drag & drop)
- ✅ Draft / Publish toggle
- ✅ Category & tag management
- ✅ YouTube video ID embedding
- ✅ Comments moderation
- ✅ Live stats (total posts, likes, drafts)

---

## 🎨 Customization

**Change brand name:** Search for `FrameRate` and replace throughout.

**Change accent color:** In `css/style.css`, update:
```css
--accent: #FF4D1C;
```

**Add categories:** Update the `cat-pill` buttons in `index.html` and `pages/blog.html`, and the `<select>` in `admin/dashboard.html`.

**Author info:** Update name and bio in `pages/about.html` and the author avatar in `pages/post.html`.

---

## 🌐 Deployment

Host on any static hosting:
- **Firebase Hosting**: `firebase deploy`
- **Vercel**: Drop the folder into vercel.com
- **Netlify**: Drag & drop the folder
- **GitHub Pages**: Push to a repo and enable Pages

---

## ✨ Features Checklist

- [x] Homepage with featured + latest posts
- [x] Blog grid with category filter & search  
- [x] Individual post with rich content + YouTube embed
- [x] Like / Share buttons
- [x] Firebase comments
- [x] Dark / Light mode toggle
- [x] Responsive (mobile + desktop)
- [x] Sidebar: recent, popular, social links, newsletter
- [x] About page with gear list
- [x] Contact page
- [x] Admin login (Firebase Auth)
- [x] Admin dashboard: add/edit/delete posts
- [x] Image upload (Firebase Storage)
- [x] Draft / Publish toggle
- [x] Demo mode (works without Firebase)
