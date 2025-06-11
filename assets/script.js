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

    function startAutoAdvance() {
        autoAdvance = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function resetAutoAdvance() {
        clearInterval(autoAdvance);
        startAutoAdvance();
    }

    updateCarrossel();
    startAutoAdvance();

    // Data card animation
    const dataNumbers = document.querySelectorAll('.data-number');
    dataNumbers.forEach(number => {
        const originalText = number.innerText;
        const match = originalText.match(/([\d\.]+)(\+?)/);
        let target = 0, suffix = '';
        if (match) {
            target = parseInt(match[1].replace(/\./g, ''));
            suffix = match[2] || '';
        }
        const duration = 2000, startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            let formatted = value.toLocaleString('pt-BR');
            if (suffix) formatted += suffix;
            number.innerText = formatted;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animate();
                observer.disconnect();
            }
        });
        observer.observe(number);
    });
});
