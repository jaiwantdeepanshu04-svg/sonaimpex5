/**
 * SONA IMPEX - UNIFIED MASTER APPLICATION CONTROLLER
 * Optimized Global Architecture Supporting Multi-Page Lifecycles Seamlessly
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. GLOBAL SYSTEM DESK: MOBILE MENU TOGGLE NAVIGATION
       ========================================================================== */
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const primaryNav = document.querySelector(".nav-menu");

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isMenuOpen = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", !isMenuOpen);
            primaryNav.classList.toggle("menu-open");
            
            const toggleIcon = navToggle.querySelector("i");
            if (toggleIcon) {
                toggleIcon.classList.toggle("fa-bars");
                toggleIcon.classList.toggle("fa-xmark");
            }
        });
    }

    /* ==========================================================================
       2. HOME PAGE CONTROLLERS (Wrapped in Safety Checks)
       ========================================================================== */
    
    // Feature A: Subtle Background Parallax Scroll
    const parallaxBg = document.querySelector(".parallax-bg-layer");
    if (parallaxBg) {
        window.addEventListener("scroll", () => {
            let offsetHeight = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${offsetHeight * 0.35}px)`;
        });
    }

    // Feature B: Auto Counting-Up Numbers Dashboard
    const metricsContainers = document.querySelectorAll(".counter-metric");
    const metricsSectionElement = document.querySelector(".counters-section");
    
    if (metricsContainers.length > 0 && metricsSectionElement) {
        const triggerMetricsCountAnimation = () => {
            metricsContainers.forEach(metric => {
                const executeCountLoop = () => {
                    const absoluteTargetValue = +metric.getAttribute("data-target");
                    const currentDisplayedValue = +metric.innerText;
                    const progressiveIncrementStep = Math.ceil(absoluteTargetValue / 60);

                    if (currentDisplayedValue < absoluteTargetValue) {
                        metric.innerText = currentDisplayedValue + progressiveIncrementStep;
                        setTimeout(executeCountLoop, 25);
                    } else {
                        metric.innerText = absoluteTargetValue;
                    }
                };
                executeCountLoop();
            });
        };

        const metricsObserver = new IntersectionObserver((observedEntries) => {
            observedEntries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerMetricsCountAnimation();
                    metricsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        metricsObserver.observe(metricsSectionElement);
    }

    // Feature C: 3D Micro-Spatial Interactive Hover Effect (Tilt Cards) - Only on Desktop
    const interactiveTiltCards = document.querySelectorAll("[data-tilt]");
    if (interactiveTiltCards.length > 0 && window.innerWidth > 768) { 
        interactiveTiltCards.forEach(cardElement => {
            cardElement.addEventListener("mousemove", (mouseEvent) => {
                const outerBoundingRect = cardElement.getBoundingClientRect();
                const computedXCoordinate = mouseEvent.clientX - outerBoundingRect.left;
                const computedYCoordinate = mouseEvent.clientY - outerBoundingRect.top;

                const degreeRotationX = ((outerBoundingRect.height / 2) - computedYCoordinate) / 10;
                const degreeRotationY = (computedXCoordinate - (outerBoundingRect.width / 2)) / 10;

                cardElement.style.transform = `rotateX(${degreeRotationX}deg) rotateY(${degreeRotationY}deg)`;
            });

            cardElement.addEventListener("mouseleave", () => {
                cardElement.style.transform = "rotateX(0deg) rotateY(0deg)";
            });
        });
    }

    // Feature D: Infinite Testimonial Carousel Viewport Track Slider
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(document.querySelectorAll(".testimonial-card"));
    const prevButton = document.querySelector(".nav-arrow-btn.prev");
    const nextButton = document.querySelector(".nav-arrow-btn.next");
    const paginationContainer = document.querySelector(".carousel-pagination-dots");
    
    if (track && slides.length > 0) {
        let currentSlideIndex = 0;

        if (paginationContainer) {
            slides.forEach((_, index) => {
                const paginationDotButton = document.createElement("button");
                paginationDotButton.classList.add("dot");
                if (index === 0) paginationDotButton.classList.add("dot-active");
                paginationContainer.appendChild(paginationDotButton);
            });
        }

        const dotIndicators = paginationContainer ? Array.from(paginationContainer.querySelectorAll(".dot")) : [];

        const switchActiveSlideFrame = (targetIndex) => {
            track.style.transform = `translateX(-${targetIndex * 100}%)`;
            slides.forEach((slide, idx) => slide.classList.toggle("slide-active", idx === targetIndex));
            if (dotIndicators.length > 0) {
                dotIndicators.forEach((dot, idx) => dot.classList.toggle("dot-active", idx === targetIndex));
            }
            currentSlideIndex = targetIndex;
        };

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                let nextTargetIndex = currentSlideIndex + 1;
                if (nextTargetIndex >= slides.length) nextTargetIndex = 0;
                switchActiveSlideFrame(nextTargetIndex);
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                let prevTargetIndex = currentSlideIndex - 1;
                if (prevTargetIndex < 0) prevTargetIndex = slides.length - 1;
                switchActiveSlideFrame(prevTargetIndex);
            });
        }

        if (dotIndicators.length > 0) {
            dotIndicators.forEach((dot, index) => {
                dot.addEventListener("click", () => switchActiveSlideFrame(index));
            });
        }

        let automaticCarouselTimer = setInterval(() => { if(nextButton) nextButton.click(); }, 7000);
        const coreViewportContainer = document.querySelector(".carousel-viewport");
        if (coreViewportContainer) {
            coreViewportContainer.addEventListener("mouseenter", () => clearInterval(automaticCarouselTimer));
            coreViewportContainer.addEventListener("mouseleave", () => {
                automaticCarouselTimer = setInterval(() => { if(nextButton) nextButton.click(); }, 7000);
            });
        }
    }

    /* ==========================================================================
       3. CONTACT PAGE CONTROLLERS (Enhanced Form Engine Integrations)
       ========================================================================== */
    const industrialForm = document.getElementById("industrialContactForm");
    const successBanner = document.getElementById("formSuccess");

    if (industrialForm) {
        industrialForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            // Clear existing errors and success state
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            if (successBanner) successBanner.style.display = "none";
            
            let isFormValid = true;

            const nameInput = document.getElementById("fullName");
            const emailInput = document.getElementById("emailAddress");
            const phoneInput = document.getElementById("phoneNumber");
            const typeSelect = document.getElementById("inquiryType");
            const messageInput = document.getElementById("userMessage");

            // 1. Full Name Validation
            if (nameInput) { 
                if (nameInput.value.trim() === "") { 
                    showError(nameInput, "nameError"); 
                    isFormValid = false; 
                } else { 
                    clearError(nameInput); 
                } 
            }
            
            // 2. Email Address Validation
            if (emailInput) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(String(emailInput.value).toLowerCase())) { 
                    showError(emailInput, "emailError"); 
                    isFormValid = false; 
                } else { 
                    clearError(emailInput); 
                }
            }
            
            // 3. Phone Number Validation
            if (phoneInput) { 
                if (phoneInput.value.trim() === "") { 
                    showError(phoneInput, "phoneError"); 
                    isFormValid = false; 
                } else { 
                    clearError(phoneInput); 
                } 
            }
            
            // 4. Inquiry Type Selection Validation
            if (typeSelect) { 
                if (typeSelect.value === "") { 
                    showError(typeSelect, "typeError"); 
                    isFormValid = false; 
                } else { 
                    clearError(typeSelect); 
                } 
            }
            
            // 5. Specification Message Validation
            if (messageInput) { 
                if (messageInput.value.trim() === "") { 
                    showError(messageInput, "messageError"); 
                    isFormValid = false; 
                } else { 
                    clearError(messageInput); 
                } 
            }

            // SUCCESS RESPONSE INJECTION ENGINE
            if (isFormValid) {
                if (successBanner) {
                    successBanner.style.display = "block";
                    industrialForm.reset();
                    
                    // Smooth viewport alignment to show user the confirmation status
                    successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    setTimeout(() => { successBanner.style.display = "none"; }, 5000);
                }
            }
        });

        // Modular Error Toggling Interfaces mapping cleanly to contact.html span elements
        function showError(element, errorId) { 
            if(element.parentElement) element.parentElement.classList.add("invalid"); 
            const errorSpan = document.getElementById(errorId);
            if(errorSpan) errorSpan.style.display = "block";
        }
        function clearError(element) { 
            if(element.parentElement) element.parentElement.classList.remove("invalid"); 
        }
    }

    /* ==========================================================================
       4. 3D HERO ANIMATION ENGINE (Three.js with Mobile Fallback Optimization)
       ========================================================================== */
    const heroCanvas = document.getElementById("hero-3d-bg");
    if (heroCanvas && typeof THREE !== 'undefined') {
        const getCanvasWidth = () => heroCanvas.clientWidth || window.innerWidth;
        const getCanvasHeight = () => heroCanvas.clientHeight || 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, getCanvasWidth() / getCanvasHeight(), 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(getCanvasWidth(), getCanvasHeight());
        heroCanvas.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const isMobileDevice = window.innerWidth < 768;
        const count = isMobileDevice ? 600 : 1500; 
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({ color: 0xD4A017, size: isMobileDevice ? 0.25 : 0.15 });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 30;

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            const width = getCanvasWidth();
            const height = getCanvasHeight();
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
    }

    /* ==========================================================================
       5. INNER PAGES 3D BANNER ENGINE (For Products, Industries & Contact Hero Canvas)
       ========================================================================== */
    const globalInnerCanvas = document.getElementById("three-canvas-global");
    if (globalInnerCanvas && typeof THREE !== 'undefined') {
        const getInnerWidth = () => globalInnerCanvas.clientWidth || window.innerWidth;
        const getInnerHeight = () => globalInnerCanvas.clientHeight || 300;

        const innerScene = new THREE.Scene();
        const innerCamera = new THREE.PerspectiveCamera(60, getInnerWidth() / getInnerHeight(), 0.1, 1000);
        innerCamera.position.z = 50;

        const innerRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        innerRenderer.setSize(getInnerWidth(), getInnerHeight());
        innerRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        globalInnerCanvas.appendChild(innerRenderer.domElement);

        const innerMobile = window.innerWidth < 768;
        const innerCount = innerMobile ? 45 : 90;
        const innerGeometry = new THREE.BufferGeometry();
        const innerPositions = new Float32Array(innerCount * 3);

        for (let i = 0; i < innerCount * 3; i++) {
            innerPositions[i] = (Math.random() - 0.5) * 100;
        }
        innerGeometry.setAttribute('position', new THREE.BufferAttribute(innerPositions, 3));

        const innerMaterial = new THREE.PointsMaterial({
            size: innerMobile ? 1.2 : 0.8,
            color: 0xD4A017, 
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const plexusPoints = new THREE.Points(innerGeometry, innerMaterial);
        innerScene.add(plexusPoints);

        function animateInnerCanvas() {
            requestAnimationFrame(animateInnerCanvas);
            plexusPoints.rotation.x += 0.0005;
            plexusPoints.rotation.y += 0.0005;
            innerRenderer.render(innerScene, innerCamera);
        }
        animateInnerCanvas();

        window.addEventListener('resize', () => {
            const w = getInnerWidth();
            const h = getInnerHeight();
            innerCamera.aspect = w / h;
            innerCamera.updateProjectionMatrix();
            innerRenderer.setSize(w, h);
        });
    }
});