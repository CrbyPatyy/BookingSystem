// Enhanced loading screen with progress simulation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
    // Initialize dynamic content
    renderRooms();
    initRoomSlider();
    initTourSlider();
});

// Image lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.classList.remove('image-loading');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});
document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

/*Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});*/

// Enhanced Mobile Menu with Better Interactions
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileMenuBtn.addEventListener('click', function() {
    const isExpanded = navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><span class="sr-only">Close menu</span>';
        document.body.style.overflow = 'hidden';
        // Add backdrop for mobile menu
        if (!document.getElementById('menuBackdrop')) {
            const backdrop = document.createElement('div');
            backdrop.id = 'menuBackdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            backdrop.addEventListener('click', closeMobileMenu);
            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.style.opacity = '1', 10);
        }
    } else {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i><span class="sr-only">Menu</span>';
    document.body.style.overflow = '';
    const backdrop = document.getElementById('menuBackdrop');
    if (backdrop) {
        backdrop.style.opacity = '0';
        setTimeout(() => backdrop.remove(), 300);
    }
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        closeMobileMenu();
    });
});

// Room data for dynamic content - Added Quad Room
const roomData = [
    {
        id: 'double-room',
        title: 'Double Room',
        description: 'Experience cozy comfort in our Double Room — perfect for couples who value privacy, style, and serenity.',
        features: ['Privacy', 'Style', 'Serenity'],
        price: '1,400/night',
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
        link: 'room/doubleroom.html'
    },
    {
        id: 'triple-room',
        title: 'Triple Room',
        description: 'Share unforgettable moments in our Triple Room, designed for space, comfort, and connection.',
        features: ['Space', 'Comfort', 'Connection'],
        price: '2,100/night',
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'],
        link: 'room/doubleroom.html'
    },
    {
        id: 'barkada-room',
        title: 'Barkada Room',
        description: 'Stay together and have fun in our Barkada Room. Built for Love, energy, and laughter.',
        features: ['Love', 'Energy', 'Laughter'],
        price: '5,600/night',
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80']
    },
    {
        id: 'quad-room',
        title: 'Quad Room',
        description: 'Perfect for families or groups, our Quad Room offers ample space, comfort, and convenience for everyone.',
        features: ['Ample Space', 'Comfort', 'Convenience'],
        price: '3,500/night',
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80']
    }
];

