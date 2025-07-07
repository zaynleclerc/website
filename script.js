document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // --- GİRİŞ EKRANI LOGIC ---
    preloader.addEventListener('click', () => {
        preloader.style.opacity = '0';
        mainContent.style.opacity = '1';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            initAnimations(); // Animasyonları başlat
        }, 800);
    });

    function initAnimations() {
        
        // --- SİHİRLİ İMLEÇ EFEKTİ ---
        const cursor = document.createElement('div');
        cursor.className = 'sparkle-cursor';
        document.body.appendChild(cursor);
        
        let lastTrailTime = 0;
        const trailInterval = 50; // ms

        window.addEventListener('mousemove', e => {
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
            cursor.style.opacity = '1';

            const now = Date.now();
            if (now > lastTrailTime + trailInterval) {
                lastTrailTime = now;
                const trail = document.createElement('div');
                trail.className = 'sparkle-trail';
                trail.style.top = e.clientY + 'px';
                trail.style.left = e.clientX + 'px';
                document.body.appendChild(trail);
                setTimeout(() => trail.remove(), 800);
            }
        });
        
        // --- HARF HARF YAZMA ANİMASYONU ---
        const letterAnimatedElements = document.querySelectorAll('.animate-letters');
        letterAnimatedElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = '';
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Boşlukları koru
                span.style.animationDelay = `${index * 0.05}s`;
                el.appendChild(span);
            });
        });

        // --- SCROLL ANİMASYONLARI (FADE-IN) ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animasyon bir kez çalışsın
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // --- POLAROID NOTLARINI YERLEŞTİRME ---
        document.querySelectorAll('.polaroid .caption').forEach(el => {
            el.textContent = el.dataset.caption;
        });

        // --- DİLEK FENERİ GÖNDERME ---
        const lanternBtn = document.getElementById('release-lantern-btn');
        const sky = document.getElementById('lantern-sky');

        lanternBtn.addEventListener('click', () => {
            const lantern = document.createElement('div');
            lantern.className = 'lantern';
            lantern.style.left = `${Math.random() * 80 + 10}%`; // %10 ile %90 arasında
            lantern.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10-20 saniye arası
            
            sky.appendChild(lantern);

            setTimeout(() => {
                lantern.remove();
            }, 20000);
        });
    }
});