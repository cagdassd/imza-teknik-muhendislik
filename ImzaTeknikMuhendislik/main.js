const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const slides = document.querySelectorAll(".slide");
const contents = document.querySelectorAll(".content");
const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");
const navBtns = document.querySelectorAll(".nav-btn");

let currentSlide = 0;
const slideCount = slides.length;

let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 100;

const hamburger = document.querySelector('.hamburger-menu');
const closeBtn = document.querySelector('.close-btn');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navigation.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

hamburger.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

document.querySelectorAll('.navigation-items a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navigation.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navigation.classList.contains('active')) {
        toggleMenu();
    }
});

document.addEventListener('click', (e) => {
    if (navigation.classList.contains('active') && 
        !navigation.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

function updateSlider(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));
    navBtns.forEach(btn => btn.classList.remove("active"));

    slides[index].classList.add("active");
    contents[index].classList.add("active");
    navBtns[index].classList.add("active");

    currentSlide = index;
}

function nextSlide() {
    let newIndex = (currentSlide + 1) % slideCount;
    updateSlider(newIndex);
}

function prevSlide() {
    let newIndex = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider(newIndex);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

navBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => updateSlider(index));
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextSlide();
    } else if (e.key === "ArrowLeft") {
        prevSlide();
    }
});

let autoSlideInterval = setInterval(nextSlide, 5000);

const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;

    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        if (scrollTop > scrollThreshold) {
            header.classList.add('hide');
            header.classList.remove('sticky');
        }
    } else {
        header.classList.remove('hide');
        if (scrollTop > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    lastScrollTop = scrollTop;
});

document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
});

document.querySelectorAll('.service-block-four .inner-box').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.remove('hide');
                }, 0);
            } else {
                card.classList.add('hide');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-overlay').style.opacity = '1';
        card.querySelector('.project-info').style.transform = 'translateY(0)';
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-overlay').style.opacity = '0';
        card.querySelector('.project-info').style.transform = 'translateY(20px)';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (navigation.classList.contains('active')) {
            toggleMenu();
        }

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 90;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            document.querySelectorAll('.navigation-items a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.navigation-items a').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

