// Mobile nav
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));

// Elevate header on scroll
const header = document.querySelector('[data-elevate]');
addEventListener('scroll', () => {
    header.style.boxShadow = scrollY > 4 ? 'var(--shadow)' : 'none';
}, { passive: true });

// Intersection observer for reveal
const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in');
}, { threshold: 0.12 });
document.querySelectorAll('[data-io]').forEach(el => io.observe(el));

// Count-up animation
function animateCount(el) {
    const target = Number(el.dataset.count || '0');
    const duration = 1200;
    const start = performance.now();
    const fmt = new Intl.NumberFormat();
    function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const val = Math.floor(target * (t * (2 - t))); // easeOutQuad
        el.textContent = fmt.format(val);
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
        if (e.isIntersecting) {
            e.target.querySelectorAll('[data-count]').forEach(animateCount);
            observer.unobserve(e.target);
        }
    }
}, { threshold: 0.3 });
document.querySelectorAll('#impact').forEach(el => observer.observe(el));

// Contact form -> mailto
const cform = document.getElementById('contact-form');
cform?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(cform);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent('REACH Partnerships – Inquiry from ' + name);
    const body = encodeURIComponent(
        `Name: ${name}
Email: ${email}

Message:
${message}

(Sent from reachpartnerships.org)`
    );
    window.location.href = `mailto:contact@reachpartnerships.org?subject=${subject}&body=${body}`;
});

// Footer year
document.getElementById('year').textContent = String(new Date().getFullYear());