// Render rooms dynamically
function renderRooms() {
    const container = document.getElementById('roomsSlider');
    if (!container) return;
    container.innerHTML = roomData.map(room => `
        <div class="room-card" data-room-id="${room.id}">
            <div class="room-image">
                <img data-src="${room.images[0]}" alt="${room.title}" loading="lazy" class="image-loading">
            </div>
            <div class="room-content">
                <h3>${room.title}</h3>
                <p>${room.description}</p>
                <div class="room-features">
                    ${room.features.map(feature => `
                        <div class="feature">
                            <div class="feature-icon">✓</div>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="room-price">${room.price}</div>
                <a href="${room.link}" class="btn btn-dark">View Details</a>
            </div>
        </div>
    `).join('');
    // Observe the new room cards for animation
    document.querySelectorAll('.room-card').forEach(card => {
        observer.observe(card);
    });
    // Observe the new images for lazy loading
    document.querySelectorAll('.room-card img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Room Slider Functionality
function initRoomSlider() {
    const slider = document.getElementById('roomsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Calculate how many cards are visible based on screen size
    function getVisibleCards() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Calculate the max index based on visible cards
    function getMaxIndex() {
        return Math.max(0, roomData.length - getVisibleCards());
    }

    // Create slider dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const maxIndex = getMaxIndex();
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update slider position
    function setSliderPosition() {
        const cardWidth = slider.querySelector('.room-card').offsetWidth + 32; // card width + gap
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateButtons();
        updateDots();
    }

    // Update button states
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    // Update active dot
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        setSliderPosition();
    }

    // Next slide
    function nextSlide() {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            setSliderPosition();
        }
    }

    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            setSliderPosition();
        }
    }

    // Touch and mouse events for dragging
    function touchStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        slider.style.cursor = 'grabbing';
        slider.style.transition = 'none';
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        slider.style.cursor = 'grab';
        const movedBy = currentTranslate - prevTranslate;
        const cardWidth = slider.querySelector('.room-card').offsetWidth + 32;
        // If moved enough, change slide
        if (movedBy < -cardWidth / 4 && currentIndex < getMaxIndex()) {
            currentIndex++;
        } else if (movedBy > cardWidth / 4 && currentIndex > 0) {
            currentIndex--;
        }
        setSliderPosition();
        slider.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        currentTranslate = -currentIndex * cardWidth;
        prevTranslate = currentTranslate;
    }

    function getPositionX(e) {
    if (e.type.includes('mouse')) {
        return e.pageX;
    } else if (e.touches && e.touches.length > 0) {
        return e.touches[0].clientX;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
        return e.changedTouches[0].clientX;
    } else {
        return 0; // fallback to avoid crash
    }
}

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    // Mouse events
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', touchEnd);
    // Touch events
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);
    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        setSliderPosition();
        createDots();
    });

    // Initialize
    createDots();
    setSliderPosition();
    // Make cards focusable for keyboard navigation
    document.querySelectorAll('.room-card').forEach(card => {
        card.setAttribute('tabindex', '0');
    });
}

// Tour Slider Functionality
function initTourSlider() {
    const slider = document.getElementById('toursSlider');
    const prevBtn = document.getElementById('prevTourBtn');
    const nextBtn = document.getElementById('nextTourBtn');
    const dotsContainer = document.getElementById('tourSliderDots');
    
    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;
    
    let currentTourIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let startTime = 0;
    
    const tourCount = document.querySelectorAll('.explorer-container').length;
    
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < tourCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('tour-slider-dot');
            if (i === currentTourIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToTour(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function setSliderPosition(animate = true) {
        const sliderWidth = slider.parentElement.offsetWidth;
        const offset = -currentTourIndex * sliderWidth;
        
        slider.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        slider.style.transform = `translateX(${offset}px)`;
        updateButtons();
        updateDots();
    }
    
    function updateButtons() {
        prevBtn.disabled = currentTourIndex === 0;
        nextBtn.disabled = currentTourIndex >= tourCount - 1;
        prevBtn.style.opacity = currentTourIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentTourIndex >= tourCount - 1 ? '0.5' : '1';
    }
    
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.tour-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTourIndex);
        });
    }
    
    function goToTour(index) {
        if (index < 0 || index >= tourCount) return;
        currentTourIndex = index;
        setSliderPosition(true);
    }
    
    function nextTour() {
        if (currentTourIndex < tourCount - 1) {
            currentTourIndex++;
            setSliderPosition(true);
        }
    }
    
    function prevTour() {
        if (currentTourIndex > 0) {
            currentTourIndex--;
            setSliderPosition(true);
        }
    }
    
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    function touchStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        startTime = Date.now();
        slider.style.cursor = 'grabbing';
        slider.style.transition = 'none';
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        const sliderWidth = slider.parentElement.offsetWidth;
        let translate = -currentTourIndex * sliderWidth + diff;
        
        if (currentTourIndex === 0 && diff > 0) {
            translate = -currentTourIndex * sliderWidth + diff * 0.3;
        } else if (currentTourIndex === tourCount - 1 && diff < 0) {
            translate = -currentTourIndex * sliderWidth + diff * 0.3;
        }
        
        slider.style.transform = `translateX(${translate}px)`;
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = 'grab';
        
        const currentPosition = getPositionX(event);
        const movedBy = currentPosition - startPos;
        const sliderWidth = slider.parentElement.offsetWidth;
        const threshold = sliderWidth * 0.2;
        
        if (Math.abs(movedBy) > threshold) {
            if (movedBy < 0 && currentTourIndex < tourCount - 1) {
                currentTourIndex++;
            } else if (movedBy > 0 && currentTourIndex > 0) {
                currentTourIndex--;
            }
        }
        
        setSliderPosition(true);
    }
    
    prevBtn.addEventListener('click', prevTour);
    nextBtn.addEventListener('click', nextTour);
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });
    slider.addEventListener('touchstart', touchStart, { passive: true });
    slider.addEventListener('touchmove', touchMove, { passive: true });
    slider.addEventListener('touchend', touchEnd);
    
    window.addEventListener('resize', () => {
        setTimeout(() => {
            setSliderPosition(false);
            createDots();
        }, 100);
    });
    
    createDots();
    setSliderPosition(false);
}

// Island explorer interaction
const islands = document.querySelectorAll('.island');
const islandInfo = document.querySelector('.island-info');

// Sample island data
const islandData = {
    // Tour A destinations
    'big-lagoon': {
        name: 'Big Lagoon',
        description: 'Enter a majestic lagoon surrounded by towering limestone cliffs. The calm, turquoise waters are perfect for kayaking and swimming.',
        features: ['Kayaking', 'Swimming', 'Photography'],
        bestTime: 'Morning (9 AM - 12 PM)',
        tourRoute: 'Tour A'
    },
    'small-lagoon': {
        name: 'Small Lagoon',
        description: 'Navigate through a narrow opening to discover this hidden gem. The serene waters and dramatic rock formations create a magical atmosphere.',
        features: ['Snorkeling', 'Kayaking', 'Privacy'],
        bestTime: 'Afternoon (1 PM - 4 PM)',
        tourRoute: 'Tour A'
    },
    'secret-lagoon': {
        name: 'Secret Lagoon',
        description: 'Find your way through a small crevice in the limestone cliffs to access this secluded lagoon, a true hidden paradise.',
        features: ['Secluded', 'Swimming', 'Exploration'],
        bestTime: 'Midday (11 AM - 2 PM)',
        tourRoute: 'Tour A'
    },
    'shimizu-island': {
        name: 'Shimizu Island',
        description: 'Renowned for its vibrant coral gardens and diverse marine life, perfect for snorkeling enthusiasts.',
        features: ['Snorkeling', 'Marine Life', 'Coral Gardens'],
        bestTime: 'Morning (9 AM - 12 PM)',
        tourRoute: 'Tour A'
    },
    'seven-commando': {
        name: 'Seven Commando Beach',
        description: 'Relax on this pristine white sand beach with crystal clear waters, perfect for swimming and sunbathing.',
        features: ['Beach Relaxation', 'Swimming', 'Sunbathing'],
        bestTime: 'Afternoon (2 PM - 5 PM)',
        tourRoute: 'Tour A'
    },
    // Tour B destinations
    'snake-island': {
        name: 'Snake Island',
        description: 'A long sandbar connecting two islands, creating a unique natural phenomenon perfect for walking and photography during low tide.',
        features: ['Sandbar', 'Walking', 'Photography'],
        bestTime: 'Low tide',
        tourRoute: 'Tour B'
    },
    'pinagbuyutan': {
        name: 'Pinagbuyutan Island',
        description: 'Postcard-perfect limestone island with powdery white sand beaches and crystal clear waters.',
        features: ['Limestone Formations', 'White Sand', 'Photography'],
        bestTime: 'Morning to Afternoon',
        tourRoute: 'Tour B'
    },
    'cudugnon-cave': {
        name: 'Cudugnon Cave',
        description: 'Small cave used by locals during the war; offers historical significance and scenic views.',
        features: ['Historical', 'Cave Exploration', 'Scenic'],
        bestTime: 'Daytime',
        tourRoute: 'Tour B'
    },
    'cathedral-cave': {
        name: 'Cathedral Cave',
        description: 'Accessible by boat; known for its tall cathedral-like rock interior with impressive acoustics.',
        features: ['Cathedral-like', 'Boat Access', 'Impressive Interior'],
        bestTime: 'Morning',
        tourRoute: 'Tour B'
    },
    'entalula-beach': {
        name: 'Entalula Beach',
        description: 'Beautiful beach for swimming and relaxing with pristine white sand and turquoise waters.',
        features: ['Swimming', 'Relaxing', 'White Sand'],
        bestTime: 'All Day',
        tourRoute: 'Tour B'
    },
    // Tour C destinations
    'helicopter-island': {
        name: 'Helicopter Island',
        description: 'Shaped like a helicopter, this island offers excellent snorkeling opportunities with vibrant coral reefs and diverse marine life.',
        features: ['Snorkeling', 'Unique Shape', 'Marine Life'],
        bestTime: 'Morning to Afternoon',
        tourRoute: 'Tour C'
    },
    'matinloc-shrine': {
        name: 'Matinloc Shrine',
        description: 'Historical site with viewpoints and old structures offering panoramic views of the surrounding islands.',
        features: ['Historical', 'Viewpoints', 'Structures'],
        bestTime: 'Morning',
        tourRoute: 'Tour C'
    },
    'secret-beach': {
        name: 'Secret Beach',
        description: 'Accessible through a small opening in the rock; one of El Nido\'s highlights with hidden beauty.',
        features: ['Hidden', 'Secluded', 'Swimming'],
        bestTime: 'Low to Mid Tide',
        tourRoute: 'Tour C'
    },
    'hidden-beach': {
        name: 'Hidden Beach',
        description: 'Enclosed by cliffs, this beach offers calm and stunning waters perfect for swimming.',
        features: ['Cliff-enclosed', 'Calm Waters', 'Stunning'],
        bestTime: 'All Day',
        tourRoute: 'Tour C'
    },
    'star-beach': {
        name: 'Star Beach',
        description: 'Good for lunch and snorkeling with abundant marine life and comfortable facilities.',
        features: ['Lunch Spot', 'Snorkeling', 'Facilities'],
        bestTime: 'Lunch Time',
        tourRoute: 'Tour C'
    },
    // Tour D destinations
    'small-lagoon': {
        name: 'Small Lagoon',
        description: 'Perfect for kayaking and swimming in calm turquoise water, surrounded by majestic limestone cliffs.',
        features: ['Kayaking', 'Swimming', 'Calm Waters'],
        bestTime: 'Morning (9 AM - 12 PM)',
        tourRoute: 'Tour D'
    },
    'cadlao-lagoon': {
        name: 'Cadlao Lagoon',
        description: 'Surrounded by cliffs; peaceful and photogenic location perfect for relaxation.',
        features: ['Peaceful', 'Photogenic', 'Cliff-surrounded'],
        bestTime: 'Morning',
        tourRoute: 'Tour D'
    },
    'paradise-beach': {
        name: 'Paradise Beach',
        description: 'Secluded beach great for swimming and enjoying the pristine natural surroundings.',
        features: ['Secluded', 'Swimming', 'Pristine'],
        bestTime: 'All Day',
        tourRoute: 'Tour D'
    },
    'pasandigan-beach': {
        name: 'Pasandigan Beach',
        description: 'Quiet and scenic picnic spot perfect for enjoying a meal surrounded by natural beauty.',
        features: ['Quiet', 'Scenic', 'Picnic Spot'],
        bestTime: 'Lunch Time',
        tourRoute: 'Tour D'
    },
    'natnat-beach': {
        name: 'Natnat Beach',
        description: 'White sand and clear waters make this beach perfect for swimming and sunbathing.',
        features: ['White Sand', 'Clear Waters', 'Swimming'],
        bestTime: 'All Day',
        tourRoute: 'Tour D'
    }
};

// Set initial island
let activeIsland = 'big-lagoon';
function updateIslandInfo(islandId) {
    const data = islandData[islandId];
    if (data && islandInfo) {
        islandInfo.innerHTML = `
            <h4>${data.name}</h4>
            <div class="island-description">
                <p>${data.description}</p>
            </div>
            <div class="island-features">
                ${data.features.map(feature => `<div class="island-feature">${feature}</div>`).join('')}
            </div>
            <p><strong>Best Time to Visit:</strong> ${data.bestTime}</p>
            <p><strong>Tour Route:</strong> ${data.tourRoute}</p>
            <a href="#" class="btn btn-dark">Learn More</a>
        `;
        // Update active island
        islands.forEach(island => {
            if (island.getAttribute('data-island') === islandId) {
                island.classList.add('active');
            } else {
                island.classList.remove('active');
            }
        });
    }
}

islands.forEach(island => {
    island.addEventListener('click', function() {
        const islandId = this.getAttribute('data-island');
        activeIsland = islandId;
        updateIslandInfo(islandId);
    });
    island.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const islandId = this.getAttribute('data-island');
            activeIsland = islandId;
            updateIslandInfo(islandId);
        }
    });
    // Enhanced island interactions for mobile
    let touchTimer;
    island.addEventListener('touchstart', function() {
        touchTimer = setTimeout(() => {
            // Long press effect
            this.style.transform = 'scale(2)';
        }, 500);
    });
    island.addEventListener('touchend', function() {
        clearTimeout(touchTimer);
        this.style.transform = '';
    });
    island.addEventListener('touchmove', function() {
        clearTimeout(touchTimer);
    });
});

// Initialize with first island
updateIslandInfo(activeIsland);

// Contact form validation
const contactForm = document.getElementById('contactForm');
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
    // Enhanced form interactions for mobile
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    if (field.id === 'email' && value && !isValidEmail(value)) {
        showError(field, 'Please enter a valid email address');
    } else if (field.required && !value) {
        showError(field, 'This field is required');
    } else {
        clearError(field);
    }
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
        validateField({target: input});
        if (input.classList.contains('error')) {
            isValid = false;
        }
    });
    if (!isValid) return;
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // In a real implementation, you would send this data to a server
    // For now, we'll just show an alert
    alert(`Thank you for your message, ${name}! We'll get back to you soon at ${email}.`);
    // Reset the form
    contactForm.reset();
});

