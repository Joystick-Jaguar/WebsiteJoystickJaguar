const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });


const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.team-box').length - 1;

nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides;
  }
  updateCarousel();
});

function updateCarousel() {
  const slideWidth = carouselContainer.querySelector('.team-box').offsetWidth;
  carouselContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}
