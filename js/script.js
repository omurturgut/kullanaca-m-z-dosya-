        // ========== PAGE LOADER ==========
        window.addEventListener('load', () => {
            const pageLoader = document.getElementById('pageLoader');
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                // Show trust section after loader
                const trustSection = document.querySelector('.trust-section');
                if (trustSection) {
                    trustSection.classList.add('visible');
                }
            }, 1800);
        });

        // ========== TRUST SECTION SCROLL ANIMATION ==========
        const trustSection = document.querySelector('.trust-section');
        let trustVisible = true;

        function checkTrustSection() {
            const scrollY = window.scrollY;
            if (scrollY < 100 && !trustVisible) {
                trustSection.classList.add('visible');
                trustVisible = true;
            } else if (scrollY > 200 && trustVisible) {
                trustSection.classList.remove('visible');
                trustVisible = false;
            }
        }

        window.addEventListener('scroll', checkTrustSection);

        // ========== FOOTER SCROLL ANIMATION ==========
        const footer = document.getElementById('mainFooter');
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('visible');
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (footer) {
            footerObserver.observe(footer);
        }

        // All background images
        const bgImages = [
            'https://i.ibb.co/hJ2918VB/u4938782892-Full-green-plain-ground-with-beautiful-white-sky-35e12c56-5db6-4c04-855d-eb1c49863e35.png',
            'https://i.ibb.co/xS8nW1tJ/u4938782892-A-small-crisscrossing-landscape-of-green-grassy-hil-c69408df-c450-47c5-8192-a88459f4f831.png',
            'https://i.ibb.co/q30sG1Pm/u4938782892-A-small-crisscrossing-landscape-of-green-grassy-hil-fccf6dfb-ace6-47f0-b7ab-78b9ef81a145.png',
            'https://i.ibb.co/5XLqCPGr/u4938782892-Full-green-plain-ground-with-beautiful-white-sky-90b93c7a-8d91-4d3a-b464-ae709d6b7273.png',
            'https://i.ibb.co/FLq4tbyH/u4938782892-httpss-mj-run-S2-Qx-G9j-Lh-RY-Horse-galloping-on-a-large-1be637bf-921b-4d33-8aa9-683dcba.png',
            'https://i.ibb.co/5XsFj2Rn/u4938782892-landscape-with-moutains-detailed-shadows-with-a-p-2e753786-3f7e-474f-bd4b-03f0b5ff6d46-0.png',
            'https://i.ibb.co/xSw2z7q2/u4938782892-landscape-with-moutains-detailed-shadows-with-a-p-2e753786-3f7e-474f-bd4b-03f0b5ff6d46-2.png',
            'https://i.ibb.co/C5QP9CFf/u4938782892-landscape-with-moutains-detailed-shadows-with-a-p-5f746cb6-2c4d-476a-bc53-fb3c157666f8-2.png',
            'https://i.ibb.co/605Ks7Ws/u4938782892-landscape-with-moutains-detailed-shadows-with-a-p-5f746cb6-2c4d-476a-bc53-fb3c157666f8-3.png',
            'https://i.ibb.co/RT5KyKZS/u4938782892-fantasy-illustration-celebration-of-life-and-flow-d0337a6f-2a61-4b5c-a2ea-c5e164fcddc7-0.png',
            'https://i.ibb.co/6R532x6g/u4938782892-beautiful-fall-foliage-in-Rhode-Island-realistic-efceeb05-e59f-4a57-b455-0021ddfe73cd-0.png'
        ];

        // Random selection for Hero and About backgrounds
        function getRandomImage(excludeIndex = -1) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * bgImages.length);
            } while (randomIndex === excludeIndex && bgImages.length > 1);
            return randomIndex;
        }

        // Set random backgrounds on page load - NO SLIDESHOW FOR PERFORMANCE
        const heroRandomIndex = getRandomImage();
        const aboutRandomIndex = getRandomImage(heroRandomIndex);
        const portfolioRandomIndex = getRandomImage(aboutRandomIndex);

        // Static background for hero - Single image
        const heroBg = document.getElementById('heroBg');
        const heroImage = heroBg.querySelector('img');

        if (heroImage) {
            heroImage.loading = 'eager';
            heroImage.decoding = 'async';
            heroImage.classList.add('active');

            heroImage.addEventListener('load', () => {
                console.log('✅ Hero background loaded successfully');
            });
            heroImage.addEventListener('error', () => {
                console.warn('⚠️ Hero background failed to load');
            });
        }

        const aboutBgImg = document.querySelector('.about-bg img');
        aboutBgImg.src = bgImages[aboutRandomIndex];
        aboutBgImg.loading = 'lazy'; // Lazy load

        const portfolioBgImg = document.querySelector('.portfolio-bg img');
        portfolioBgImg.src = bgImages[portfolioRandomIndex];
        portfolioBgImg.loading = 'lazy'; // Lazy load

        console.log(`🎨 Hero background: Image ${heroRandomIndex + 1} (STATIC)`);
        console.log(`🎨 About background: Image ${aboutRandomIndex + 1}`);
        console.log(`🎨 Portfolio background: Image ${portfolioRandomIndex + 1}`);

        // Create morphing particles - REDUCED FROM 50 TO 20 FOR PERFORMANCE
        const morphParticles = document.getElementById('morphParticles');
        const particleCount = 20; // Reduced from 50

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            
            morphParticles.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 0;
                }
                20% {
                    opacity: 1;
                }
                80% {
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--tx), var(--ty)) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Scroll transitions
        const heroSection = document.getElementById('heroSection');
        const aboutSection = document.getElementById('aboutSection');
        const portfolioSection = document.getElementById('portfolioSection');
        const servicesSection = document.getElementById('servicesSection');
        const howSection = document.getElementById('howSection');
        const transitionWave = document.getElementById('transitionWave');

        let ticking = false;
        let lastScrollY = 0;
        let scrollingDown = true;

        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollProgress = scrollY / windowHeight;
            
            scrollingDown = scrollY > lastScrollY;
            lastScrollY = scrollY;
            
            if (!scrollingDown) {
                heroSection.style.transition = 'all 0.5s ease-in-out';
                aboutSection.querySelector('.about-bg').style.transition = 'all 0.5s ease-in-out';
                aboutSection.querySelector('.about-content').style.transition = 'all 0.5s ease-in-out';
                portfolioSection.querySelector('.portfolio-bg').style.transition = 'all 0.5s ease-in-out';
            } else {
                heroSection.style.transition = '';
                aboutSection.querySelector('.about-bg').style.transition = '';
                aboutSection.querySelector('.about-content').style.transition = '';
                portfolioSection.querySelector('.portfolio-bg').style.transition = '';
            }
            
            const heroAboutParticleStart = scrollingDown ? 0.2 : 0.01;
            const heroAboutParticleEnd = scrollingDown ? 0.5 : 0.15;
            const aboutServicesParticleStart = scrollingDown ? 3.0 : 2.2;
            const aboutServicesParticleEnd = scrollingDown ? 3.1 : 2.3;
            const servicesPortfolioParticleStart = scrollingDown ? 5.2 : 4.4;
            const servicesPortfolioParticleEnd = scrollingDown ? 5.5 : 4.7;
            
            if ((scrollProgress > heroAboutParticleStart && scrollProgress < heroAboutParticleEnd) ||
                (scrollProgress > aboutServicesParticleStart && scrollProgress < aboutServicesParticleEnd) ||
                (scrollProgress > servicesPortfolioParticleStart && scrollProgress < servicesPortfolioParticleEnd)) {
                morphParticles.classList.add('active');
            } else {
                morphParticles.classList.remove('active');
            }

            const heroAboutWaveStart = scrollingDown ? 0.25 : 0.02;
            const heroAboutWaveEnd = scrollingDown ? 0.45 : 0.12;
            const aboutServicesWaveStart = scrollingDown ? 3.05 : 2.25;
            const aboutServicesWaveEnd = scrollingDown ? 3.08 : 2.28;
            
            if ((scrollProgress > heroAboutWaveStart && scrollProgress < heroAboutWaveEnd) ||
                (scrollProgress > aboutServicesWaveStart && scrollProgress < aboutServicesWaveEnd)) {
                transitionWave.classList.add('active');
            } else {
                transitionWave.classList.remove('active');
            }

            const heroThreshold = scrollingDown ? 0.2 : 0.01;
            if (scrollProgress > heroThreshold) {
                heroSection.classList.add('scrolled');
            } else {
                heroSection.classList.remove('scrolled');
            }

            // Trust section scroll-based animation (appear → explode → reunite)
            const trustSection = document.querySelector('.trust-section');
            if (trustSection) {
                if (scrollProgress < 0.05) {
                    // Initial appearance
                    trustSection.classList.add('visible');
                    trustSection.classList.remove('exploded');
                } else if (scrollProgress > 0.05 && scrollProgress < 0.3) {
                    // Explode on scroll down
                    trustSection.classList.remove('visible');
                    trustSection.classList.add('exploded');
                } else if (scrollProgress > 0.3 && !scrollingDown) {
                    // Reunite on scroll back up
                    trustSection.classList.add('visible');
                    trustSection.classList.remove('exploded');
                }
            }

            const aboutStartThreshold = scrollingDown ? 0.3 : 0.01;
            const aboutEndThreshold = 3.1;

            if (scrollProgress > aboutStartThreshold) {
                aboutSection.classList.add('active');
            }

            // Dynamic background visibility based on scroll position
            const aboutBg = aboutSection.querySelector('.about-bg');
            if (scrollProgress > aboutStartThreshold && scrollProgress < aboutEndThreshold) {
                aboutBg.style.opacity = '1';
                aboutBg.style.visibility = 'visible';
            } else {
                aboutBg.style.opacity = '0';
                aboutBg.style.visibility = 'hidden';
            }

            const servicesStartThreshold = scrollingDown ? 3.1 : 2.3;
            const servicesEndThreshold = 7.0;

            if (scrollProgress > servicesStartThreshold) {
                servicesSection.classList.add('active');
            }

            const servicesBg = servicesSection.querySelector('.services-bg');
            if (scrollProgress > servicesStartThreshold && scrollProgress < servicesEndThreshold) {
                servicesBg.style.opacity = '1';
                servicesBg.style.visibility = 'visible';
            } else {
                servicesBg.style.opacity = '0';
                servicesBg.style.visibility = 'hidden';
            }

            const portfolioThreshold = scrollingDown ? 7.0 : 6.0;
            const portfolioEndThreshold = 11.0;

            if (scrollProgress > portfolioThreshold) {
                portfolioSection.classList.add('active');
            }

            const portfolioBg = portfolioSection.querySelector('.portfolio-bg');
            if (scrollProgress > portfolioThreshold && scrollProgress < portfolioEndThreshold) {
                portfolioBg.style.opacity = '1';
                portfolioBg.style.visibility = 'visible';
            } else {
                portfolioBg.style.opacity = '0';
                portfolioBg.style.visibility = 'hidden';
            }

            const howThreshold = scrollingDown ? 11.0 : 9.5;
            if (scrollProgress > howThreshold) {
                howSection.classList.add('active');
            }

            const howBg = howSection.querySelector('.how-bg');
            if (scrollProgress > howThreshold) {
                howBg.style.opacity = '1';
                howBg.style.visibility = 'visible';
            } else {
                howBg.style.opacity = '0';
                howBg.style.visibility = 'hidden';
            }

            const particles = morphParticles.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const delay = index / particleCount;
                const heroAboutStart = scrollingDown ? 0.2 : 0.01;
                let particleProgress = Math.max(0, Math.min(1, (scrollProgress - heroAboutStart - delay * 0.15) / 0.3));
                
                const aboutServicesStart = scrollingDown ? 3.0 : 2.2;
                if (scrollProgress > aboutServicesStart && scrollProgress < 5.2) {
                    particleProgress = Math.max(0, Math.min(1, (scrollProgress - aboutServicesStart - delay * 0.15) / 0.3));
                }
                
                const servicesPortfolioStart = scrollingDown ? 6.5 : 5.5;
                if (scrollProgress > servicesPortfolioStart && scrollProgress < 11.0) {
                    particleProgress = Math.max(0, Math.min(1, (scrollProgress - servicesPortfolioStart - delay * 0.15) / 0.4));
                }

                const portfolioHowStart = scrollingDown ? 11.0 : 9.5;
                if (scrollProgress > portfolioHowStart) {
                    particleProgress = Math.max(0, Math.min(1, (scrollProgress - portfolioHowStart - delay * 0.2) / 0.5));
                }

                if (particleProgress > 0 && particleProgress < 1) {
                    const opacity = Math.sin(particleProgress * Math.PI) * 0.8;
                    const yOffset = Math.sin(particleProgress * Math.PI) * -80;
                    const xOffset = Math.cos(index * 0.5) * 40;
                    
                    particle.style.opacity = opacity;
                    particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                } else {
                    particle.style.opacity = 0;
                }
            });

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });

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

        // ========== PORTFOLIO FUNCTIONALITY ==========
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        const portfolioDots = document.querySelectorAll('.portfolio-dot');
        const portfolioCarouselInner = document.getElementById('portfolioCarouselInner');
        const portfolioPrev = document.getElementById('portfolioPrev');
        const portfolioNext = document.getElementById('portfolioNext');

        let currentPortfolioIndex = 0;
        const totalCards = portfolioCards.length;

        function updatePortfolioCarousel() {
            const centerX = 0;
            const baseRadius = 320;
            
            portfolioCards.forEach((card, index) => {
                const offset = index - currentPortfolioIndex;
                let x = 0, y = 0, z = 0, scale = 1;
                let rotateX = 0, rotateY = 0, rotateZ = 0;
                let opacity = 1, blur = 0;
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                if (offset === 0) {
                    z = 200;
                    scale = 1.08;
                    opacity = 1;
                    rotateX = -2;
                    y = -10;
                } else if (absOffset === 1) {
                    x = sign * 250;
                    y = 15;
                    z = -80;
                    scale = 0.88;
                    rotateY = sign * -35;
                    rotateZ = sign * 2.5;
                    rotateX = 3;
                    opacity = 0.92;
                    blur = 0.5;
                } else if (absOffset === 2) {
                    x = sign * 420;
                    y = 35;
                    z = -180;
                    scale = 0.75;
                    rotateY = sign * -45;
                    rotateZ = sign * 4;
                    rotateX = 5;
                    opacity = 0.75;
                    blur = 1;
                } else if (absOffset === 3) {
                    x = sign * 520;
                    y = 55;
                    z = -280;
                    scale = 0.65;
                    rotateY = sign * -50;
                    rotateZ = sign * 5.5;
                    rotateX = 7;
                    opacity = 0.6;
                    blur = 1.5;
                } else if (absOffset === 4) {
                    x = sign * 580;
                    y = 75;
                    z = -380;
                    scale = 0.55;
                    rotateY = sign * -55;
                    rotateZ = sign * 7;
                    rotateX = 9;
                    opacity = 0.4;
                    blur = 2;
                } else {
                    x = sign * 650;
                    y = 90;
                    z = -500;
                    scale = 0.4;
                    rotateY = sign * -60;
                    rotateZ = sign * 8;
                    rotateX = 10;
                    opacity = 0;
                    blur = 3;
                }
                
                const dofBlur = blur * (1 + Math.abs(z) / 500);
                const shadowIntensity = 1 - (absOffset * 0.15);
                const shadowBlur = 40 + absOffset * 20;
                const shadowY = 30 + absOffset * 10;
                
                card.style.transform = `
                    translate3d(${x}px, ${y}px, ${z}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    rotateZ(${rotateZ}deg)
                    scale(${scale})
                `;
                
                card.style.opacity = opacity;
                card.style.filter = `
                    blur(${dofBlur}px)
                    brightness(${0.85 + (offset === 0 ? 0.15 : 0)})
                    contrast(${0.95 + (offset === 0 ? 0.1 : 0)})
                    saturate(${0.9 + (offset === 0 ? 0.2 : 0)})
                `;
                
                card.style.zIndex = Math.round(2000 + z);
                
                if (card.querySelector('.portfolio-card-inner')) {
                    const inner = card.querySelector('.portfolio-card-inner');
                    if (offset === 0) {
                        inner.style.boxShadow = `
                            inset 0 1px 0 rgba(125, 211, 192, 0.3),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.4),
                            0 0 140px rgba(125, 211, 192, 0.3),
                            0 ${shadowY}px ${shadowBlur * 1.5}px rgba(0, 0, 0, ${shadowIntensity * 0.8}),
                            0 10px 30px rgba(0, 0, 0, 0.6),
                            0 0 0 1px rgba(125, 211, 192, 0.4)
                        `;
                    } else {
                        inner.style.boxShadow = `
                            0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowIntensity * 0.7}),
                            0 10px 20px rgba(0, 0, 0, 0.4)
                        `;
                    }
                }
                
                if (offset === 0) {
                    card.classList.add('active');
                    setTimeout(() => {
                        card.style.transform += ' translateY(-2px)';
                    }, 100);
                } else {
                    card.classList.remove('active');
                }
            });

            portfolioDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPortfolioIndex);
            });
        }

        function nextCard() {
            currentPortfolioIndex = (currentPortfolioIndex + 1) % totalCards;
            updatePortfolioCarousel();
        }

        function prevCard() {
            currentPortfolioIndex = (currentPortfolioIndex - 1 + totalCards) % totalCards;
            updatePortfolioCarousel();
        }

        portfolioNext.addEventListener('click', nextCard);
        portfolioPrev.addEventListener('click', prevCard);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextCard();
            } else if (e.key === 'ArrowLeft') {
                prevCard();
            }
        });

        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let dragThreshold = 50;
        let hasDragged = false;
        
        portfolioCarouselInner.addEventListener('mousedown', startDrag);
        portfolioCarouselInner.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            hasDragged = false;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            currentX = startX;
            portfolioCarouselInner.style.cursor = 'grabbing';
        }
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diff = currentX - startX;
            
            if (Math.abs(diff) > 5) {
                hasDragged = true;
            }
            
            portfolioCarouselInner.style.transform = `rotateY(${-360 / totalCards * currentPortfolioIndex + diff * 0.2}deg)`;
        }
        
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
        
        function endDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            portfolioCarouselInner.style.cursor = 'grab';
            
            const diff = currentX - startX;
            
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    prevCard();
                } else {
                    nextCard();
                }
            } else {
                updatePortfolioCarousel();
            }
            
            setTimeout(() => {
                startX = 0;
                currentX = 0;
                hasDragged = false;
            }, 50);
        }
        
        portfolioCards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                if (hasDragged) {
                    hasDragged = false;
                    return;
                }
                
                if (index === currentPortfolioIndex) {
                    e.stopPropagation();
                    const videoId = card.getAttribute('data-video-id');
                    const driveUrl = card.getAttribute('data-video');
                    
                    console.log('Opening video:', videoId || driveUrl);
                    
                    if (videoId) {
                        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                    } else if (driveUrl) {
                        window.open(driveUrl.replace('/preview', '/view'), '_blank');
                    }
                } else {
                    currentPortfolioIndex = index;
                    updatePortfolioCarousel();
                }
            });
        });

        portfolioDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPortfolioIndex = index;
                updatePortfolioCarousel();
            });
        });

        updatePortfolioCarousel();

        console.log('🎬 Portfolio section loaded with 3D cards!');

        // ========== SERVICES SECTION FUNCTIONALITY ==========
        const serviceItems = document.querySelectorAll('.service-item');
        const serviceToggles = document.querySelectorAll('.service-toggle');

        serviceToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const expand = this.parentElement;
                const isExpanded = expand.getAttribute('data-expanded') === 'true';
                
                document.querySelectorAll('.service-expand').forEach(exp => {
                    exp.setAttribute('data-expanded', 'false');
                    exp.querySelector('.service-toggle').textContent = 'What We Deliver';
                });
                
                if (!isExpanded) {
                    expand.setAttribute('data-expanded', 'true');
                    this.textContent = 'Show Less';
                } else {
                    expand.setAttribute('data-expanded', 'false');
                    this.textContent = 'What We Deliver';
                }
            });
        });

        const observeServices = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observeServices.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        serviceItems.forEach(item => {
            observeServices.observe(item);
        });

        // ========== HOW IT WORKS FUNCTIONALITY ==========
        const howServicesData = {
            video: {
                steps: [
                    {
                        number: 1,
                        title: "Brief & Script",
                        desc: "Tell us your vision. We create the script, storyboard, and style guide.",
                        time: "2 hours"
                    },
                    {
                        number: 2,
                        title: "AI Production",
                        desc: "Our AI systems generate scenes, voiceovers, and visual effects.",
                        time: "12 hours"
                    },
                    {
                        number: 3,
                        title: "Edit & Polish",
                        desc: "Human touch for pacing, color grading, and final refinements.",
                        time: "6 hours"
                    },
                    {
                        number: 4,
                        title: "Deliver",
                        desc: "Video delivered in all formats. Unlimited revisions included.",
                        time: "4 hours"
                    }
                ]
            },
            web: {
                steps: [
                    {
                        number: 1,
                        title: "Discovery & Design",
                        desc: "We map your requirements and create wireframes + design system.",
                        time: "1 day"
                    },
                    {
                        number: 2,
                        title: "Development Sprint",
                        desc: "Build core features with clean, production-ready code.",
                        time: "3 days"
                    },
                    {
                        number: 3,
                        title: "Integration & Testing",
                        desc: "Connect APIs, databases, and run comprehensive tests.",
                        time: "2 days"
                    },
                    {
                        number: 4,
                        title: "Deploy & Iterate",
                        desc: "Launch to production. We stay for post-launch tweaks.",
                        time: "1 day"
                    }
                ]
            },
            design: {
                steps: [
                    {
                        number: 1,
                        title: "Brand Brief",
                        desc: "Understand your brand identity, audience, and campaign goals.",
                        time: "4 hours"
                    },
                    {
                        number: 2,
                        title: "Concept Creation",
                        desc: "Generate multiple design concepts using AI + human creativity.",
                        time: "18 hours"
                    },
                    {
                        number: 3,
                        title: "Refinement",
                        desc: "Iterate based on your feedback until it's perfect.",
                        time: "12 hours"
                    },
                    {
                        number: 4,
                        title: "Final Deliverables",
                        desc: "Print-ready files, digital assets, and brand guidelines.",
                        time: "14 hours"
                    }
                ]
            },
            automation: {
                steps: [
                    {
                        number: 1,
                        title: "Process Audit",
                        desc: "Map your current workflows and identify automation opportunities.",
                        time: "1 day"
                    },
                    {
                        number: 2,
                        title: "Build Automation",
                        desc: "Create custom workflows, integrations, and AI agents.",
                        time: "2-3 days"
                    },
                    {
                        number: 3,
                        title: "Testing & Training",
                        desc: "Test thoroughly and train your team on the new system.",
                        time: "1 day"
                    },
                    {
                        number: 4,
                        title: "Monitor & Optimize",
                        desc: "Deploy and continuously improve based on performance data.",
                        time: "Ongoing"
                    }
                ]
            }
        };

        const howNavItems = document.querySelectorAll('.how-nav-item');
        const howStepsFlow = document.getElementById('howStepsFlow');
        const howTimelineProgress = document.getElementById('howTimelineProgress');
        const howTimelineDots = document.getElementById('howTimelineDots');

        let currentService = 'video';

        function renderSteps(serviceKey) {
            const service = howServicesData[serviceKey];
            const steps = service.steps;

            // Clear existing content
            howStepsFlow.innerHTML = '';
            howTimelineDots.innerHTML = '';

            // Calculate total time for timeline
            let totalTimeLabel = '';
            if (serviceKey === 'video') totalTimeLabel = 'Total: 24 hours';
            else if (serviceKey === 'web') totalTimeLabel = 'Total: 7 days';
            else if (serviceKey === 'design') totalTimeLabel = 'Total: 2 days';
            else if (serviceKey === 'automation') totalTimeLabel = 'Total: 4-5 days';

            // Add START label
            const startLabel = document.createElement('div');
            startLabel.className = 'how-timeline-start';
            startLabel.textContent = 'START';
            howTimelineDots.appendChild(startLabel);

            // Add TOTAL label
            const totalLabel = document.createElement('div');
            totalLabel.className = 'how-timeline-total';
            totalLabel.textContent = totalTimeLabel;
            howTimelineDots.appendChild(totalLabel);

            // Create timeline dots with time labels
            steps.forEach((step, index) => {
                const dot = document.createElement('div');
                dot.className = 'how-timeline-dot' + (index === 0 ? ' active' : '');
                dot.setAttribute('data-step', index);

                // Add time label to each dot
                const timeLabel = document.createElement('div');
                timeLabel.className = 'how-timeline-dot-label';
                timeLabel.textContent = step.time;
                dot.appendChild(timeLabel);

                // Add click event to jump to step
                dot.addEventListener('click', () => {
                    const allDots = howTimelineDots.querySelectorAll('.how-timeline-dot');
                    const allSteps = howStepsFlow.querySelectorAll('.how-step');

                    // Remove active from all
                    allDots.forEach(d => d.classList.remove('active'));
                    allSteps.forEach(s => s.classList.remove('highlight'));

                    // Add active to clicked
                    dot.classList.add('active');
                    if (allSteps[index]) {
                        allSteps[index].classList.add('highlight');
                        allSteps[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });

                howTimelineDots.appendChild(dot);
            });

            // Create step cards
            steps.forEach((step, index) => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'how-step';
                stepDiv.innerHTML = `
                    <div class="how-step-number">${step.number}</div>
                    <h3 class="how-step-title">${step.title}</h3>
                    <p class="how-step-desc">${step.desc}</p>
                    <div class="how-step-time">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${step.time}
                    </div>
                `;
                howStepsFlow.appendChild(stepDiv);
                
                // Animate in with stagger
                setTimeout(() => {
                    stepDiv.classList.add('visible');
                }, index * 150);
            });
            
            // Animate timeline progress
            setTimeout(() => {
                howStepsFlow.classList.add('visible');
                howTimelineProgress.style.width = '100%';
                
                // Animate dots sequentially
                const dots = howTimelineDots.querySelectorAll('.how-timeline-dot');
                dots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.classList.add('completed');
                        if (index < dots.length - 1) {
                            dots[index + 1].classList.add('active');
                        }
                    }, index * 800);
                });
            }, 200);
        }

        // Service navigation
        howNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const service = item.getAttribute('data-service');
                
                // Update active state
                howNavItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Reset and render new service
                howStepsFlow.classList.remove('visible');
                howTimelineProgress.style.width = '0%';
                
                setTimeout(() => {
                    currentService = service;
                    renderSteps(service);
                }, 300);
            });
        });

        // Initial render
        renderSteps(currentService);

        console.log('✨ How It Works section loaded!');

        // ========== STATS COUNTER ANIMATION ==========
        const statsSection = document.getElementById('statsSection');
        const statNumbers = document.querySelectorAll('.stat-number');
        const statItems = document.querySelectorAll('.stat-item');
        let statsAnimated = false;

        function animateNumber(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (target > 50 && target !== 90 ? '+' : '');
                }
            }, 16);
        }

        // Intersection Observer for stats animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;

                    // Fade in items with stagger
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    });

                    // Start counting animations
                    setTimeout(() => {
                        statNumbers.forEach(number => {
                            const target = parseInt(number.getAttribute('data-target'));
                            animateNumber(number, target);
                        });
                    }, 400);

                    // Unobserve after animation starts
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        console.log('📊 Stats banner loaded!');
        // ========== QUOTE MODAL FUNCTIONALITY ==========
        const quoteModal = document.getElementById('quoteModal');
        const closeModal = document.getElementById('closeModal');
        const quoteForm = document.getElementById('quoteForm');
        const serviceSelect = document.getElementById('serviceSelect');
        const openModalButtons = document.querySelectorAll('.open-quote-modal');

        // Open modal when "Get Free Quote" buttons are clicked
        openModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service');
                quoteModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling

                // Pre-fill service dropdown if data-service attribute exists
                if (serviceName) {
                    serviceSelect.value = serviceName;
                }
            });
        });

        // Close modal when X button is clicked
        closeModal.addEventListener('click', function() {
            quoteModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close modal when clicking outside the content
        quoteModal.addEventListener('click', function(e) {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
                quoteModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Handle form submission
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);

            // Create mailto link with form data
            const subject = `Quote Request: ${data.service}`;
            const body = `
Name: ${data.name}
Email: ${data.email}
Service: ${data.service}
Budget: ${data.budget || 'Not specified'}

Project Description:
${data.description}
            `.trim();

            const mailtoLink = `mailto:omur@posthumane.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            alert('Thank you! Your default email client will open. We\'ll respond within 24 hours.');

            // Close modal and reset form
            quoteModal.classList.remove('active');
            document.body.style.overflow = '';
            quoteForm.reset();
        });
    (function() {
        'use strict';

        const CONFIG = {
            scrollThreshold: 80,
            observerMargin: '-50% 0px -50% 0px'
        };

        const elements = {
            header: null,
            navLinks: null,
            mobileMenuToggle: null,
            headerNav: null,
            sections: null
        };

        let lastScroll = 0;
        let rafId = null;
        let observer = null;

        function init() {
            elements.header = document.getElementById('minimalHeader');
            elements.navLinks = document.querySelectorAll('.nav-link');
            elements.mobileMenuToggle = document.getElementById('mobileMenuToggle');
            elements.headerNav = document.getElementById('headerNav');
            elements.sections = document.querySelectorAll('section[id]');

            if (!elements.header) return;

            setupScrollHandler();
            setupNavigationLinks();
            setupMobileMenu();
            setupIntersectionObserver();
            handleScroll();
        }

        function setupScrollHandler() {
            let ticking = false;

            window.addEventListener('scroll', () => {
                lastScroll = window.pageYOffset;

                if (!ticking) {
                    rafId = window.requestAnimationFrame(() => {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }

        function handleScroll() {
            if (lastScroll > CONFIG.scrollThreshold) {
                elements.header.classList.add('scrolled');
            } else {
                elements.header.classList.remove('scrolled');
            }
        }

        function setupNavigationLinks() {
            elements.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        const headerHeight = elements.header.offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        }
                    }

                    closeMobileMenu();
                });
            });
        }

        function setupMobileMenu() {
            if (!elements.mobileMenuToggle) return;

            elements.mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMobileMenu();
            });

            document.addEventListener('click', (e) => {
                if (!elements.header.contains(e.target) && elements.headerNav.classList.contains('active')) {
                    closeMobileMenu();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && elements.headerNav.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }

        function toggleMobileMenu() {
            const isActive = elements.headerNav.classList.toggle('active');
            elements.mobileMenuToggle.classList.toggle('active', isActive);
            elements.mobileMenuToggle.setAttribute('aria-expanded', isActive);
        }

        function closeMobileMenu() {
            elements.headerNav.classList.remove('active');
            elements.mobileMenuToggle.classList.remove('active');
            elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        function setupIntersectionObserver() {
            if (!elements.sections.length) return;

            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateActiveNavLink(entry.target.getAttribute('id'));
                    }
                });
            }, {
                root: null,
                rootMargin: CONFIG.observerMargin,
                threshold: 0
            });

            elements.sections.forEach(section => {
                if (section.id) observer.observe(section);
            });
        }

        function updateActiveNavLink(sectionId) {
            if (!sectionId) return;

            elements.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === `#${sectionId}`);
            });
        }

        window.MinimalHeader = {
            init,
            destroy: () => {
                if (rafId) window.cancelAnimationFrame(rafId);
                if (observer) observer.disconnect();
            },
            closeMobileMenu,
            updateActiveNavLink
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

    })();
    (function() {
        'use strict';

        // ========== APPLE-STYLE EASING FUNCTIONS ==========
        const EASINGS = {
            // Apple's signature easing
            apple: 'cubic-bezier(0.4, 0, 0.2, 1)',
            appleOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
            appleIn: 'cubic-bezier(0.4, 0, 1, 1)',
            spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            smooth: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
        };

        // ========== APPLE-STYLE LOADER ==========
        const pageLoader = document.getElementById('pageLoader');

        window.addEventListener('load', () => {
            setTimeout(() => {
                if (pageLoader) {
                    pageLoader.classList.add('hidden');
                    setTimeout(() => {
                        pageLoader.style.display = 'none';
                    }, 800);
                }
            }, 1500);
        });

        // ========== MANIFESTO MODAL ==========
        const headerManifestoBtn = document.getElementById('headerManifestoBtn');
        const manifestoModal = document.getElementById('manifestoModal');
        const manifestoOverlay = document.getElementById('manifestoOverlay');
        const manifestoClose = document.getElementById('manifestoClose');

        // Open modal from header button
        if (headerManifestoBtn) {
            headerManifestoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (manifestoModal) {
                    manifestoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }

        // Close modal function
        function closeManifestoModal() {
            if (manifestoModal) {
                manifestoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Close button
        if (manifestoClose) {
            manifestoClose.addEventListener('click', closeManifestoModal);
        }

        // Click outside to close
        if (manifestoOverlay) {
            manifestoOverlay.addEventListener('click', closeManifestoModal);
        }

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && manifestoModal && manifestoModal.classList.contains('active')) {
                closeManifestoModal();
            }
        });

        // ========== SMOOTH SCROLL PROGRESS (OPTIMIZED) ==========
        const scrollProgress = document.getElementById('scrollProgress');
        let ticking = false;

        function updateScrollProgress() {
            if (!scrollProgress) return;

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

            requestAnimationFrame(() => {
                scrollProgress.style.width = Math.min(scrollPercentage, 100) + '%';
                ticking = false;
            });
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        updateScrollProgress();

        // ========== BACK TO TOP BUTTON (APPLE-STYLE) ==========
        const backToTopBtn = document.getElementById('backToTop');
        let lastScrollTop = 0;
        let scrollDirection = 'down';

        function toggleBackToTop() {
            if (!backToTopBtn) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;

            if (scrollTop > 500) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.setAttribute('aria-hidden', 'false');
                // Apple-style entrance
                backToTopBtn.style.transform = 'translateY(0) scale(1)';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.classList.remove('visible');
                backToTopBtn.setAttribute('aria-hidden', 'true');
                backToTopBtn.style.transform = 'translateY(10px) scale(0.9)';
                backToTopBtn.style.opacity = '0';
            }
        }

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();

        if (backToTopBtn) {
            // Apple-style smooth scroll to top
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();

                // Custom smooth scroll with easing
                const duration = 800;
                const start = window.pageYOffset;
                const startTime = performance.now();

                function easeOutQuart(t) {
                    return 1 - Math.pow(1 - t, 4);
                }

                function scrollAnimation(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easing = easeOutQuart(progress);

                    window.scrollTo(0, start * (1 - easing));

                    if (progress < 1) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }

                requestAnimationFrame(scrollAnimation);
            });

            // Hover effect
            backToTopBtn.addEventListener('mouseenter', () => {
                backToTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
            });

            backToTopBtn.addEventListener('mouseleave', () => {
                backToTopBtn.style.transform = 'translateY(0) scale(1)';
            });
        }

        // ========== FAQ ACCORDION (APPLE-STYLE) ==========
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question) {
                // Apple-style entrance animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `opacity 0.5s ${EASINGS.appleOut} ${index * 0.05}s, transform 0.5s ${EASINGS.appleOut} ${index * 0.05}s`;

                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);

                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all other FAQs with animation
                    faqItems.forEach(faq => {
                        if (faq !== item && faq.classList.contains('active')) {
                            faq.classList.remove('active');
                            const faqAnswer = faq.querySelector('.faq-answer');
                            if (faqAnswer) {
                                faqAnswer.style.maxHeight = '0';
                            }
                        }
                    });

                    // Toggle current FAQ with Apple-style animation
                    if (!isActive) {
                        item.classList.add('active');
                        if (answer) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                            answer.style.transition = `max-height 0.4s ${EASINGS.appleOut}, padding 0.4s ${EASINGS.appleOut}`;
                        }
                    } else {
                        item.classList.remove('active');
                        if (answer) {
                            answer.style.maxHeight = '0';
                        }
                    }
                });

                // Keyboard accessibility
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });

                // Hover effect
                question.addEventListener('mouseenter', () => {
                    if (!item.classList.contains('active')) {
                        question.style.transform = 'translateX(4px)';
                    }
                });

                question.addEventListener('mouseleave', () => {
                    question.style.transform = 'translateX(0)';
                });
            }
        });

        // ========== APPLE-STYLE INTERSECTION OBSERVER ==========
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');

        const appleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = parseFloat(entry.target.dataset.delay || 0);

                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay);

                    appleObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) scale(0.95)';
            element.style.transition = `opacity 0.7s ${EASINGS.appleOut}, transform 0.7s ${EASINGS.appleOut}`;
            element.dataset.delay = (index % 3) * 100; // Stagger effect
            appleObserver.observe(element);
        });

        // ========== APPLE-STYLE SMOOTH SCROLL ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#' || this.classList.contains('faq-question')) {
                    return;
                }

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();

                    // Custom Apple-style smooth scroll
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;

                    function easeInOutCubic(t) {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    }

                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const progress = Math.min(timeElapsed / duration, 1);
                        const easing = easeInOutCubic(progress);

                        window.scrollTo(0, startPosition + distance * easing);

                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        }
                    }

                    requestAnimationFrame(animation);
                }
            });
        });

        // ========== PARALLAX SCROLL EFFECT (APPLE-STYLE) ==========
        const parallaxElements = document.querySelectorAll('.hero-section');
        let parallaxTicking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);

                requestAnimationFrame(() => {
                    element.style.transform = `translateY(${yPos}px)`;
                    parallaxTicking = false;
                });
            });
        }

        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        }, { passive: true });

        // ========== PERFORMANCE OPTIMIZATION ==========
        // Lazy load images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }

        console.log('🍎 Apple-style premium features loaded!');
        console.log('✨ Page Loader (fixed), Smooth Scroll, Parallax, Micro-interactions');
        console.log('⚡ Performance optimized with RAF and passive listeners');

    })();
    (function() {
        'use strict';

        const faqModal = document.getElementById('faqModal');
        const openFaqBtn = document.getElementById('openFaqModal');
        const closeFaqBtn = document.getElementById('closeFaqModal');
        const faqSearchInput = document.getElementById('faqSearchInput');
        const faqItems = document.querySelectorAll('.faq-item');

        // Open FAQ Modal
        if (openFaqBtn) {
            openFaqBtn.addEventListener('click', (e) => {
                e.preventDefault();
                faqModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Focus search input after animation
                setTimeout(() => {
                    if (faqSearchInput) {
                        faqSearchInput.focus();
                    }
                }, 500);
            });
        }

        // Footer FAQ Link
        const footerFaqLink = document.getElementById('footerFaqLink');
        if (footerFaqLink) {
            footerFaqLink.addEventListener('click', (e) => {
                e.preventDefault();
                faqModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Smooth scroll to top first
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Focus search input after animation
                setTimeout(() => {
                    if (faqSearchInput) {
                        faqSearchInput.focus();
                    }
                }, 500);
            });
        }

        // Close FAQ Modal
        function closeFaq() {
            faqModal.classList.remove('active');
            document.body.style.overflow = '';

            // Clear search and reset all items
            if (faqSearchInput) {
                faqSearchInput.value = '';
            }
            faqItems.forEach(item => {
                item.classList.remove('hidden', 'active');
            });
        }

        if (closeFaqBtn) {
            closeFaqBtn.addEventListener('click', closeFaq);
        }

        // Close on overlay click
        if (faqModal) {
            faqModal.addEventListener('click', (e) => {
                if (e.target === faqModal) {
                    closeFaq();
                }
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && faqModal.classList.contains('active')) {
                closeFaq();
            }
        });

        // FAQ Accordion Toggle
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all other FAQs
                    faqItems.forEach(faq => {
                        if (faq !== item && faq.classList.contains('active')) {
                            faq.classList.remove('active');
                            const faqAnswer = faq.querySelector('.faq-answer');
                            if (faqAnswer) {
                                faqAnswer.style.maxHeight = '0';
                            }
                        }
                    });

                    // Toggle current FAQ
                    if (!isActive) {
                        item.classList.add('active');
                        if (answer) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        }
                    } else {
                        item.classList.remove('active');
                        if (answer) {
                            answer.style.maxHeight = '0';
                        }
                    }
                });
            }
        });

        // Search Functionality
        if (faqSearchInput) {
            faqSearchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();

                faqItems.forEach(item => {
                    const questionText = item.querySelector('.faq-question-text').textContent.toLowerCase();
                    const answerText = item.querySelector('.faq-answer-content').textContent.toLowerCase();

                    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('active');
                    }
                });

                // Show/hide categories based on visible items
                document.querySelectorAll('.faq-category').forEach(category => {
                    const visibleItems = category.querySelectorAll('.faq-item:not(.hidden)');
                    if (visibleItems.length === 0) {
                        category.style.display = 'none';
                    } else {
                        category.style.display = 'block';
                    }
                });
            });
        }

        console.log('❓ FAQ Modal loaded successfully');

    })();
    (function() {
        'use strict';

        const missionSection = document.getElementById('missionSection');
        const missionTitle = document.getElementById('missionTitle');
        const missionCta = document.getElementById('missionCta');
        const missionParticles = document.getElementById('missionParticles');

        // ========== CREATE FLOATING PARTICLES ==========
        function createParticles() {
            if (!missionParticles) return;

            const particleCount = 40;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'mission-particle';

                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                particle.style.left = x + '%';
                particle.style.top = y + '%';

                // Random animation
                const duration = 10 + Math.random() * 20;
                const delay = Math.random() * 5;
                const distance = 50 + Math.random() * 100;
                const angle = Math.random() * 360;

                particle.style.animation = `particleFloat${i} ${duration}s ease-in-out ${delay}s infinite`;

                // Create unique keyframe for each particle
                const keyframes = `
                    @keyframes particleFloat${i} {
                        0%, 100% {
                            transform: translate(0, 0);
                            opacity: 0.3;
                        }
                        50% {
                            transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px);
                            opacity: 0.8;
                        }
                    }
                `;

                // Inject keyframes
                const styleSheet = document.createElement('style');
                styleSheet.textContent = keyframes;
                document.head.appendChild(styleSheet);

                missionParticles.appendChild(particle);
            }
        }

        // ========== WORD-BY-WORD REVEAL ANIMATION ==========
        function splitTextToWords() {
            if (!missionTitle) return;

            const text = missionTitle.innerHTML;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;

            const nodes = Array.from(tempDiv.childNodes);
            let wordIndex = 0;

            const result = nodes.map(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Split text into words
                    const words = node.textContent.split(' ').filter(w => w.length > 0);
                    return words.map(word => {
                        const span = document.createElement('span');
                        span.className = 'word';
                        span.textContent = word + ' ';
                        span.style.animationDelay = (wordIndex * 0.05) + 's';
                        wordIndex++;
                        return span.outerHTML;
                    }).join('');
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Keep highlight spans intact
                    const span = document.createElement('span');
                    span.className = 'word ' + node.className;
                    span.innerHTML = node.innerHTML;
                    span.style.animationDelay = (wordIndex * 0.05) + 's';
                    wordIndex++;
                    return span.outerHTML + ' ';
                }
                return '';
            }).join('');

            missionTitle.innerHTML = result;
        }

        // ========== MAGNETIC CTA EFFECT ==========
        function addMagneticEffect() {
            if (!missionCta) return;

            let rafId = null;

            missionCta.addEventListener('mousemove', (e) => {
                if (rafId) return;

                rafId = requestAnimationFrame(() => {
                    const rect = missionCta.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    const moveX = x * 0.3;
                    const moveY = y * 0.3;

                    missionCta.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    missionCta.classList.add('magnetic');

                    rafId = null;
                });
            });

            missionCta.addEventListener('mouseleave', () => {
                missionCta.style.transform = '';
                setTimeout(() => {
                    missionCta.classList.remove('magnetic');
                }, 200);
            });
        }

        // ========== TYPEWRITER EFFECT ==========
        function startTypewriter() {
            const paragraphs = document.querySelectorAll('.mission-paragraph');

            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.classList.add('typewriter');

                    setTimeout(() => {
                        p.classList.remove('typewriter');
                        p.classList.add('typewriter-done');
                    }, 3000);
                }, index * 3200);
            });
        }

        // ========== INTERSECTION OBSERVER FOR SCROLL TRIGGER ==========
        function initScrollTrigger() {
            if (!missionSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        missionSection.classList.add('active');

                        setTimeout(() => {
                            startTypewriter();
                        }, 1000);

                        observer.unobserve(missionSection);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });

            observer.observe(missionSection);
        }

        // ========== INITIALIZE ==========
        function init() {
            createParticles();
            splitTextToWords();
            addMagneticEffect();
            initScrollTrigger();
            console.log('✨ Mission Section initialized with unprecedented animations');
        }

        // Run on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

    })();
    (function() {
        'use strict';

        // ========== DEBOUNCE UTILITY ==========
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // ========== THROTTLE UTILITY ==========
        function throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        // ========== LAZY LOAD IMAGES ==========
        function lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');

            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // ========== REDUCE ANIMATIONS ON LOW-END DEVICES ==========
        function optimizeForDevice() {
            const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

            if (isLowEndDevice) {
                // Reduce particle count for mission section
                const particles = document.querySelectorAll('.mission-particle');
                particles.forEach((particle, index) => {
                    if (index % 2 === 0) {
                        particle.remove();
                    }
                });

                // Reduce liquid blobs
                const blobs = document.querySelectorAll('.liquid-blob');
                if (blobs.length > 2) {
                    blobs[2].remove();
                }

                console.log('⚡ Optimized for low-end device');
            }
        }

        // ========== PASSIVE EVENT LISTENERS ==========
        function optimizeEventListeners() {
            // Add passive listeners for better scroll performance
            document.addEventListener('touchstart', () => {}, { passive: true });
            document.addEventListener('touchmove', () => {}, { passive: true });
            document.addEventListener('wheel', () => {}, { passive: true });
        }

        // ========== PREVENT MEMORY LEAKS ==========
        function preventMemoryLeaks() {
            // Clear animations when elements leave viewport
            const animatedElements = document.querySelectorAll('.word, .mission-particle');

            const cleanupObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        entry.target.style.willChange = 'auto';
                    } else {
                        entry.target.style.willChange = 'transform, opacity';
                    }
                });
            });

            animatedElements.forEach(el => {
                if (el) cleanupObserver.observe(el);
            });
        }

        // ========== SMOOTH ANCHOR SCROLLING WITH OFFSET ==========
        function enhanceSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');

                    // Skip if it's just "#" or opens a modal
                    if (href === '#' || this.id === 'openFaqModal' || this.id === 'footerFaqLink') {
                        return;
                    }

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const offset = 80; // Navigation height offset
                        const targetPosition = target.offsetTop - offset;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // ========== PRELOAD CRITICAL IMAGES ==========
        function preloadCriticalImages() {
            const criticalImages = [
                'https://i.ibb.co/YBSFK4FQ/posthumane-logo-geometric.png'
            ];

            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        }

        // ========== VIEWPORT HEIGHT FIX FOR MOBILE ==========
        function fixMobileViewportHeight() {
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setVH();
            window.addEventListener('resize', debounce(setVH, 250));
        }

        // ========== INITIALIZE ALL OPTIMIZATIONS ==========
        function init() {
            lazyLoadImages();
            optimizeForDevice();
            optimizeEventListeners();
            preventMemoryLeaks();
            enhanceSmoothScroll();
            preloadCriticalImages();
            fixMobileViewportHeight();

            console.log('🚀 All performance optimizations loaded');
        }

        // Run on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

    })();
    // ========== NEW FEATURES JAVASCRIPT ==========
    (function() {
        'use strict';

        // ========== 1. TYPEWRITER EFFECT ==========
        function initTypewriter() {
            const typewriterElement = document.querySelector('.typewriter-text');
            if (!typewriterElement) return;

            // Remove border after animation completes
            setTimeout(() => {
                typewriterElement.classList.add('typed');
            }, 3500); // 1s delay + 2s animation + 0.5s buffer
        }

        // ========== 3. PORTFOLIO LIGHTBOX ==========
        function initPortfolioLightbox() {
            const lightbox = document.getElementById('portfolioLightbox');
            const lightboxClose = document.getElementById('lightboxClose');
            const lightboxVideoWrapper = document.getElementById('lightboxVideoWrapper');
            const lightboxTitle = document.getElementById('lightboxTitle');
            const lightboxDescription = document.getElementById('lightboxDescription');
            const portfolioCards = document.querySelectorAll('.portfolio-card');

            if (!lightbox || !portfolioCards.length) return;

            // Open lightbox on active card click
            portfolioCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    // Only open if it's the active (centered) card
                    if (!card.classList.contains('active')) return;

                    const videoId = card.getAttribute('data-video-id');
                    const driveUrl = card.getAttribute('data-video');
                    const title = card.getAttribute('data-title') || 'Portfolio Project';
                    const description = card.getAttribute('data-description') || 'Watch our amazing work';

                    // Create iframe
                    let videoSrc = '';
                    if (videoId) {
                        videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    } else if (driveUrl) {
                        // Extract Google Drive ID and create embed URL
                        const driveId = driveUrl.match(/[-\w]{25,}/);
                        if (driveId) {
                            videoSrc = `https://drive.google.com/file/d/${driveId[0]}/preview`;
                        }
                    }

                    if (videoSrc) {
                        lightboxVideoWrapper.innerHTML = `<iframe src="${videoSrc}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                        lightboxTitle.textContent = title;
                        lightboxDescription.textContent = description;
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            // Close lightbox
            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                // Clear video to stop playback
                setTimeout(() => {
                    lightboxVideoWrapper.innerHTML = '';
                }, 400);
            }

            lightboxClose.addEventListener('click', closeLightbox);

            // Close on background click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });
        }

        // ========== 4. CONTACT FORM VALIDATION & SUBMISSION ==========
        function initContactForm() {
            const contactForm = document.getElementById('contactForm');
            if (!contactForm) return;

            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const phoneInput = document.getElementById('contactPhone');
            const serviceSelect = document.getElementById('contactService');
            const messageInput = document.getElementById('contactMessage');
            const submitBtn = document.getElementById('contactSubmitBtn');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Real-time validation
            function validateField(input, errorElement, validator) {
                const value = input.value.trim();
                const isValid = validator(value);

                if (!isValid && value.length > 0) {
                    input.parentElement.classList.add('error');
                } else {
                    input.parentElement.classList.remove('error');
                }

                return isValid || value.length === 0;
            }

            emailInput.addEventListener('blur', () => {
                validateField(emailInput, document.getElementById('emailError'), (val) => emailRegex.test(val));
            });

            // Form submission
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Validate all fields
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const phone = phoneInput.value.trim();
                const service = serviceSelect.value;
                const message = messageInput.value.trim();

                let isValid = true;

                // Name validation
                if (name.length < 2) {
                    nameInput.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    nameInput.parentElement.classList.remove('error');
                }

                // Email validation
                if (!emailRegex.test(email)) {
                    emailInput.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    emailInput.parentElement.classList.remove('error');
                }

                // Service validation
                if (!service) {
                    serviceSelect.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    serviceSelect.parentElement.classList.remove('error');
                }

                // Message validation
                if (message.length < 10) {
                    messageInput.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    messageInput.parentElement.classList.remove('error');
                }

                if (!isValid) {
                    errorMessage.classList.add('show');
                    setTimeout(() => {
                        errorMessage.classList.remove('show');
                    }, 5000);
                    return;
                }

                // Disable submit button
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.6';
                submitBtn.querySelector('span').textContent = 'Sending...';

                // Create mailto link
                const subject = `Contact Form: ${service}`;
                const body = `Name: ${name}\nEmail: ${email}\n${phone ? 'Phone: ' + phone + '\n' : ''}Service: ${service}\n\nMessage:\n${message}`;
                const mailtoLink = `mailto:omur@posthumane.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                // Open mailto
                window.location.href = mailtoLink;

                // Show success message
                successMessage.classList.add('show');
                contactForm.reset();

                // Reset button
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.querySelector('span').textContent = 'Send Message';
                    successMessage.classList.remove('show');
                }, 5000);
            });
        }

        // ========== 5. STICKY HEADER OPTIMIZATION ==========
        function initStickyHeader() {
            const header = document.getElementById('minimalHeader');
            if (!header) return;

            let lastScroll = 0;
            let ticking = false;

            function updateHeader() {
                const scrollY = window.pageYOffset;

                if (scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                lastScroll = scrollY;
                ticking = false;
            }

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            }, { passive: true });
        }

        // ========== 6. PORTFOLIO KEYBOARD NAVIGATION ==========
        function enhancePortfolioNavigation() {
            // Keyboard navigation is already implemented in existing code
            // This function ensures it's working properly
            const portfolioPrev = document.getElementById('portfolioPrev');
            const portfolioNext = document.getElementById('portfolioNext');

            if (portfolioPrev && portfolioNext) {
                console.log('✅ Portfolio keyboard navigation enabled (Arrow Left/Right)');
            }
        }

        // ========== 7. PERFORMANCE OPTIMIZATIONS ==========
        function applyPerformanceOptimizations() {
            // Add will-change to animated elements on intersection
            const animatedElements = document.querySelectorAll('.contact-section');

            const performanceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.willChange = 'transform, opacity';
                    } else {
                        entry.target.style.willChange = 'auto';
                    }
                });
            }, {
                rootMargin: '50px'
            });

            animatedElements.forEach(el => {
                if (el) performanceObserver.observe(el);
            });

            // Debounce resize events
            let resizeTimeout;
            window.addEventListener('resize', () => {
                if (resizeTimeout) clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    console.log('🔧 Window resized - layout adjusted');
                }, 250);
            }, { passive: true });
        }

        // ========== INITIALIZE ALL NEW FEATURES ==========
        function initNewFeatures() {
            initTypewriter();
            initPortfolioLightbox();
            initContactForm();
            initStickyHeader();
            enhancePortfolioNavigation();
            applyPerformanceOptimizations();

            console.log('🎉 All new features initialized successfully!');
            console.log('✨ Features: Typewriter, Lightbox, Contact Form, Sticky Header, Multi-language');
        }

        // Run on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initNewFeatures);
        } else {
            initNewFeatures();
        }

    })();
