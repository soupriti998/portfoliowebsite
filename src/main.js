import './style.css'

// Scroll Reveal Observer
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // If it's a grid, trigger children stagger
      const children = entry.target.querySelectorAll('.stagger-item');
      if (children.length > 0) {
        children.forEach(child => child.classList.add('active'));
      }
      
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(revealCallback, revealOptions);

// Initialize observers
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('#project-grid').forEach(el => observer.observe(el));


// Smooth Scroll
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

// Toast Implementation (Sonner-inspired)
export const toast = (message) => {
    const toaster = document.getElementById('toaster') || createToaster();
    const toastEl = document.createElement('div');
    toastEl.className = 'glass-card px-4 py-3 text-sm font-medium flex items-center gap-3 animate-in slide-in-from-bottom-full duration-300 pointer-events-auto mb-2';
    toastEl.innerHTML = `
        <div class="w-2 h-2 rounded-full bg-cta"></div>
        <span>${message}</span>
    `;
    
    toaster.appendChild(toastEl);
    
    // Remove after 3s
    setTimeout(() => {
        toastEl.classList.add('opacity-0', 'scale-95', 'transition-all', 'duration-300');
        setTimeout(() => toastEl.remove(), 300);
    }, 3000);
};

function createToaster() {
    const toaster = document.createElement('div');
    toaster.id = 'toaster';
    toaster.className = 'fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none';
    document.body.appendChild(toaster);
    return toaster;
}

// Intercept CV download as a demo for toast
document.querySelector('a[href="#"]').addEventListener('click', (e) => {
    if (e.target.innerText === 'Download CV') {
        e.preventDefault();
        toast('Starting resume download...');
    }
});

// Cursor awareness for project cards (Emil's tip: make things feel alive)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});