// Testimonial slider functionality
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;

// Sample testimonial data
const testimonialData = [
    {
        content: "I recently had the pleasure of visiting the beautiful El Nido, Palawan again—this time with my whole family—and I couldn't be happier with the Juls Inn/LJC El Nido Inn and the tour package I chose. From the moment we arrived, everything was well-organized, relaxing, and full of breathtaking moments. They even let us cook for free! Most especially, Ms. Aiza was very hands-on. Thank you, Ms. Aiza and the staff of LJC—you were all super accommodating!",
        name: "Angel Viejo and Fam",
        from: "",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        content: "I had enormous stay in LJC El Nido Inn. The staffs were friendly, approachable and attentive. The rooms were tidy and comfortable. I would certainly recommend staying here.",
        name: "Elizalde Es",
        from: "Teachers of Maco Davao De Oro",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        content: "Hello ma'am, good evening. Naka uli na mi Pantukan po, karon rajud ko naka message kay nabusy pud pag abot diri hehe. Thank you kaayo ma'am sa pag accomodate sa amoa and pag tubag sa tanan mga queries namo hehe. Nag enjoy jud kaayo mi and happy kaayo si daddy sa iyang birthday po. Thank you kay smooth ra kaayo among vacation from pick up sa airport to accomodation namo to the tours po. Would definitely recommend you sa mga kaila namo and if mabalik mi kay icontact ra ka namo dayon hehe. Thank you kaayo usab po. 🤎✨",
        name: "Caballero Family",
        from: "Pantukan, Davao De Oro",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
];

function showTestimonial(index) {
    const testimonialCard = document.querySelector('.testimonial-card');
    const data = testimonialData[index];
    testimonialCard.innerHTML = `
        <div class="testimonial-content">
            "${data.content}"
        </div>
        <div class="testimonial-author">
            <div class="author-avatar">
                <img data-src="${data.avatar}" alt="${data.name}" loading="lazy" class="image-loading">
            </div>
            <div class="author-info">
                <h4>${data.name}</h4>
                <p>${data.from}</p>
            </div>
        </div>
    `;
    // Observe the new image for lazy loading
    const newImg = testimonialCard.querySelector('img[data-src]');
    if (newImg) {
        imageObserver.observe(newImg);
    }
    // Update active dot
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialData.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Scroll animation using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // ✅ Prevent infinite triggering
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.section-header, .room-card, .amenities-section, .amenity-item, .explorer-container, .activity-card, .dining-section, .dish-card, .sustainable-card, .contact-section, .contact-detail, .social-link, .form-group, .testimonial-card, section').forEach(el => {
    observer.observe(el);
});

