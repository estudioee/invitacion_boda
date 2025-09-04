const audio = document.getElementById('song');
const btn = document.getElementById('audioBtn');
let playing = false;
btn.addEventListener('click', () => {
  if (!playing) { audio.play(); btn.querySelector('i').className = 'fa-solid fa-pause'; btn.querySelector('span').textContent = 'Pausar canción'; }
  else { audio.pause(); btn.querySelector('i').className = 'fa-solid fa-play'; btn.querySelector('span').textContent = 'Escucha nuestra canción'; }
  playing = !playing;
});

// Cuenta regresiva hasta la 1:00 AM del 27 de septiembre de 2025
const target = new Date('2025-09-27T01:00:00').getTime();
const countdownEl = document.getElementById('countdown');
let confettiShown = false;

function showConfetti() {
  // Simple confeti usando canvas
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = 0;
  confettiCanvas.style.left = 0;
  confettiCanvas.style.width = '100vw';
  confettiCanvas.style.height = '100vh';
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = 9999;
  document.body.appendChild(confettiCanvas);
  const ctx = confettiCanvas.getContext('2d');
  const pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: 6 + Math.random() * 8,
      d: Math.random() * 360,
      color: `hsl(${Math.random()*360},80%,60%)`,
      speed: 2 + Math.random() * 2
    });
  }
  let frames = 0;
  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
      p.y += p.speed;
      p.x += Math.sin((frames + p.d) * 0.05) * 2;
      if (p.y > confettiCanvas.height) p.y = -10;
    });
    frames++;
    if (frames < 180) requestAnimationFrame(animateConfetti);
    else confettiCanvas.remove();
  }
  animateConfetti();
}

function updateCountdown() {
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) {
    countdownEl.textContent = "¡Ya empezó el gran día!";
    if (!confettiShown) {
      showConfetti();
      confettiShown = true;
    }
    return;
  }
  const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const h = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const m = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  countdownEl.textContent = `¡Faltan ${d} días, ${h} horas, ${m} minutos!`;
}
setInterval(updateCountdown, 1000); updateCountdown();

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
},{threshold:0.2});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');
let hearts = []; const maxHearts = 60;
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
function spawnHeart(){ return { x: Math.random()*canvas.width, y: canvas.height + Math.random()*canvas.height, size: 8 + Math.random()*14, speed: 0.4 + Math.random()*1.0, wobble: Math.random()*2*Math.PI, wobbleSpeed: 0.02 + Math.random()*0.03, alpha: 0.4 + Math.random()*0.6 }; }
for(let i=0;i<maxHearts;i++) hearts.push(spawnHeart());
function drawHeart(x, y, size, alpha){
  ctx.save(); ctx.translate(x, y); ctx.scale(size/20, size/20);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -6, -10, -6, -10, 4);
  ctx.bezierCurveTo(-10, 12, 0, 16, 0, 20);
  ctx.bezierCurveTo(0, 16, 10, 12, 10, 4);
  ctx.bezierCurveTo(10, -6, 0, -6, 0, 0);
  ctx.closePath(); ctx.fillStyle = `rgba(106,13,47,${alpha})`; ctx.fill(); ctx.restore();
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>{ h.y -= h.speed; h.x += Math.sin(h.wobble)*0.3; h.wobble += h.wobbleSpeed; if(h.y < -30){ h.x = Math.random()*canvas.width; h.y = canvas.height + 30; } drawHeart(h.x, h.y, h.size, h.alpha); });
  requestAnimationFrame(animate);
}
animate();

// QR de Google Drive (reemplaza la URL con tu carpeta real)
const driveURL = 'https://drive.google.com/drive/folders/ENLACE_DE_TU_CARPETA';
new QRCode(document.getElementById('qrcode'), { text: driveURL, width: 180, height: 180 });

function sendWhatsApp(event) {
  event.preventDefault();

  // Tu número de WhatsApp (sin + ni guiones, solo con el código de país)
  const telefono = "51936019965"; // Perú (+51)
  const mensaje = 'Hola, confirmo mi asistencia a la boda!';

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

