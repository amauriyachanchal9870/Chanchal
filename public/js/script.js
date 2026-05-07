document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor & Snake Shadow Animation
    const cursor = document.querySelector('.custom-cursor');
    const outline = document.querySelector('.cursor-outline');
    const follower = document.querySelector('.custom-cursor-follower');

    // Only apply on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        const dots = [];
        const mouse = { x: 0, y: 0 };
        const amount = 20; // Fewer, more distinct balls
        const colors = ['#10b981', '#4f46e5', '#f59e0b', '#ef4444', '#3b82f6'];

        for (let i = 0; i < amount; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-snake-shadow';
            document.body.appendChild(dot);

            dot.style.background = colors[i % colors.length];
            dots.push({ x: 0, y: 0, element: dot });
        }

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            cursor.style.left = mouse.x + 'px';
            cursor.style.top = mouse.y + 'px';

            // Faint spotlight follower
            follower.style.left = mouse.x + 'px';
            follower.style.top = mouse.y + 'px';
        });

        let outlineX = 0;
        let outlineY = 0;

        const animateTrail = () => {
            // Outline follows the mouse with smooth easing
            outlineX += (mouse.x - outlineX) * 0.2;
            outlineY += (mouse.y - outlineY) * 0.2;
            outline.style.left = outlineX + 'px';
            outline.style.top = outlineY + 'px';

            dots.forEach((dot, index) => {
                // Each dot follows the mouse independently with varying speeds
                const factor = 0.25 - (index / amount) * 0.2; 
                
                // Add "spread" by offsetting target slightly based on index and time
                // This creates a loose, organic cluster effect
                const time = Date.now() * 0.002;
                const spreadX = Math.cos(time + index * 0.5) * (index * 1.5);
                const spreadY = Math.sin(time + index * 0.5) * (index * 1.5);

                dot.x += (mouse.x + spreadX - dot.x) * factor;
                dot.y += (mouse.y + spreadY - dot.y) * factor;

                dot.element.style.left = dot.x + 'px';
                dot.element.style.top = dot.y + 'px';

                // Taper the size and opacity as they trail behind
                const scale = (amount - index) / amount;
                dot.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
                dot.element.style.opacity = scale;
            });

            requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Add hover effect to interactive elements
        const hoverElements = document.querySelectorAll('a, button, input, textarea, .hover-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('hover-active');
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                // Maintain consistent Amber color on hover
            });
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('hover-active');
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                outline.style.transform = 'translate(-50%, -50%) scale(1)';
                // Revert to consistent Amber color
            });
        });
    }

    // 2. Typed.js Initialization
    if (document.querySelector('.typing-text') && typeof Typed !== 'undefined') {
        new Typed('.typing-text', {
            strings: [
                'Mobile Apps.',
                'Clean Architecture.',
                'Scalable Backends.',
                'Exceptional UIs.'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            cursorChar: '|'
        });
    }

    // 3. Particles.js Initialization
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#10b981", "#4f46e5"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#94a3b8",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.3 } },
                    "push": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }

    // Floating Words Background Animation
    const words = ['flutter', 'init()', 'json{}', 'async', 'await', 'Widget', '<Code />', 'Node.js', 'Dart', 'API', 'import', '=>', 'build()', 'package:'];
    const wordsContainer = document.getElementById('floating-words-container');

    if (wordsContainer) {
        function createWord() {
            const wordEl = document.createElement('div');
            wordEl.className = 'floating-word';
            wordEl.innerText = words[Math.floor(Math.random() * words.length)];

            const startPosX = Math.random() * 100;
            const floatDuration = 15 + Math.random() * 25; // 15s to 40s
            const fontSize = 1 + Math.random() * 2.5; // 1rem to 3.5rem

            wordEl.style.left = `${startPosX}vw`;
            wordEl.style.animationDuration = `${floatDuration}s`;
            wordEl.style.fontSize = `${fontSize}rem`;
            // Randomly set color to Emerald or Indigo
            wordEl.style.color = Math.random() > 0.5 ? 'var(--accent-1)' : 'var(--accent-2)';

            wordsContainer.appendChild(wordEl);

            setTimeout(() => {
                wordEl.remove();
            }, floatDuration * 1000 + 1000);
        }

        for (let i = 0; i < 12; i++) {
            setTimeout(createWord, Math.random() * 8000);
        }

        setInterval(createWord, 3000);

        window.addEventListener('scroll', () => {
            const expSection = document.getElementById('experience');
            if (expSection) {
                const top = expSection.getBoundingClientRect().top;
                if (top < window.innerHeight * 0.7) {
                    wordsContainer.style.opacity = '0';
                } else {
                    wordsContainer.style.opacity = '1';
                }
            }
        });
    }

    // 4. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const headers = document.querySelectorAll('.section-header');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });

        // Separate active class for section headers to trigger line animation
        headers.forEach((header) => {
            const elementTop = header.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                header.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 5. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.border = '1px solid var(--glass-border)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 80) {
            // Scroll down - hide
            navbar.style.transform = 'translateX(-50%) translateY(-100px)';
        } else {
            // Scroll up - show
            navbar.style.transform = 'translateX(-50%) translateY(0)';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.border = '1px solid rgba(16, 185, 129, 0.2)'; // glow border
        }
        lastScroll = currentScroll;
    });

    // 6. Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex' && navLinks.style.flexDirection === 'column') {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.borderRadius = '';
            navLinks.style.borderBottom = '';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-secondary)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid var(--glass-border)';
            navLinks.style.zIndex = '999';
        }
    });

    // 8. Handle form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';

            // Simulate sending
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                btn.style.opacity = '1';
                btn.style.background = 'var(--accent-1)';
                btn.style.color = '#fff';
                lucide.createIcons();
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = 'var(--text-primary)';
                    btn.style.color = 'var(--bg-primary)';
                    lucide.createIcons();
                }, 3000);
            }, 1000);
        });
    }
});
