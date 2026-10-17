// ===== Yıl =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobil menü =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== Açık / koyu tema =====
const themeBtn = document.getElementById("themeBtn");
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("tema", theme); } catch (e) {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("tema"); } catch (e) {}
setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ===== Yazı efekti =====
const roles = ["SAP MM Danışmanı", "ABAP Geliştirici", "Android Geliştirici", "Web Geliştirici"];
const typed = document.getElementById("typed");
let roleIndex = 0, charIndex = roles[0].length, deleting = true;

function typeLoop() {
  const word = roles[roleIndex];
  typed.textContent = word.substring(0, charIndex);

  if (deleting) {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
    }
    setTimeout(typeLoop, 50);
  } else {
    charIndex++;
    if (charIndex > roles[roleIndex].length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 90);
  }
}
setTimeout(typeLoop, 1800);

// ===== Kaydırma: menü gölgesi, aktif bağlantı, yukarı butonu =====
const header = document.querySelector(".header");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 10);
  toTop.classList.toggle("show", y > 500);

  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle("active", y >= top && y < top + sec.offsetHeight);
  });
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

// ===== Kaydırınca beliren animasyon =====
const revealItems = document.querySelectorAll(".card, .project, .section-title, .skills");
revealItems.forEach(el => el.classList.add("reveal"));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(el => observer.observe(el));