// Enhanced Touch Interactions for Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .room-card, .activity-card, .amenity-item, .dish-card, .social-link');
    touchElements.forEach(el => {
        el.classList.add('touch-feedback');
        // Prevent context menu on long press
        el.addEventListener('contextmenu', (e) => e.preventDefault());
    });

    // Enhanced testimonial slider for touch devices
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let isScrolling;
        testimonialSlider.addEventListener('scroll', function() {
            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {
                // Snap to closest testimonial
                const scrollLeft = testimonialSlider.scrollLeft;
                const cardWidth = testimonialSlider.querySelector('.testimonial-card').offsetWidth + 20;
                const activeIndex = Math.round(scrollLeft / cardWidth);
                testimonialSlider.scrollTo({
                    left: activeIndex * cardWidth,
                    behavior: 'smooth'
                });
                // Update dots
                testimonialDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === activeIndex);
                });
            }, 66);
        });
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Language selector functionality
const languageSelector = document.getElementById('language');
languageSelector.addEventListener('change', function() {
    // In a real implementation, this would change the site language
    alert(`Language changed to ${this.options[this.selectedIndex].text}. In a real implementation, this would translate the entire site.`);
});

// Performance improvements for mobile
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
        // Disable or simplify animations
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }
}
// ---- FIX: Prevent Contact Us section from jittering or moving on its own ----
window.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.style.position = 'relative';
        contactSection.style.overflow = 'hidden';
        contactSection.style.willChange = 'auto';
    }
});

