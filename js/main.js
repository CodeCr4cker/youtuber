// ============================================================
//  FRAMERATE BLOG — MAIN JS
// ============================================================

// --- THEME ---
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('fr-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('fr-theme', next);
});

// --- MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));

// --- NAV SCROLL ---
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.style.borderBottomColor = window.scrollY > 20 ? 'var(--border)' : 'transparent';
});

// --- UTILITY ---
function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getInitials(name) {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'FR';
}

function excerpt(html, len = 120) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  return text.length > len ? text.slice(0, len).trimEnd() + '...' : text;
}

// --- POST CARD BUILDER ---
function buildPostCard(post, size = 'normal') {
  const img = post.imageUrl || `https://picsum.photos/seed/${post.id || 'default'}/640/360`;
  const date = formatDate(post.createdAt);
  const initials = getInitials(post.author);
  const postUrl = `pages/post.html?id=${post.id}`;

  return `
    <div class="post-card" onclick="window.location='${postUrl}'">
      <div class="post-thumb">
        <img src="${img}" alt="${post.title}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${post.id}/640/360'"/>
        <div class="play-btn">
          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>
      <div class="post-body">
        <div class="post-meta">
          <span class="post-cat">${post.category || 'Blog'}</span>
          <span class="post-date">${date}</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <div class="post-author">
          <div class="author-av">${initials}</div>
          <span class="author-name">${post.author || 'FrameRate'}</span>
        </div>
      </div>
    </div>
  `;
}

function buildRecentItem(post) {
  const img = post.imageUrl || `https://picsum.photos/seed/${post.id}/200/150`;
  const date = formatDate(post.createdAt);
  return `
    <li class="recent-item" onclick="window.location='pages/post.html?id=${post.id}'">
      <img class="recent-thumb" src="${img}" alt="${post.title}" onerror="this.src='https://picsum.photos/seed/${post.id}/200/150'"/>
      <div class="recent-info">
        <div class="recent-title">${post.title}</div>
        <div class="recent-date">${date}</div>
      </div>
    </li>
  `;
}

// --- LOAD POSTS (Homepage) ---
let allPosts = [];
let activeCat = 'all';
let searchQuery = '';

async function loadPosts() {
  try {
    const db = window._db;
    const { collection, query, orderBy, limit, getDocs, where } = window._firestoreLib;
    if (!db) return renderDemoContent();

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
    const snap = await getDocs(q);
    allPosts = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => p.status !== 'draft');
    renderHomePage(allPosts);
  } catch(e) {
    console.warn('Firebase not configured, showing demo content:', e.message);
    renderDemoContent();
  }
}

function renderDemoContent() {
  allPosts = generateDemoPosts();
  renderHomePage(allPosts);
}

function generateDemoPosts() {
  const cats = ['Tech', 'Tutorials', 'Reviews', 'Vlogs', 'Gaming'];
  const titles = [
    'My Complete Camera Setup for YouTube in 2025',
    'How I Edit Videos 3x Faster with This Workflow',
    'Sony A7C II vs Nikon Z6 III — Real-World Comparison',
    'A Week in Japan: Filming with Just My iPhone',
    'Best Budget Microphones for YouTubers Under $100',
    'DaVinci Resolve Color Grading: Cinematic Look Tutorial',
    'Why I Switched from Adobe to Final Cut Pro',
    'Gaming Setup Tour — Desk, Lights, and Cables',
    'How I Grew to 100K Subscribers (Real Strategy)',
    'The Gear I Wish I Bought First When Starting YouTube',
  ];
  return titles.map((title, i) => ({
    id: `demo-${i}`,
    title,
    content: `<p>This is a demo blog post. Configure Firebase to load real content.</p>`,
    category: cats[i % cats.length],
    author: 'Alex Rivera',
    createdAt: { toDate: () => new Date(Date.now() - i * 86400000 * 3) },
    imageUrl: `https://picsum.photos/seed/${i + 10}/640/360`,
    likes: Math.floor(Math.random() * 200) + 20,
    status: 'published',
  }));
}

function renderHomePage(posts) {
  const filtered = filterPosts(posts);

  // Hero float card
  const floatFeatured = document.getElementById('floatFeatured');
  if (floatFeatured && posts.length) {
    const f = posts[0];
    floatFeatured.innerHTML = `
      <div class="float-thumb" style="background-image:url('${f.imageUrl || `https://picsum.photos/seed/hero/640/360`}');background-size:cover"></div>
      <div class="float-info">
        <div class="float-cat">${f.category}</div>
        <div class="float-title">${f.title}</div>
      </div>
    `;
    floatFeatured.onclick = () => window.location = `pages/post.html?id=${f.id}`;
  }

  // Featured grid
  const fg = document.getElementById('featuredGrid');
  if (fg) {
    const featured = filtered.slice(0, 3);
    fg.innerHTML = featured.length
      ? featured.map((p, i) => buildPostCard(p, i === 0 ? 'large' : 'normal')).join('')
      : `<div class="no-posts"><h3>No posts found</h3></div>`;
  }

  // Posts grid
  const pg = document.getElementById('postsGrid');
  if (pg) {
    const latest = filtered.slice(3, 7);
    pg.innerHTML = latest.length
      ? latest.map(p => buildPostCard(p)).join('')
      : `<div class="no-posts"><h3>No more posts</h3></div>`;
  }

  // Recent list
  const rl = document.getElementById('recentList');
  if (rl) rl.innerHTML = posts.slice(0, 4).map(buildRecentItem).join('');

  // Popular list
  const pl = document.getElementById('popularList');
  if (pl) {
    const sorted = [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    pl.innerHTML = sorted.slice(0, 3).map(buildRecentItem).join('');
  }
}

function filterPosts(posts) {
  return posts.filter(p => {
    const catMatch = activeCat === 'all' || p.category === activeCat;
    const searchMatch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });
}

// Category pills
document.querySelectorAll('.cat-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeCat = pill.dataset.cat;
    renderHomePage(allPosts);
  });
});

// Search
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', e => {
  searchQuery = e.target.value;
  renderHomePage(allPosts);
});

// Newsletter
window.subscribeNewsletter = function() {
  const email = document.getElementById('newsletterEmail')?.value;
  const msg = document.getElementById('newsletterMsg');
  if (!email || !email.includes('@')) {
    if (msg) { msg.textContent = 'Please enter a valid email.'; msg.style.color = '#ff6b6b'; }
    return;
  }
  if (msg) { msg.textContent = '🎉 Subscribed! Welcome aboard.'; msg.style.color = '#4CAF50'; }
  document.getElementById('newsletterEmail').value = '';
};

// Toast utility
window.showToast = function(msg, type = 'success') {
  let t = document.getElementById('globalToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'globalToast';
    t.className = 'toast';
    t.innerHTML = `<span class="toast-icon"></span><span class="toast-msg"></span>`;
    document.body.appendChild(t);
  }
  t.querySelector('.toast-icon').textContent = type === 'success' ? '✅' : '❌';
  t.querySelector('.toast-msg').textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
};
