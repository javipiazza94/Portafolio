// ============================================
// 1. Typewriter con efecto de escritura y borrado
// ============================================
const texts = ["Data Scientist", "DAM Developer", "SAP Consultant"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        // Pausa antes de empezar a borrar
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // Pequeña pausa antes de escribir el siguiente
    }

    setTimeout(typewrite, speed);
}

typewrite();


// ============================================
// 2. Menú hamburguesa móvil
// ============================================
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navList.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navList.classList.remove('active');
    });
});


// ============================================
// 3. Scroll Reveal con IntersectionObserver
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ============================================
// 4. Back-to-Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ============================================
// 5. Nav shadow on scroll
// ============================================
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


// ============================================
// 6. Formulario de contacto (feedback visual)
// ============================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !contact || !subject || !message) {
        formFeedback.textContent = '⚠ Por favor, completa todos los campos obligatorios.';
        formFeedback.className = 'form-feedback error';
        return;
    }

    // Construir mailto
    const organization = document.getElementById('organization').value.trim();
    const body = `Nombre: ${name}%0D%0AContacto: ${contact}%0D%0AOrganización: ${organization}%0D%0A%0D%0A${message}`;
    const mailtoLink = `mailto:javipiazza94@email.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailtoLink;

    formFeedback.textContent = '✓ Abriendo tu cliente de correo...';
    formFeedback.className = 'form-feedback success';

    // Reset después de unos segundos
    setTimeout(() => {
        contactForm.reset();
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
    }, 4000);
});


// ============================================
// 7. Animación de Red Neuronal (Canvas)
// ============================================
const canvas = document.getElementById("canvas-network");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
const MAX_PARTICLES = 120; // Límite de rendimiento

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#64ffda';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = Math.min(
        Math.floor((canvas.height * canvas.width) / 12000),
        MAX_PARTICLES
    );
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * (canvas.width - size * 4) + size * 2;
        let y = Math.random() * (canvas.height - size * 4) + size * 2;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function connect() {
    const maxDistance = (canvas.width / 7) * (canvas.height / 7);
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = dx * dx + dy * dy;
            if (distance < maxDistance) {
                let opacity = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Debounced resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }, 250);
});

init();
animate();