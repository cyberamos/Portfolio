// Portfolio JavaScript for Amos Toluwalase (Cyber Amos)

// Typing animation
const typed = {
  strings: [
    "Cybersecurity Professional", 
    "Penetration Tester", 
    "Security Analyst", 
    "Web Developer", 
    "Ethical Hacker",
    "Cinematographer"
  ],
  currentIndex: 0,
  charIndex: 0,
  isDeleting: false,
  
  init() {
    this.element = document.querySelector('.typing');
    if (this.element) {
      this.type();
    }
  },
  
  type() {
    const current = this.strings[this.currentIndex];
    
    if (this.isDeleting) {
      this.element.textContent = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let typeSpeed = this.isDeleting ? 50 : 100;
    
    if (!this.isDeleting && this.charIndex === current.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.strings.length;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
};

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Fade in animation on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    
    if (scrollPos >= top && scrollPos <= bottom) {
      navLinks.forEach(link => link.parentElement.classList.remove('active'));
      const correspondingLink = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
      if (correspondingLink) {
        correspondingLink.parentElement.classList.add('active');
      }
    }
  });
}

// Google Analytics
function initGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-169007209-3');
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Start typing animation
  typed.init();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Set initial nav state
  updateActiveNav();
  
  // Initialize Google Analytics
  initGoogleAnalytics();
});

// Update nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Add loading class removal for better performance
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});