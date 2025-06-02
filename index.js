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
        description: "Transform your digital presence with cutting-edge web solutions that captivate and convert.",
        features: [
            "<hr>",
             ` <div class="pro-icons">
                                        <div> <a href="index.html"<i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="index.html"<i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `
            
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
    },
    {

        title: "Climate change project",
        description: "Create powerful mobile experiences that engage users across iOS and Android platforms.",
        features: [
            "<hr>",
            ` <div class="pro-icons">
                                        <div> <a href="index.html"><i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="index.html"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `
        ],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center"
    },
    {
        title: "Mobile apps and Web apps project",
        description: "Amplify your brand reach with data-driven marketing strategies that deliver measurable results.",
        features: [
            "<hr>",
             ` <div class="pro-icons">
                                        <div> <a href="index.html"><i class="fa-solid fa-arrow-up-right-from-square"
                                                style="color: #ffffff;"></i></a></div>
                                        <div><a href="index.html"><i class="fa-brands fa-github" style="color: #ffffff;"></i></a></div>
                                    </div> `
        ],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
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

    // Animate out current content
    serviceInfo.classList.add('fade-out');

    if (direction === 'right') {
        serviceImage.classList.add('slide-out-right');
    } else {
        serviceImage.classList.add('slide-out-left');
    }

    setTimeout(() => {
        // Update content
        currentIndex = newIndex;
        const service = services[currentIndex];

        serviceTitle.textContent = service.title;
        serviceDescription.textContent = service.description;

        serviceFeatures.innerHTML = service.features
            .map(feature => `<li>${feature}</li>`)
            .join('');

        serviceImage.src = service.image;
        serviceImage.alt = service.title;

        // Update indicators
        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Animate in new content
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

// Event listeners
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

// Auto-advance every 6 seconds
setInterval(nextService, 6000);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextService();
    if (e.key === 'ArrowLeft') prevService();
});