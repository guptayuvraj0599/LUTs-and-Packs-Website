// Loader
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// Scroll to gallery
function scrollToGallery() {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
}

// Fetch Packs
fetch("packs.json")
  .then(res => res.json())
  .then(data => renderPacks(data));

// Render Packs
function renderPacks(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  data.forEach(pack => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.category = pack.type;
    card.setAttribute("data-aos", "fade-up");
    card.innerHTML = `
      <img src="${pack.thumbnail}" alt="${pack.name}">
      <h3>${pack.name}</h3>
      <p>${pack.category}</p>
      <a href="${pack.download}" target="_blank">Download</a>
    `;
    gallery.appendChild(card);
  });
  AOS.refresh();
}

// Filter Function
function filter(category) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const match = category === "all" || card.dataset.category === category;
    card.style.display = match ? "block" : "none";
  });
}

// AOS Init
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
});

// Particles Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array(60).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5,
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#6A00FF55";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();