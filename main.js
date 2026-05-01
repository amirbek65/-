document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Эффект частиц (Листья/Пыль) ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '#d4af37' : '#6b8e23'; // Золотой или зеленый
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // --- 2. Параллакс эффект для главного экрана ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const layer1 = document.querySelector('.layer-1');
        const layer2 = document.querySelector('.layer-2');
        const heroContent = document.querySelector('.hero-content');

        if (layer1) layer1.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (layer2) layer2.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - scrolled / 700;
        }
    });

    // --- 3. Intersection Observer для появления элементов ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Интерактивная галерея природы ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const poemText = document.getElementById('poem-text');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const poem = item.getAttribute('data-poem');

            // Плавная смена текста
            poemText.style.opacity = 0;
            setTimeout(() => {
                poemText.textContent = poem;
                poemText.style.opacity = 1;
            }, 400);
        });
    });

    // --- 5. Генератор случайных цитат ---
    const quotes = [
        "«Я зеленая ветвь! Сок земли животворный я впитала!»",
        "«Ты была, моя Родина, теплой рекою, и в коробочке хлопка твой лик возникал.»",
        "«Только тот может истинным быть гражданином, кто вместит в своем сердце всю землю твою!»",
        "«Я ведь ветка твоя! Без тебя меня нет.»",
        "«Я во всем узнавал тебя — в тающем клине улетающих птиц над осенней страной...»",
        "«Кто умелее — бог или птица?»",
        "«Я — древа Пушкина росток. Бердах в крови моей.»",
        "«И свирель из коры твоей тонко звучала — отголосок наивных раздумий моих.»",
        "«В громком зове фазана из рощи ночной, в крике коростеля на пустынной равнине.»",
        "«Сколько б я ни любил землю ту, где родился, но отдельно от Родины — что мне она?»"
    ];

    const quoteDisplay = document.getElementById('random-quote');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);

        quoteDisplay.style.opacity = 0;
        setTimeout(() => {
            quoteDisplay.textContent = quotes[randomIndex];
            quoteDisplay.style.opacity = 1;
        }, 500);
    }

    newQuoteBtn.addEventListener('click', getRandomQuote);

    // Инициализация первой цитаты
    getRandomQuote();

    // --- 6. Плавный скролл для кнопки ---
    document.querySelector('.scroll-down-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});