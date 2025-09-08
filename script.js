const audioBtn = document.getElementById('audioBtn');
  const song = document.getElementById('song');

  // Forzar que todo el contenido del botón sea clickeable
  audioBtn.style.cursor = 'pointer';
  
  audioBtn.addEventListener('click', () => {
    if (song.paused) {
      song.play().catch(e => console.log('Error reproduciendo audio:', e));
      audioBtn.innerHTML = '<span class="material-symbols-outlined">pause</span><span>Pausar canción</span>';
    } else {
      song.pause();
      audioBtn.innerHTML = '<span class="material-symbols-outlined">music_note</span><span>Escucha nuestra canción</span>';
    }
  });

// Cuenta regresiva hasta la 1:00 AM del 27 de septiembre de 2025
// Cuenta regresiva hasta la 1:00 AM del 27 de septiembre de 2025
const target = new Date('2025-09-27T01:00:00').getTime();
const countdownEl = document.getElementById('countdown');
let fireworksShown = false;

function showFireworks() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = [];

  function createFirework(x, y) {
    const colors = ['#ff0044', '#ffbb00', '#00ffcc', '#3399ff', '#ff66ff'];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x, y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 6 + 2,
        radius: 2,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    // Estela transparente (no tapa la web, pero deja rastro épico)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      const vx = Math.cos(p.angle) * p.speed;
      const vy = Math.sin(p.angle) * p.speed + 0.2;
      p.x += vx;
      p.y += vy;
      p.alpha -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
      ctx.fill();

      if (p.alpha <= 0) particles.splice(i, 1);
    }

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  // Lanza varios fuegos artificiales en distintas posiciones
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6
      );
      animate();
    }, i * 800);
  }
}

function updateCountdown() {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    countdownEl.textContent = "¡Ya empezó el gran día! 🎆";
    if (!fireworksShown) {
      showFireworks();
      fireworksShown = true;
    }
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.textContent = `Faltan ${d} días, ${h} horas, ${m} minutos y ${s} segundos`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


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

function checkNombre() {
  const nombre = document.getElementById("nombreInvitado").value.trim();
  const button = document.getElementById("confirmButton");
  button.disabled = !nombre; // Desactiva el botón si no hay nombre
}

function checkNombre() {
  const nombre = document.getElementById("nombreInvitado").value.trim();
  const button = document.getElementById("confirmButton");
  button.disabled = !nombre; // Desactiva el botón si no hay nombre
}

function sendWhatsApp() {
  const telefono = "51936019965"; // Número destino
  const nombre = document.getElementById("nombreInvitado").value.trim();
  const tipo = document.getElementById("tipoMensaje").value;

if (!nombre) {
    alert("Por favor, ingresa tu nombre antes de continuar.");
    return;
  }

  let mensaje = "";

  switch(tipo) {
    case "formal":
      mensaje = "Hola, confirmo mi asistencia a la boda.";
      if (nombre) {
        mensaje = `Hola, soy ${nombre}, confirmo mi asistencia a la boda.`;
      }
      break;

    case "carinoso":
      mensaje = "Hola, confirmo mi asistencia a la boda. ¡Gracias por contar conmigo en este día tan especial!";
      if (nombre) {
        mensaje = `Hola, soy ${nombre}, confirmo mi asistencia a la boda. ¡Gracias por contar conmigo en este día tan especial!`;
      }
      break;

    case "comico":
      mensaje = "¡Hola! Confirmo mi asistencia a la boda… no pienso perderme la fiesta gratis 😜🍾";
      if (nombre) {
        mensaje = `¡Hola! Soy ${nombre}, confirmo mi asistencia a la boda. Prometo portarme bien… al menos hasta que empiece la fiesta jeje`;
      }
      break;
  }

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

