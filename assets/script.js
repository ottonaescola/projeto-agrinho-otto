document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.carrossel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoAdvance;

    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        updateCarrossel();
    }

    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
        resetAutoAdvance();
    });

    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
        resetAutoAdvance();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            goToSlide(parseInt(this.getAttribute('data-index')));
            resetAutoAdvance();
        });
    });
  
