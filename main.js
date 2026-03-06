// Main JavaScript for Asif Communication

document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('#mobileMenu');
    const navLinks = document.querySelector('#navLinks');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Navbar Scrolled Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });

    // Form Handling (Visual Only)
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Message Sent!';
            btn.style.background = '#10b981';
            btn.style.color = '#fff';

            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Review Modal Logic
    const reviewModal = document.querySelector('#reviewModal');
    const openReviewBtn = document.querySelector('#openReviewBtn');
    const closeModal = document.querySelector('.close-modal');
    const reviewForm = document.querySelector('#reviewForm');
    const starInput = document.querySelectorAll('.star-rating-input i');
    const starValue = document.querySelector('#starValue');
    const testimonialGrid = document.querySelector('#testimonialGrid');

    // Open Modal
    if (openReviewBtn) {
        openReviewBtn.addEventListener('click', () => {
            reviewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Modal
    const closeReviewModal = () => {
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';
        if (reviewForm) reviewForm.reset();
        resetStars();
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeReviewModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === reviewModal) closeReviewModal();
    });

    // Star Rating Interactivity
    starInput.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            starValue.value = value;
            updateStars(value);
        });

        star.addEventListener('mouseover', () => {
            updateStars(star.getAttribute('data-value'));
        });

        star.addEventListener('mouseout', () => {
            updateStars(starValue.value);
        });
    });

    function updateStars(value) {
        starInput.forEach(s => {
            if (s.getAttribute('data-value') <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }

    function resetStars() {
        if (starValue) starValue.value = '5';
        updateStars(5);
    }

    // Load Saved Reviews
    const loadReviews = () => {
        const savedReviews = JSON.parse(localStorage.getItem('asif_reviews') || '[]');
        savedReviews.forEach(review => addReviewToUI(review, false));
    };

    function addReviewToUI(review, animate = true) {
        const card = document.createElement('div');
        card.className = `testimonial-card ${animate ? 'reveal-up active' : 'reveal-up'}`;

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="fa${i <= review.stars ? 's' : 'r'} fa-star"></i> `;
        }

        card.innerHTML = `
            <div class="stars">${starsHtml}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="user-info">
                <img src="https://i.pravatar.cc/150?u=${review.name.length}" alt="Customer">
                <div>
                    <h4>${review.name}</h4>
                    <span>${review.role}</span>
                </div>
            </div>
        `;

        if (testimonialGrid) testimonialGrid.prepend(card);
        // Observe if newly added or on load
        if (typeof observer !== 'undefined') observer.observe(card);
    }

    // Handle Review Form Submit
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newReview = {
                name: document.querySelector('#reviewerName').value,
                role: document.querySelector('#reviewerRole').value,
                stars: parseInt(starValue.value),
                text: document.querySelector('#reviewContent').value,
                date: new Date().toISOString()
            };

            const savedReviews = JSON.parse(localStorage.getItem('asif_reviews') || '[]');
            savedReviews.push(newReview);
            localStorage.setItem('asif_reviews', JSON.stringify(savedReviews));

            addReviewToUI(newReview);
            closeReviewModal();
        });
    }

    // Blog Reading Logic
    const blogModal = document.querySelector('#blogModal');
    const blogFullContent = document.querySelector('#blogFullContent');
    const closeBlogModalBtn = document.querySelector('.close-blog-modal');

    const blogsData = [
        {
            title: "5 Tips to Increase Your Battery Life",
            date: "Mar 04, 2026",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
            content: `
                <p>Smartphone batteries are lithium-ion based, meaning they have a limited number of charge cycles. However, with the right habits, you can extend their lifespan significantly.</p>
                <p><strong>1. Avoid Extreme Percentages:</strong> Keeping your battery between 20% and 80% is the "sweet spot" for long-term health. Constant 100% charging or letting it drop to 0% stresses the cells.</p>
                <p><strong>2. Manage Screen Brightness:</strong> Your display is the biggest battery killer. Use 'Auto-Brightness' or set it to lower levels manually when indoors.</p>
                <p><strong>3. Use Dark Mode:</strong> If your phone has an AMOLED screen, dark mode saves massive energy because black pixels are completely turned off.</p>
            `
        },
        {
            title: "Secure Your EasyPaisa & JazzCash",
            date: "Mar 01, 2026",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
            content: `
                <p>Digital banking is convenient, but it requires vigilance. Your financial security is our priority at Asif Communication.</p>
                <p><strong>Never Share OTP:</strong> No official from EasyPaisa or JazzCash will ever ask for your PIN or OTP. If someone asks, it's a scam.</p>
                <p><strong>Biometric Security:</strong> Always enable fingerprint or face unlock for your banking apps. It's much harder to bypass than a simple 4-digit PIN.</p>
                <p><strong>Public Wi-Fi Warning:</strong> Never perform transactions while connected to public Wi-Fi in parks or malls. Hackers can monitor your traffic on unsecured networks.</p>
            `
        },
        {
            title: "Why Original Chargers Matter",
            date: "Feb 25, 2026",
            image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800",
            content: `
                <p>It might be tempting to buy a cheap 200-rupee charger from the street, but it could cost you a 50,000-rupee phone.</p>
                <p><strong>Voltage Regulation:</strong> Original chargers have sophisticated chips that regulate voltage. Cheap chargers often send irregular bursts of electricity that fry the internal motherboard.</p>
                <p><strong>Heat Management:</strong> Fake chargers get extremely hot, which can lead to battery swelling or, in extreme cases, explosions.</p>
                <p><strong>Charging Speed:</strong> Only original or certified high-quality chargers support the true 'Fast Charging' standards of your phone. Cheap ones take triple the time.</p>
            `
        }
    ];

    document.querySelectorAll('.blog .read-more').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const blog = blogsData[index];
            blogFullContent.innerHTML = `
                <img src="${blog.image}" class="blog-full-img">
                <div class="blog-full-body">
                    <div class="blog-meta-full">
                        <span><i class="far fa-calendar-alt"></i> ${blog.date}</span>
                        <span><i class="far fa-user"></i> By Asif</span>
                    </div>
                    <h2>${blog.title}</h2>
                    <div class="blog-text-full">
                        ${blog.content}
                    </div>
                </div>
            `;
            blogModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeBlogModalBtn) {
        closeBlogModalBtn.addEventListener('click', () => {
            blogModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Accessories Detail Logic
    const accModal = document.querySelector('#accModal');
    const accFullContent = document.querySelector('#accFullContent');
    const closeAccModalBtn = document.querySelector('.close-acc-modal');

    const accessoriesData = [
        {
            title: "Premium Sleek Cases",
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
            description: "High-grade military protection combined with ultra-slim design.",
            details: `
                <p><strong>Shockproof Tech:</strong> Reinforced corners to withstand drops from up to 10 feet.</p>
                <p><strong>Material:</strong> Premium TPU and Polycarbonate blend that prevents yellowing over time.</p>
                <p><strong>Wireless Ready:</strong> Fully compatible with MagSafe and all Qi wireless chargers.</p>
            `
        },
        {
            title: "Flash Power Chargers",
            image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800",
            description: "Next-gen GaN technology for cooler, faster charging in a smaller size.",
            details: `
                <p><strong>Rapid Charge:</strong> Support for 65W PD (Power Delivery) and PPS for Samsung/iPhone.</p>
                <p><strong>Multi-Port:</strong> Charge your laptop, tablet, and phone simultaneously with zero power drops.</p>
                <p><strong>Safe Guard:</strong> Built-in IC protection against overvoltage, overheating, and short circuits.</p>
            `
        },
        {
            title: "Crystal Audio Gear",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            description: "Experience music as the artist intended with our premium audio collection.",
            details: `
                <p><strong>Hi-Res Sound:</strong> 40mm drivers delivering deep bass and crystal clear trebles.</p>
                <p><strong>Active Noise Cancellation:</strong> Block up to 90% of ambient city noise for perfect focus.</p>
                <p><strong>Battery Life:</strong> Up to 40 hours of continuous playtime with just a single 2-hour charge.</p>
            `
        },
        {
            title: "Next-Gen Tech Gadgets",
            image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800",
            description: "Cutting edge smartwatches and wearable technology for your digital lifestyle.",
            details: `
                <p><strong>Health Tracking:</strong> Precision 24/7 heart rate, SpO2 (Blood Oxygen), and sleep monitoring.</p>
                <p><strong>IP68 Waterproof:</strong> Safe for swimming, showering, and dust protection.</p>
                <p><strong>OLED Display:</strong> Vibrant, always-on display with hundreds of customizable watch faces.</p>
            `
        }
    ];

    document.querySelectorAll('.acc-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const data = accessoriesData[index];
            accFullContent.innerHTML = `
                <img src="${data.image}" class="blog-full-img">
                <div class="blog-full-body">
                    <div class="section-tag" style="margin-bottom: 10px;">Authentic Accessory</div>
                    <h2>${data.title}</h2>
                    <p style="color: var(--accent); margin-bottom: 20px; font-weight: 600;">${data.description}</p>
                    <div class="blog-text-full">
                        ${data.details}
                    </div>
                    <a href="https://wa.me/923003100785" class="btn btn-main" style="margin-top: 30px; display: block; text-align: center;">
                        <i class="fab fa-whatsapp"></i> Buy via WhatsApp
                    </a>
                </div>
            `;
            accModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeAccModalBtn) {
        closeAccModalBtn.addEventListener('click', () => {
            accModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === accModal) {
            accModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    loadReviews();
    resetStars();
});
