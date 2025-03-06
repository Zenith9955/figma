        // Three.js Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#ff6b6b'
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        camera.position.z = 2;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();

        // Custom Cursor
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
            gsap.to(follower, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3
            });
        });

        // Navigation Menu
        const menuToggle = document.getElementById('menu-toggle');
        const closeMenu = document.getElementById('close-menu');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            gsap.to(navLinks, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        closeMenu.addEventListener('click', () => {
            closeNavMenu();
        });

        // Close the nav menu when clicking outside of it.
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target) || menuToggle.contains(event.target);
            if (navMenu.classList.contains('active') && !isClickInsideMenu) {
                closeNavMenu();
            }
        });

        // Function to close nav menu (DRY)
        function closeNavMenu() {
            navMenu.classList.remove('active');
            gsap.to(navLinks, {
                opacity: 0,
                x: 50,
                duration: 0.3
            });
        }

        // Scroll Animation
        const scrollSections = document.querySelectorAll('.scroll-section');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        gsap.fromTo(entry.target, { y: 50 }, { y: 0 });
                    }
                });
            },
            { threshold: 0.1 }
        );

        scrollSections.forEach(section => observer.observe(section));

