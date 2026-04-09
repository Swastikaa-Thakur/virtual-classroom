// ══════════════════════════════════════════
//   EduSpace – Virtual Classroom App Logic
// ══════════════════════════════════════════

// ── Course Data ──────────────────────────
const courses = [
  {
    id: 1, category: "programming",
    emoji: "🐍", color: "#1e2a3e",
    tag: "Programming",
    title: "Python for Beginners",
    desc: "Learn Python from scratch with hands-on projects and real examples.",
    rating: "4.8", reviews: "1.2k"
  },
  {
    id: 2, category: "data",
    emoji: "📊", color: "#1e2e2e",
    tag: "Data Science",
    title: "Data Analysis with Pandas",
    desc: "Master data manipulation, visualization, and statistical analysis.",
    rating: "4.7", reviews: "980"
  },
  {
    id: 3, category: "design",
    emoji: "🎨", color: "#2e1e2e",
    tag: "Design",
    title: "UI/UX Design Fundamentals",
    desc: "Create beautiful, user-centered designs with Figma and modern principles.",
    rating: "4.9", reviews: "2.1k"
  },
  {
    id: 4, category: "programming",
    emoji: "⚙️", color: "#2e2a1e",
    tag: "Programming",
    title: "Java & OOP Concepts",
    desc: "Deep dive into object-oriented programming with real-world Java projects.",
    rating: "4.6", reviews: "845"
  },
  {
    id: 5, category: "data",
    emoji: "🤖", color: "#1a1e2e",
    tag: "Data Science",
    title: "Machine Learning Basics",
    desc: "Build your first ML models using scikit-learn and Random Forest.",
    rating: "4.8", reviews: "1.5k"
  },
  {
    id: 6, category: "design",
    emoji: "🌐", color: "#1e2a1e",
    tag: "Design",
    title: "Web Design with HTML & CSS",
    desc: "Build stunning, responsive websites from the ground up.",
    rating: "4.7", reviews: "3.2k"
  }
];

// ── Render Courses ────────────────────────
function renderCourses(filter = "all") {
  const grid = document.getElementById("coursesGrid");
  if (!grid) return;

  const filtered = filter === "all"
    ? courses
    : courses.filter(c => c.category === filter);

  grid.innerHTML = filtered.map(c => `
    <div class="course-card" data-cat="${c.category}">
      <div class="course-thumb" style="background:${c.color}">${c.emoji}</div>
      <div class="course-body">
        <span class="course-tag">${c.tag}</span>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="course-footer">
          <span class="course-rating">
            ★★★★★ <span>${c.rating} (${c.reviews})</span>
          </span>
          <button class="btn btn-primary" style="padding:.35rem .9rem;font-size:.8rem"
            onclick="enrollCourse('${c.title}')">Enroll</button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterCourses(category, btn) {
  // Update active button
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderCourses(category);
}

function enrollCourse(title) {
  showToast(`✅ Enrolled in "${title}"! Check your dashboard.`);
}

// ── Classroom ────────────────────────────
function joinClass() {
  const code = document.getElementById("classCode").value.trim();
  const name = document.getElementById("studentName").value.trim();

  if (!code || !name) {
    showToast("⚠️ Please enter both your name and class code.", "warn");
    return;
  }

  document.getElementById("sessionTitle").textContent = `Session: ${code}`;
  document.getElementById("sessionMsg").textContent = `Welcome, ${name}! Connecting…`;
  document.getElementById("sessionCard").style.display = "block";

  setTimeout(() => {
    document.getElementById("sessionMsg").textContent = "You are live in the class!";
  }, 1500);

  showToast(`🎉 Joined class "${code}" as ${name}`);
}

function createClass() {
  const code = "EDU-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  document.getElementById("classCode").value = code;
  showToast(`📋 Class code generated: ${code}`);
}

function leaveClass() {
  document.getElementById("sessionCard").style.display = "none";
  document.getElementById("classCode").value = "";
  document.getElementById("studentName").value = "";
  showToast("👋 You left the class.");
}

const ctrlState = { mic: true, cam: true, chat: true };

function toggleControl(type) {
  ctrlState[type] = !ctrlState[type];
  const btn = document.getElementById(`${type}Btn`);
  if (!btn) return;

  const icons = { mic: "fa-microphone", cam: "fa-video", chat: "fa-comment" };
  const offIcons = { mic: "fa-microphone-slash", cam: "fa-video-slash", chat: "fa-comment-slash" };

  btn.classList.toggle("active", !ctrlState[type]);
  btn.innerHTML = ctrlState[type]
    ? `<i class="fa-solid ${icons[type]}"></i>`
    : `<i class="fa-solid ${offIcons[type] || icons[type]}"></i>`;
}

// ── Modals ───────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

function switchModal(closeId, openId) {
  closeModal(closeId);
  setTimeout(() => openModal(openId), 150);
}

// Close modal on overlay click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.classList.remove("open");
  });
});

// Close modal with Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
  }
});

// ── Toast Notification ───────────────────
function showToast(msg, type = "info") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:${type === "warn" ? "#2e1e0a" : "#0f1f3a"};
    border:1px solid ${type === "warn" ? "rgba(247,133,79,.3)" : "rgba(79,142,247,.3)"};
    color:#e8eaf0; padding:.75rem 1.25rem; border-radius:10px;
    font-size:.88rem; max-width:320px; box-shadow:0 4px 20px rgba(0,0,0,.5);
    animation:slideInToast .3s ease; font-family:Inter,sans-serif;
  `;

  if (!document.querySelector("#toastStyle")) {
    const s = document.createElement("style");
    s.id = "toastStyle";
    s.textContent = `@keyframes slideInToast{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}`;
    document.head.appendChild(s);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ── Smooth Scroll ────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Navbar Active Link on Scroll ─────────
window.addEventListener("scroll", () => {
  const sections = ["home","courses","classroom","about"];
  const scrollY = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll(".nav-links a").forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
});

// ── Hamburger Menu ───────────────────────
document.getElementById("hamburger").addEventListener("click", () => {
  const links = document.querySelector(".nav-links");
  const actions = document.querySelector(".nav-actions");

  if (!links) return;
  const open = links.style.display === "flex";

  links.style.cssText = open
    ? ""
    : `display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;
       background:#121624;padding:1rem 5%;gap:1rem;border-bottom:1px solid #1e2a42;z-index:999;`;

  if (actions) {
    actions.style.cssText = open
      ? ""
      : `display:flex;padding:.5rem 5% 1rem;gap:.75rem;position:absolute;
         top:${links.scrollHeight + 64}px;left:0;right:0;background:#121624;
         border-bottom:1px solid #1e2a42;z-index:999;`;
  }
});

// ── Init ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
});
