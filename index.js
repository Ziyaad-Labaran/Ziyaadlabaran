// Wait for DOM to load

// ------------------- COUNTER -------------------
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

    if (!('IntersectionObserver' in window)) {
        counters.forEach(counter => {
            if (counter.getAttribute('data-target')) {
                animateCounter(counter);
            }
        });
        return;
    }

    const observerOptions = { root: null, threshold: 0.1 };
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
});


// ------------------- PROJECT SLIDER -------------------
// const services = [
//     {
//         title: "Tourism in Ghana Project",
//         description: "A professional tourism website, expertly developed with HTML, CSS, and JavaScript, showcasing key Ghanaian destinations and integrated booking features for a seamless user experience.",
//         features: [
//             "<hr>",
//             `<div class="pro-icons">
//                 <div><a href="https://pearson-ziyaad-re.vercel.app/index.html"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ffffff;"></i></a></div>
//                 <div><a href="https://github.com/Ziyaad-Labaran/pearson-ziyaad-re"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
//             </div>`
//         ],
//         image: "pearson-ziyaad-re.vercel.app_index.html.png"
//     },
//     {
//         title: "Climate Change Project",
//         description: "A focused website that educates and mobilizes youth for climate action, highlighting initiatives like tree planting and cleanup campaigns to foster environmental awareness and engagement.",
//         features: [
//             "<hr>",
//             `<div class="pro-icons">
//                 <div><a href="https://pearson-climate.vercel.app/"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ffffff;"></i></a></div>
//                 <div><a href="https://github.com/Ziyaad-Labaran/pearson-climate"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
//             </div>`
//         ],
//         image: "pearson-climate.vercel.app_.png"
//     },
//     {
//         title: "Mobile Apps and Web Apps Project",
//         description: "This professionally developed website serves as a digital agency's portfolio, showcasing expertise in custom web and mobile application development with a focus on delivering scalable digital solutions for businesses.",
//         features: [
//             "<hr>",
//             `<div class="pro-icons">
//                 <div><a href="https://mobile-ziyaad.vercel.app/"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ffffff;"></i></a></div>
//                 <div><a href="https://github.com/Ziyaad-Labaran/mobile-ziyaad"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
//             </div>`
//         ],
//         image: "mobile-ziyaad.vercel.app_.png"
//     },
//     {
//         title: "E-commerce Project",
//         description: "This is a fully functional e-commerce platform designed for intuitive navigation and an optimized shopping experience in electronics and home appliances.",
//         features: [
//             "<hr>",
//             `<div class="pro-icons">
//                 <div><a href="https://ecommerce-zii.vercel.app/"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #ffffff;"></i></a></div>
//                 <div><a href="https://github.com/Ziyaad-Labaran/Ecommerce"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
//             </div>`
//         ],
//         image: "ecommerce-zii.vercel.app_.png"
//     }
// ];

// let currentIndex = 0;
// let isAnimating = false;
// const serviceTitle = document.getElementById('serviceTitle');
// const serviceDescription = document.getElementById('serviceDescription');
// const serviceFeatures = document.getElementById('serviceFeatures');
// const serviceImage = document.getElementById('serviceImage');
// const serviceInfo = document.getElementById('serviceInfo');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// const indicators = document.querySelectorAll('.indicator-dot');

// function updateService(newIndex, direction = 'right') {
//     if (isAnimating) return;
//     isAnimating = true;
//     serviceInfo.classList.add('fade-out');

//     serviceImage.classList.add(direction === 'right' ? 'slide-out-right' : 'slide-out-left');

//     setTimeout(() => {
//         currentIndex = newIndex;
//         const service = services[currentIndex];

//         serviceTitle.textContent = service.title;
//         serviceDescription.textContent = service.description;
//         serviceFeatures.innerHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
//         serviceImage.src = service.image;
//         serviceImage.alt = service.title;

//         indicators.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));

//         serviceInfo.classList.remove('fade-out');
//         serviceImage.classList.remove('slide-out-right', 'slide-out-left');

//         setTimeout(() => isAnimating = false, 400);
//     }, 400);
// }

// function nextService() {
//     const newIndex = (currentIndex + 1) % services.length;
//     updateService(newIndex, 'right');
// }

// function prevService() {
//     const newIndex = (currentIndex - 1 + services.length) % services.length;
//     updateService(newIndex, 'left');
// }

// nextBtn.addEventListener('click', nextService);
// prevBtn.addEventListener('click', prevService);

// indicators.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         if (index !== currentIndex) {
//             const direction = index > currentIndex ? 'right' : 'left';
//             updateService(index, direction);
//         }
//     });
// });

// setInterval(nextService, 7000);

// ------------------- TYPED TEXT -------------------
const texts = ["Frontend Developer", "Graphic Designer", "UI/UX Designer"];
let count = 0, index = 0, currentText = '', letter = '';
(function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    const typedText = document.getElementById('typed-text');
    if (typedText) typedText.textContent = letter;

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

// ------------------- MOBILE NAV -------------------
const Menu = document.getElementById('hamburger');
const mobile = document.querySelector('nav');
const cloSe = document.getElementById('close');
const nav = document.getElementById('nav');

Menu.addEventListener("click", () => mobile.style.left = "0");
cloSe.addEventListener("click", () => mobile.style.left = "-100%");
nav.addEventListener("click", () => nav.style.left = "-100%");

// ------------------- SKILLS OBSERVER -------------------
const skills = document.querySelectorAll('.skills-container div');
const skillsObserverCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
};
const skillsObserver = new IntersectionObserver(skillsObserverCallback, { threshold: 0.1 });
skills.forEach(skill => skillsObserver.observe(skill));
