document.addEventListener('DOMContentLoaded', () => {
    // --- Counter Animation Logic (Existing Code) ---
    const counters = document.querySelectorAll('.number');
    const speed = 7000;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.number') || entry.target;
                if (counter && counter.getAttribute('data-target') && !counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    const counterItems = document.querySelectorAll('.counter-item');
    if (counterItems.length > 0) {
        counterItems.forEach(item => intersectionObserver.observe(item));
    } else {
        counters.forEach(counter => {
            if (counter.getAttribute('data-target')) {
                intersectionObserver.observe(counter);
            }
        });
    }

    if (!('IntersectionObserver' in window)) {
        counters.forEach(counter => {
            if (counter.getAttribute('data-target')) {
                animateCounter(counter);
            }
        });
    }

    // --- Skills Section Animation (Existing Code) ---
    const skills = document.querySelectorAll('.skills-container div');

    const skillsObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = 1; // Ensure it's visible
                entry.target.style.transform = 'translateY(0)'; // Reset transform
            }
        });
    };

    const skillsObserver = new IntersectionObserver(skillsObserverCallback, {
        threshold: 0.1
    });

    skills.forEach(skill => {
        skillsObserver.observe(skill);
    });

    // --- Tabbed Content (Experiences, Skills, Education) Logic (Existing Code) ---
    const buttons = {
        'experiences-btn': {
            title: 'My Experiences',
            content: `
            <h2>My <span>Experiences</span></h2>
            <br>
            <br>
            <p>Passionate Junior Web Developer diligently building a strong foundation in HTML5, CSS3, and JavaScript
                fundamentals. Driven by curiosity and a commitment to continuous learning, I am actively honing my
                skills through hands-on projects, transforming ideas into functional and aesthetically pleasing web
                experiences. Eager to contribute and grow within a dynamic development environment.</p>
            `
        },
        'skills-btn': {
            title: 'My Skills',
            content: `
            <h1>My <span>Skills</span></h1>
                <br>
                <p>I have strong skills in a variety of technologies and tools including:</p>
                <div class="skills-container">
                    <div class="skill"><img src="https://cdn-icons-png.flaticon.com/128/732/732212.png" alt="HTML5">
                    </div>
                    <div class="skill"><img src="https://cdn-icons-png.flaticon.com/128/732/732190.png" alt="CSS3">
                    </div>
                    <div class="skill"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png"
                                alt="JavaScript"></div>
                    <div class="skill"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968705.png" alt="Figma">
                    </div>
                    <div class="skill"><img src="adobe-xd-icon-1024x1024-njjmrpui.png"
                                alt="Adobe Xd"></div>
                    <div class="skill"><img src="https://cdn-icons-png.flaticon.com/128/1126/1126012.png" alt="React">
                    </div>
                    <div class="skill"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968520.png"
                                alt="Photoshop"></div>
                                <div class="skill"><img src="adobe-illustrator-icon-free-png.png"
                                alt="illustrator"></div>
                                    <div class="skill"><img src="1691829322canva-app-logo-png.png"
                                alt="canva"></div>
                                <div class="skill"><img src="174881.png"
                                alt="canva"></div>
            <div class="skill"><img src="GSAP-Logo.png"
                                alt="Gsap logo" width="100%" style="scale:3;"></div>
                </div>
            `
        },
        'education-btn': {
            title: 'My Education',
            content: `
            <h2>My <span>Education</span></h2>
            <br>
            <p>I hold the following academic qualifications:</p>
            <br>
            <ul>
                <li>West African Senior School Certificate (2021-2024)</li>
                <li>Pearson BTEC Level 2 Certificate in Creative Media Skills (2024 - 2025)</li>
            </ul>`
        },
    };

    const leftPanel = document.querySelector('.left-panel');
    const contentPanel = document.getElementById('content-panel');

    // Only proceed if these elements exist to avoid errors
    if (leftPanel && contentPanel) {
        function updateContent(buttonId) {
            contentPanel.innerHTML = buttons[buttonId].content;
            contentPanel.setAttribute('aria-labelledby', buttonId);
        }

        function clearActive() {
            const btns = leftPanel.querySelectorAll('button');
            btns.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });
        }

        leftPanel.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                clearActive();
                event.target.classList.add('active');
                event.target.setAttribute('aria-selected', 'true');
                event.target.setAttribute('tabindex', '0');
                updateContent(event.target.id);
                event.target.focus();
            }
        });

        leftPanel.addEventListener('keydown', (event) => {
            const btns = Array.from(leftPanel.querySelectorAll('button'));
            const currentIndex = btns.findIndex(btn => btn.classList.contains('active'));
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                event.preventDefault();
                const nextIndex = (currentIndex + 1) % btns.length;
                btns[nextIndex].click();
                btns[nextIndex].focus();
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevIndex = (currentIndex - 1 + btns.length) % btns.length;
                btns[prevIndex].click();
                btns[prevIndex].focus();
            }
        });

        // Initialize with the first button's content if needed, e.g., 'experiences-btn'
        const initialButton = document.getElementById('experiences-btn');
        if (initialButton) {
            initialButton.classList.add('active');
            initialButton.setAttribute('aria-selected', 'true');
            initialButton.setAttribute('tabindex', '0');
            updateContent('experiences-btn');
        }
    }


    // --- Service Display/Filtering Logic (Existing Code) ---
    const messageDis = document.getElementById("service-cont");
    const Clickbut = document.getElementById("ux-de");
    const Appear = document.getElementById("service-main");
    const webDev = document.getElementById("web");
    const Graphic = document.getElementById("graph-de");

    if (Clickbut && Appear && webDev && Graphic && messageDis) {
        Clickbut.addEventListener("click", () => {
            messageDis.style.display = "none";
            Appear.innerHTML = `
            <section class="portfolio-section">
                <div class="portfolio-card">
                    <img src="Screenshot (38).png" alt="UI/UX Design 1" class="portfolio-image" />
                    <div class="portfolio-content">
                        <a href="https://www.figma.com/proto/FlMeQlZzC83lwWvNkEQUVW/Food-app?node-id=83-44&starting-point-node-id=1%3A2&t=Jv8VqJJyPEogejnP-1" class="btn">View Project</a>
                    </div>
                </div>
                <div class="portfolio-card">
                    <img src="Screenshot (42).png" alt="UI/UX Design 2" class="portfolio-image" />
                    <div class="portfolio-content">
                        <a href="https://www.figma.com/proto/GscyDiKXx8TuZJ3Kixy2mM/Ziyaad-mobile?node-id=172-2&starting-point-node-id=172%3A2&t=ETFeHcyERmXaMq3l-1" class="btn">View Project</a>
                    </div>
                </div>
                <div class="portfolio-card">
                    <img src="Screenshot (40).png" alt="UI/UX Design 3" class="portfolio-image" />
                    <div class="portfolio-content">
                        <a href="https://www.figma.com/proto/vF0VYuuE9OJ0IKu2Eg9eAV/Library-website?node-id=1-2&starting-point-node-id=1%3A2&t=EHOJ6wCMAsl4ZY7K-1" class="btn">View Project</a>
                    </div>
                </div>
                <div class="portfolio-card">
                    <img src="Screenshot (37).png" alt="UI/UX Design 4" class="portfolio-image" />
                    <div class="portfolio-content">
                        <a href="https://www.figma.com/proto/kva0wFBsdwhNAy9MwcStIQ/Tiktok-app?node-id=1-2&starting-point-node-id=44%3A18&t=52S7WkpyFiYpmSZ8-1" class="btn">View Project</a>
                    </div>
                </div>
            </section>
            `;
        });

        webDev.addEventListener("click", () => {
            messageDis.style.display = "flex";
            Appear.innerHTML = `
            <section class="modern-projects">
                <div class="projects-grid">
                    <div class="project-card">
                        <img src="pearson-ziyaad-re.vercel.app_index.html.png" alt="Tourism Project" />
                        <div class="project-content">
                            <h3>Tourism in Ghana Project</h3>
                            <p>A professional tourism website, expertly developed with HTML, CSS, and JavaScript, showcasing key Ghanaian destinations and integrated booking features for a seamless user experience.</p>
                            <div class="project-links">
                                <a href="https://pearson-ziyaad-re.vercel.app/index.html" target="_blank">Live</a>
                                <a href="https://github.com/Ziyaad-Labaran/pearson-ziyaad-re" target="_blank">Code</a>
                            </div>
                        </div>
                    </div>
                    <div class="project-card">
                        <img src="pearson-climate.vercel.app_.png" alt="Climate Project" />
                        <div class="project-content">
                            <h3>Climate Change Project</h3>
                            <p>Educates and mobilizes youth for climate action, highlighting initiatives like tree planting and cleanup campaigns to foster environmental awareness and engagement.</p>
                            <div class="project-links">
                                <a href="https://pearson-climate.vercel.app/" target="_blank">Live</a>
                                <a href="https://github.com/Ziyaad-Labaran/pearson-climate" target="_blank">Code</a>
                            </div>
                        </div>
                    </div>
                    <div class="project-card">
                        <img src="mobile-ziyaad.vercel.app_.png" alt="Agency Project" />
                        <div class="project-content">
                            <h3>Mobile & Web Apps Project</h3>
                            <p>Digital agency portfolio showcasing expertise in custom web and mobile application development for scalable digital solutions.</p>
                            <div class="project-links">
                                <a href="https://mobile-ziyaad.vercel.app/" target="_blank">Live</a>
                                <a href="https://github.com/Ziyaad-Labaran/mobile-ziyaad" target="_blank">Code</a>
                            </div>
                        </div>
                    </div>
                    <div class="project-card">
                        <img src="ecommerce-zii.vercel.app_.png" alt="Ecommerce Project" />
                        <div class="project-content">
                            <h3>E-commerce Project</h3>
                            <p>A fully functional e-commerce platform designed for intuitive navigation and an optimized shopping experience in electronics and home appliances.</p>
                            <div class="project-links">
                                <a href="https://ecommerce-zii.vercel.app/" target="_blank">Live</a>
                                <a href="https://github.com/Ziyaad-Labaran/Ecommerce" target="_blank">Code</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `;
        });

        Graphic.addEventListener("click", () => {
            messageDis.style.display = "flex";
            Appear.innerHTML = `
            <section class="portfolio-section">
                <div class="portfolio-card">
                    <img src="Ziyaads work (2).jpg" alt="Project thumbnail" class="portfolio-image" />
                </div>
                <div class="portfolio-card">
                    <img src="Kingzii.jpg" alt="Project thumbnail" class="portfolio-image" />
                </div>
                <div class="portfolio-card">
                    <img src="Ziyaad estate2.jpg" alt="Ziyaad graphic design 1" class="portfolio-image" />
                </div>
            </section> `;
        });
    }

    // --- Mobile Navigation (Hamburger Menu) (Existing Code) ---
    const hamburgerMenu = document.getElementById('hamburger');
    const mobileNav = document.querySelector('nav');
    const closeBtn = document.getElementById('close');

    if (hamburgerMenu && mobileNav && closeBtn) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.add('active');
            hamburgerMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });

        mobileNav.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' || event.target === mobileNav) {
                mobileNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });
    }


    // --- TYPING ANIMATION LOGIC (MOVED HERE) ---
    const phrases = ["Front-End Developer", "UI/UX Designer", "Graphic Designer"];
    const animatedTextElement = document.getElementById("animated-text"); // Make sure this ID exists in your HTML: <span id="animated-text"></span>

    // Check if the element exists before trying to animate it
    if (animatedTextElement) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150; // Speed of typing (milliseconds)
        let deletingSpeed = 75; // Speed of deleting (milliseconds)
        let delayBetweenPhrases = 1000; // Delay before typing the next phrase (milliseconds)

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                // Deleting text
                animatedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing text
                animatedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // If done typing, start deleting after a delay
                isDeleting = true;
                setTimeout(type, delayBetweenPhrases);
            } else if (isDeleting && charIndex === 0) {
                // If done deleting, move to the next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length; // Cycle through phrases
                setTimeout(type, typingSpeed);
            } else {
                // Continue typing or deleting
                setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
            }
        }

        // Start the typing animation when the DOM is fully loaded (already inside DOMContentLoaded)
        type();
    }
});