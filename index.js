document.addEventListener('DOMContentLoaded', () => {
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
                if (counter.getAttribute('data-target') && !counter.classList.contains('animated')) {
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
});



const services = [
    {
        title: "Tourism in Ghana Project",
        description: "A professional tourism website, expertly developed with HTML, CSS, and JavaScript, showcasing key Ghanaian destinations and integrated booking features for a seamless user experience.",
        features: [
            "<hr>",
            ` <div class="pro-icons">
                                        <div> <a href="https://pearson-ziyaad-re.vercel.app/index.html"<i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="https://github.com/Ziyaad-Labaran/pearson-ziyaad-re"<i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `

        ],
        image: "pearson-ziyaad-re.vercel.app_index.html.png"
    },
    {

        title: "Climate change project",
        description: "A focused website that educates and mobilizes youth for climate action, highlighting initiatives like tree planting and cleanup campaigns to foster environmental awareness and engagement.",
        features: [
            "<hr>",
            ` <div class="pro-icons">
                                        <div> <a href="https://pearson-climate.vercel.app/"><i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="https://github.com/Ziyaad-Labaran/pearson-climate"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `
        ],
        image: "pearson-climate.vercel.app_.png"
    },
    {
        title: "Mobile apps and Web apps project",
        description: "This professionally developed website serves as a digital agency's portfolio, showcasing expertise in custom web and mobile application development with a focus on delivering scalable digital solutions for businesses.",
        features: [
            "<hr>",
            ` <div class="pro-icons">
                                        <div> <a href="https://mobile-ziyaad.vercel.app/"><i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="https://github.com/Ziyaad-Labaran/mobile-ziyaad"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `
        ],
        image: "mobile-ziyaad.vercel.app_.png"
    },
    {
        title: "E-commerce project",
        description: "Craft exceptional user experiences through thoughtful design that balances beauty with functionality.",
        features: [
            "<hr>",
            ` <div class="pro-icons">
                                        <div> <a href="index.html"><i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="index.html"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `

        ],
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop&crop=center"
    },
];

let currentIndex = 0;
let isAnimating = false;

const serviceTitle = document.getElementById('serviceTitle');
const serviceDescription = document.getElementById('serviceDescription');
const serviceFeatures = document.getElementById('serviceFeatures');
const serviceImage = document.getElementById('serviceImage');
const serviceInfo = document.getElementById('serviceInfo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator-dot');

function updateService(newIndex, direction = 'right') {
    if (isAnimating) return;
    isAnimating = true;


    serviceInfo.classList.add('fade-out');

    if (direction === 'right') {
        serviceImage.classList.add('slide-out-right');
    } else {
        serviceImage.classList.add('slide-out-left');
    }

    setTimeout(() => {

        currentIndex = newIndex;
        const service = services[currentIndex];

        serviceTitle.textContent = service.title;
        serviceDescription.textContent = service.description;

        serviceFeatures.innerHTML = service.features
            .map(feature => `<li>${feature}</li>`)
            .join('');

        serviceImage.src = service.image;
        serviceImage.alt = service.title;

        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });


        serviceInfo.classList.remove('fade-out');
        serviceImage.classList.remove('slide-out-right', 'slide-out-left');

        setTimeout(() => {
            isAnimating = false;
        }, 100);
    }, 400);
}

function nextService() {
    const newIndex = (currentIndex + 1) % services.length;
    updateService(newIndex, 'right');
}

function prevService() {
    const newIndex = (currentIndex - 1 + services.length) % services.length;
    updateService(newIndex, 'left');
}

nextBtn.addEventListener('click', nextService);
prevBtn.addEventListener('click', prevService);

indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index !== currentIndex) {
            const direction = index > currentIndex ? 'right' : 'left';
            updateService(index, direction);
        }
    });
});

setInterval(nextService, 7000);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextService();
    if (e.key === 'ArrowLeft') prevService();
});


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
                </div> 
            </div>`
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

const texts = ["Frontend Developer", "Graphic Designer", "UI/UX Designer"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typed-text').textContent = letter;

    if (letter.length === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
            type();
        }, 2000);
    } else {
        setTimeout(type, 100);
    }
})();
// /////////////////////

const Menu = document.getElementById('hamburger');
const mobile = document.querySelector('nav');

Menu.addEventListener("click", () => {
    mobile.style.left = "0"
});

const cloSe = document.getElementById('close');
const humburger = document.querySelector('nav');
cloSe.addEventListener("click", () => {
    mobile.style.left = "-100%"
});
const nav = document.getElementById('nav');
const black = document.getElementById('nav');
nav.addEventListener("click", () => {
    black.style.left = "-100%"
});



 const  messageDis = document.getElementById("service-cont")
 const Clickbut = document.getElementById("ux-de")
const Appear = document.getElementById("service-main")
const webDev = document.getElementById("web")
const Graphic = document.getElementById("graph-de")

 Clickbut.addEventListener("click",()=>{
    messageDis.style.display = "none";
    Appear.textContent = " I just appeared ";

})

webDev.addEventListener("click",()=>{
    messageDis.style.display = "flex"
    Appear.textContent = `<h1>This is web dev<h1/>`
})

Graphic.addEventListener("click",()=>{
     messageDis.style.display = "flex"
    Appear.textContent = " Graphic Design"
})


