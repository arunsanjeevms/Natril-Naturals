// Countdown Timer
function initCountdown() {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 15);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Plant Growth Animation
function initPlantGrowth() {
    const plant = document.getElementById('plant');
    let growth = 0;

    function updateGrowth() {
        growth = growth >= 100 ? 0 : growth + 0.5;
        const scale = 0.3 + (growth / 100) * 0.7;
        const opacity = 0.4 + (growth / 100) * 0.6;
        
        plant.style.transform = `scale(${scale})`;
        plant.style.opacity = opacity;
    }

    setInterval(updateGrowth, 100);
}

// Floating Leaves Animation
function initFloatingLeaves() {
    const container = document.getElementById('floatingLeaves');
    const leafCount = 15;

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.innerHTML = `
            <svg width="${16 + Math.random() * 24}" height="${16 + Math.random() * 24}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
        `;
        
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.top = Math.random() * 100 + '%';
        leaf.style.animationDelay = Math.random() * 10 + 's';
        leaf.style.animationDuration = (8 + Math.random() * 4) + 's';
        
        container.appendChild(leaf);
    }
}

// Sound Toggle
function initSoundToggle() {
    const soundToggle = document.getElementById('soundToggle');
    const ambientSound = document.getElementById('ambientSound');
    let isPlaying = false;
    let isLoaded = false;

    ambientSound.volume = 0.3;
    
    ambientSound.addEventListener('canplaythrough', () => {
        isLoaded = true;
        soundToggle.disabled = false;
    });

    soundToggle.addEventListener('click', () => {
        if (!isLoaded) return;

        if (isPlaying) {
            ambientSound.pause();
            isPlaying = false;
            soundToggle.innerHTML = `
                <svg class="sound-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
            `;
            soundToggle.title = 'Play ambient sounds';
        } else {
            ambientSound.play().catch(() => {
                console.log('Autoplay prevented');
            });
            isPlaying = true;
            soundToggle.innerHTML = `
                <svg class="sound-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
            `;
            soundToggle.title = 'Mute ambient sounds';
        }
    });
}

// Email Signup
function initEmailSignup() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const notifyBtn = document.getElementById('notifyBtn');
    const btnText = notifyBtn.querySelector('.btn-text');
    const loadingSpinner = notifyBtn.querySelector('.loading-spinner');
    const emailSignup = document.getElementById('emailSignup');
    const successMessage = document.getElementById('successMessage');

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!emailInput.value.trim()) return;

        // Show loading state
        notifyBtn.disabled = true;
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'flex';

        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            emailSignup.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset form
            emailInput.value = '';
            notifyBtn.disabled = false;
            btnText.style.display = 'block';
            loadingSpinner.style.display = 'none';
        }, 1500);
    });
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initPlantGrowth();
    initFloatingLeaves();
    initSoundToggle();
    initEmailSignup();
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add intersection observer for animations (optional enhancement)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .time-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}