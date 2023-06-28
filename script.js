let currentIndex = 0;
let carouselItems = [];
let autoNavigate;

// Automatic navigation
function startAutoNavigate() {
    autoNavigate = setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        renderCarousel();
    }, 10000); // every 5 seconds
}

// Stop automatic navigation
function stopAutoNavigate() {
    clearInterval(autoNavigate);
}

fetch('carouselItems.json')
    .then(response => response.json())
    .then(data => {
        carouselItems = data;
        renderCarousel();  // Initial render after loading the data
        startAutoNavigate();  // Start automatic navigation after loading the data
    });

document.querySelector('.testimonial-content').addEventListener('mouseover', stopAutoNavigate);
document.querySelector('.testimonial-content').addEventListener('mouseout', startAutoNavigate);

function renderCarousel() {
    // Get elements
    let carousel = document.querySelector('.testimonial-content');
    let indicators = document.querySelectorAll('.circle-container .circle');
    let counter = document.querySelector('.bottom-text');

    // Fade out current item
    carousel.style.opacity = '0';

    // Delay to let the fade out effect finish
    setTimeout(() => {
        // Update carousel content
        let item = carouselItems[currentIndex];
        carousel.querySelector('.testimonial-left-column img').src = item.img;
        carousel.querySelector('.testimonial-right-column h3').innerText = item.heading;
        carousel.querySelector('.testimonial-right-column p').innerText = item.body;

        // Update active indicator
        indicators.forEach((indicator, index) => {
            if(index === currentIndex) {
                indicator.classList.add('active-circle');
            } else {
                indicator.classList.remove('active-circle');
            }
        });

        // Update counter
        counter.innerText = (currentIndex+1) + "/" + carouselItems.length;

        // Fade in new item
        carousel.style.opacity = '1';
    }, 500);  // Delay in ms; this should be the same as the CSS transition duration
}


// Adjusted arrow click handlers for continuous looping
document.querySelector('.arrow-icons img[alt="arrow-up"]').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    renderCarousel();
});

document.querySelector('.arrow-icons img[alt="arrow-down"]').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    renderCarousel();
});