// === HERO PARALLAX ON SCROLL ===
window.addEventListener("scroll", () => {
  const bg = document.querySelector(".hero-bg");
  if (!bg || window.innerWidth <= 768) return;

  const scrollY = window.scrollY;
  const parallax = scrollY * 0.3; // scroll intensity
  bg.style.transform = `translateY(${parallax}px) scale(1.1)`; // zoom + scroll motion
});

// === UNIVERSAL SMART HIDE-ON-SCROLL NAVBAR ===
(() => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Detect scroll container
  let scrollContainer = window;
  const possible = document.querySelector("main, .main, .page, .wrapper, .content");
  if (possible && possible.scrollHeight > window.innerHeight) {
    scrollContainer = possible;
  }

  let lastScroll = 0;
  let isHidden = false;

  const handleScroll = () => {
    const currentScroll =
      scrollContainer === window
        ? window.scrollY || document.documentElement.scrollTop
        : scrollContainer.scrollTop;

    // Always show near the top
    if (currentScroll < 120) {
      navbar.classList.remove("hidden");
      isHidden = false;
      lastScroll = currentScroll;
      return;
    }

    if (currentScroll > lastScroll && !isHidden) {
      // Scrolling down → hide
      navbar.classList.add("hidden");
      isHidden = true;
    } else if (currentScroll < lastScroll && isHidden) {
      // Scrolling up → show
      navbar.classList.remove("hidden");
      isHidden = false;
    }

    lastScroll = currentScroll;
  };

  scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
})();





