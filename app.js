// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
	// Hero section fade in on load
	const heroSection = document.querySelector(".hero");
	if (heroSection) {
		heroSection.style.opacity = "0";
		setTimeout(() => {
			heroSection.style.opacity = "1";
			heroSection.style.transition = "opacity 1.2s ease-in-out";
		}, 100);
	}

	const menuToggle = document.getElementById("mobile-menu");
	const navMenu = document.querySelector(".nav-menu");

	if (menuToggle) {
		menuToggle.addEventListener("click", function () {
			menuToggle.classList.toggle("active");
			navMenu.classList.toggle("active");

			// Toggle menu icon
			const bars = document.querySelectorAll(".bar");
			if (menuToggle.classList.contains("active")) {
				bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
				bars[1].style.opacity = "0";
				bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
			} else {
				bars[0].style.transform = "none";
				bars[1].style.opacity = "1";
				bars[2].style.transform = "none";
			}
		});
	}

	// Close mobile menu when clicking on a nav link
	const navLinks = document.querySelectorAll(".nav-link");
	const navContact = document.querySelectorAll(".contact-btn");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (navMenu && navMenu.classList.contains("active") && menuToggle) {
				menuToggle.click();
			}
		});
	});

	navContact.forEach((link) => {
		link.addEventListener("click", () => {
			if (navMenu && navMenu.classList.contains("active") && menuToggle) {
				menuToggle.click();
			}
		});
	});

	// Navbar scroll effect
	const navbar = document.querySelector(".navbar");
	if (navbar) {
		window.addEventListener("scroll", function () {
			if (window.scrollY > 50) {
				navbar.style.padding = "10px 0";
				navbar.style.backgroundColor = "rgba(0, 21, 41, 0.95)";
				navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
			} else {
				navbar.style.padding = "20px 0";
				navbar.style.backgroundColor = "var(--navy)";
				navbar.style.boxShadow = "none";
			}
		});
	}

	// Portfolio Filter
	const filterBtns = document.querySelectorAll(".filter-btn");
	const portfolioItems = document.querySelectorAll(".portfolio-item");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			// Remove active class from all buttons
			filterBtns.forEach((filterBtn) => {
				filterBtn.classList.remove("active");
			});

			// Add active class to clicked button
			btn.classList.add("active");

			const filterValue = btn.getAttribute("data-filter");

			portfolioItems.forEach((item) => {
				if (filterValue === "all" || item.classList.contains(filterValue)) {
					item.style.display = "block";
					setTimeout(() => {
						item.style.opacity = "1";
						item.style.transform = "scale(1)";
					}, 200);
				} else {
					item.style.opacity = "0";
					item.style.transform = "scale(0.8)";
					setTimeout(() => {
						item.style.display = "none";
					}, 500);
				}
			});
		});
	});

	// Testimonial Slider
	const track = document.getElementById("testimonial-track");
	const dots = document.querySelectorAll(".dot");
	const prevBtn = document.getElementById("prev-testimonial");
	const nextBtn = document.getElementById("next-testimonial");

	if (track && dots.length > 0) {
		let currentSlide = 0;
		const slideCount = document.querySelectorAll(".testimonial").length;

		function goToSlide(index) {
			if (index < 0) {
				index = slideCount - 1;
			} else if (index >= slideCount) {
				index = 0;
			}

			track.style.transform = `translateX(-${index * 100}%)`;

			// Update dots
			dots.forEach((dot) => dot.classList.remove("active"));
			dots[index].classList.add("active");

			currentSlide = index;
		}

		if (prevBtn) {
			prevBtn.addEventListener("click", () => {
				goToSlide(currentSlide - 1);
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", () => {
				goToSlide(currentSlide + 1);
			});
		}

		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				goToSlide(index);
			});
		});

		// Auto slide testimonials
		setInterval(() => {
			goToSlide(currentSlide + 1);
		}, 5000);
	}

	// Utilities
function isValidEmailFormat(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

function isDisposableEmail(email) {
	const domain = email.split("@")[1].toLowerCase();
	const bannedDomains = [
		"mailinator.com", "10minutemail.com", "tempmail.com", "guerrillamail.com",
		"yopmail.com", "dispostable.com", "fakeinbox.com", "trashmail.com"
	];
	return bannedDomains.includes(domain);
}

// Form submission logic
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

if (contactForm) {
	contactForm.addEventListener("submit", async function (e) {
		e.preventDefault();

		const name = document.getElementById("name").value.trim();
		const email = document.getElementById("email").value.trim();
		const subject = document.getElementById("subject").value.trim();
		const message = document.getElementById("message").value.trim();

		// ✅ Email Validation
		if (!isValidEmailFormat(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		if (isDisposableEmail(email)) {
			alert("Temporary or disposable emails are not allowed. Use a valid email.");
			return;
		}

		// ✅ Proceed to send message
		try {
			const response = await fetch("https://formspree.io/f/xvgrzadr", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ name, email, subject, message }),
			});

			if (response.ok) {
				successMessage.style.display = "block";
				successMessage.style.opacity = "1";

				setTimeout(() => {
					successMessage.style.opacity = "0";
					setTimeout(() => {
						successMessage.style.display = "none";
					}, 1000);
				}, 4000);

				contactForm.reset();
			} else {
				alert("Oops! Something went wrong. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("Failed to send message. Check your internet or try again later.");
		}
	});
}


	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const navbarHeight =
					document.querySelector(".navbar")?.offsetHeight || 0;
				const targetPosition =
					targetElement.getBoundingClientRect().top +
					window.pageYOffset -
					navbarHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// Section animations on scroll
	const sections = document.querySelectorAll("section");

	// Set initial state for all sections (except hero)
	sections.forEach((section) => {
		if (!section.classList.contains("hero")) {
			section.style.opacity = "0";
			section.style.transform = "translateY(30px)";
			section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
		}
	});

	// Function to check if element is in viewport
	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top <=
			(window.innerHeight || document.documentElement.clientHeight) * 0.85
		);
	}

	// Function to animate sections when they come into view
	function animateSections() {
		sections.forEach((section) => {
			if (isInViewport(section) && section.style.opacity === "0") {
				section.style.opacity = "1";
				section.style.transform = "translateY(0)";

				// Add specific animation classes based on section type
				if (section.classList.contains("about")) {
					section.classList.add("fade-in");
				} else if (section.classList.contains("services")) {
					section.classList.add("slide-up");
				} else if (section.classList.contains("process")) {
					section.classList.add("fade-in");
				} else if (section.classList.contains("portfolio")) {
					section.classList.add("slide-up");
				} else if (section.classList.contains("testimonials")) {
					section.classList.add("fade-in");
				} else if (section.classList.contains("why_us")) {
					section.classList.add("slide-up");
				} else if (section.classList.contains("contact")) {
					section.classList.add("fade-in");
				}

				// Animate children with staggered delay
				animateChildren(section);
			}
		});
	}

	// Function to animate children of a section with staggered delay
	function animateChildren(section) {
		// Define which children to animate based on section type
		let children = [];

		if (section.classList.contains("about")) {
			children = section.querySelectorAll(
				".about-intro, .about-image-container, .about-text, .values-section, .approach-section, .team-section"
			);
		} else if (section.classList.contains("services")) {
			children = section.querySelectorAll(".service-card");
		} else if (section.classList.contains("process")) {
			children = section.querySelectorAll(".process-step");
		} else if (section.classList.contains("portfolio")) {
			children = section.querySelectorAll(".portfolio-item");
		} else if (section.classList.contains("testimonials")) {
			children = section.querySelectorAll(".testimonial");
		} else if (section.classList.contains("why_us")) {
			children = section.querySelectorAll(".why_us-header, .comparison-table");
		} else if (section.classList.contains("contact")) {
			children = section.querySelectorAll(".contact-info, .contact-form");
		}

		// Apply staggered animations to children
		children.forEach((child, index) => {
			setTimeout(() => {
				child.style.opacity = "1";
				child.style.transform = "translateY(0)";
			}, 200 * (index + 1));
		});
	}

	// Set initial state for children elements
	sections.forEach((section) => {
		if (!section.classList.contains("hero")) {
			const children = section.querySelectorAll(
				".about-intro, .about-image-container, .about-text, .values-section, .approach-section, .team-section, .service-card, .process-step, .portfolio-item, .testimonial, .why_us-header, .comparison-table, .contact-info, .contact-form"
			);

			children.forEach((child) => {
				child.style.opacity = "0";
				child.style.transform = "translateY(20px)";
				child.style.transition = "opacity 0.6s ease, transform 0.6s ease";
			});
		}
	});

	// Check for animations on load and scroll
	window.addEventListener("load", animateSections);
	window.addEventListener("scroll", animateSections);

	// Add floating animation to specific elements
	const floatingElements = document.querySelectorAll(
		".experience-badge, .image-accent"
	);
	floatingElements.forEach((element) => {
		element.classList.add("float");
	});

	// Add specific animations to value cards
	const valueCards = document.querySelectorAll(".value-card");
	valueCards.forEach((card, index) => {
		card.style.transitionDelay = `${index * 0.2}s`;
	});

	// Add specific animations to team members
	const teamMembers = document.querySelectorAll(".team-member");
	teamMembers.forEach((member, index) => {
		member.style.transitionDelay = `${index * 0.2}s`;
	});
});

// Typewriter Effect
document.addEventListener("DOMContentLoaded", function () {
	const heroTitle = document.querySelector(".hero-content h1");
	if (heroTitle) {
		const texts = [
			"Creative Branding.",
			"Effective Strategy.",
			"Engaging Socials.",
		];

		let index = 0;
		let currentText = "";
		let currentChar = 0;
		let isDeleting = false;
		let speed = 50; // typing speed
		let eraseSpeed = 25; // deleting speed

		function type() {
			const text = texts[index];
			if (!isDeleting) {
				currentText = text.substring(0, currentChar + 1);
				currentChar++;
			} else {
				currentText = text.substring(0, currentChar - 1);
				currentChar--;
			}

			heroTitle.textContent = currentText;

			if (!isDeleting && currentChar === text.length) {
				// Wait for a moment before starting to delete
				setTimeout(() => {
					isDeleting = true;
				}, 600);
			} else if (isDeleting && currentChar === 0) {
				// Move to the next text
				isDeleting = false;
				index = (index + 1) % texts.length;
			}

			const typingSpeed = isDeleting ? eraseSpeed : speed;
			setTimeout(type, typingSpeed);
		}

		// Start typing effect when the page loads
		setTimeout(type, 1000); // Delay to allow hero fade-in first
	}
});

// Add scroll-triggered animations to specific elements
document.addEventListener("DOMContentLoaded", function () {
	// Function to check if element is in viewport with offset
	function isElementInViewport(el, offset = 0) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top <=
			(window.innerHeight || document.documentElement.clientHeight) *
				(1 - offset)
		);
	}

	// Function to handle scroll animations
	function handleScrollAnimations() {
		// Animate section headers when they come into view
		const sectionHeaders = document.querySelectorAll(".section-header");
		sectionHeaders.forEach((header) => {
			if (
				isElementInViewport(header, 0.2) &&
				!header.classList.contains("animated")
			) {
				header.classList.add("animated", "fade-in");

				// Animate the h2 and p separately with delay
				const h2 = header.querySelector("h2");
				const p = header.querySelector("p");

				if (h2) {
					h2.style.opacity = "0";
					h2.style.transform = "translateY(20px)";
					h2.style.transition = "opacity 0.6s ease, transform 0.6s ease";

					setTimeout(() => {
						h2.style.opacity = "1";
						h2.style.transform = "translateY(0)";
					}, 200);
				}

				if (p) {
					p.style.opacity = "0";
					p.style.transform = "translateY(20px)";
					p.style.transition = "opacity 0.6s ease, transform 0.6s ease";

					setTimeout(() => {
						p.style.opacity = "1";
						p.style.transform = "translateY(0)";
					}, 400);
				}
			}
		});

		// Animate value cards with staggered effect
		const valueCards = document.querySelectorAll(".value-card");
		let delay = 0;

		valueCards.forEach((card) => {
			if (
				isElementInViewport(card, 0.1) &&
				!card.classList.contains("animated")
			) {
				card.classList.add("animated");

				card.style.opacity = "0";
				card.style.transform = "translateY(30px)";
				card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

				setTimeout(() => {
					card.style.opacity = "1";
					card.style.transform = "translateY(0)";
				}, delay);

				delay += 200;
			}
		});

		// Animate approach steps with staggered effect
		const approachSteps = document.querySelectorAll(".approach-step");
		delay = 0;

		approachSteps.forEach((step) => {
			if (
				isElementInViewport(step, 0.1) &&
				!step.classList.contains("animated")
			) {
				step.classList.add("animated");

				step.style.opacity = "0";
				step.style.transform = "translateX(-30px)";
				step.style.transition = "opacity 0.6s ease, transform 0.6s ease";

				setTimeout(() => {
					step.style.opacity = "1";
					step.style.transform = "translateX(0)";
				}, delay);

				delay += 200;
			}
		});

		// Animate stats with count-up effect
		const statNumbers = document.querySelectorAll(".stat-number");
		statNumbers.forEach((stat) => {
			if (
				isElementInViewport(stat, 0.2) &&
				!stat.classList.contains("animated")
			) {
				stat.classList.add("animated");

				const finalValue = parseInt(stat.textContent);
				let startValue = 0;
				const duration = 2000; // 2 seconds
				const increment = Math.ceil(finalValue / (duration / 50)); // Update every 50ms

				function updateCount() {
					startValue += increment;
					if (startValue > finalValue) {
						startValue = finalValue;
					}
					stat.textContent = startValue;

					if (startValue < finalValue) {
						requestAnimationFrame(updateCount);
					}
				}

				requestAnimationFrame(updateCount);
			}
		});
	}

	// Run on load and scroll
	window.addEventListener("load", handleScrollAnimations);
	window.addEventListener("scroll", handleScrollAnimations);
});

document.addEventListener("DOMContentLoaded", function () {
	// Hero section animations
	const heroSection = document.querySelector(".hero");
	const heroImages = document.querySelectorAll(".hero-image");
	const accentCircles = document.querySelectorAll(".image-accent-circle");

	// Function to add parallax effect to hero images
	function parallaxEffect() {
		if (window.innerWidth > 768) {
			// Only on larger screens
			window.addEventListener("mousemove", function (e) {
				const x = e.clientX / window.innerWidth;
				const y = e.clientY / window.innerHeight;

				heroImages.forEach((image, index) => {
					const speed = 0.03 + index * 0.01;
					const xOffset = (x - 0.5) * speed * 100;
					const yOffset = (y - 0.5) * speed * 100;

					image.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
				});

				accentCircles.forEach((circle, index) => {
					const speed = 0.05 + index * 0.02;
					const xOffset = (x - 0.5) * speed * 100;
					const yOffset = (y - 0.5) * speed * 100;

					circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
				});
			});
		}
	}

	// Initialize parallax effect
	parallaxEffect();

	// Reset transforms on window resize
	window.addEventListener("resize", function () {
		heroImages.forEach((image) => {
			image.style.transform = "";
		});

		accentCircles.forEach((circle) => {
			circle.style.transform = "";
		});

		// Re-initialize parallax effect
		parallaxEffect();
	});

	// Add scroll animation for hero section
	function heroScrollEffect() {
		const scrollPosition = window.scrollY;

		if (scrollPosition > 0) {
			const opacity = 1 - scrollPosition / 500;
			heroSection.style.opacity = opacity > 0 ? opacity : 0;

			// Parallax scroll effect
			heroImages.forEach((image, index) => {
				const speed = 0.2 + index * 0.1;
				image.style.transform = `translateY(${scrollPosition * speed}px)`;
			});
		} else {
			heroSection.style.opacity = 1;
			heroImages.forEach((image) => {
				image.style.transform = "";
			});
		}
	}

	// Apply scroll effect
	window.addEventListener("scroll", heroScrollEffect);
});

document.addEventListener("DOMContentLoaded", function () {
	// Get hero images
	const heroImages = document.querySelectorAll(".hero-image");
	const heroSection = document.querySelector(".hero");

	// Add 3D tilt effect to hero images
	heroImages.forEach((image) => {
		image.addEventListener("mousemove", function (e) {
			const rect = this.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const xPercent = x / rect.width - 0.5;
			const yPercent = y / rect.height - 0.5;

			const rotateX = yPercent * -10; // Rotate around X-axis
			const rotateY = xPercent * 10; // Rotate around Y-axis

			this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) rotate(var(--rotation))`;
		});

		// Reset transform on mouse leave
		image.addEventListener("mouseleave", function () {
			this.style.transform = `rotate(var(--rotation))`;
		});

		// Add click event to show image in larger view
		image.addEventListener("click", function () {
			// Get the image source
			const imgSrc = this.querySelector("img").src;

			// Create modal elements
			const modal = document.createElement("div");
			modal.classList.add("image-modal");
			modal.style.position = "fixed";
			modal.style.top = "0";
			modal.style.left = "0";
			modal.style.width = "100%";
			modal.style.height = "100%";
			modal.style.backgroundColor = "rgba(0, 21, 41, 0.9)";
			modal.style.display = "flex";
			modal.style.justifyContent = "center";
			modal.style.alignItems = "center";
			modal.style.zIndex = "9999";
			modal.style.opacity = "0";
			modal.style.transition = "opacity 0.3s ease";

			const modalImg = document.createElement("img");
			modalImg.src = imgSrc;
			modalImg.style.maxWidth = "90%";
			modalImg.style.maxHeight = "90%";
			modalImg.style.borderRadius = "8px";
			modalImg.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
			modalImg.style.transform = "scale(0.9)";
			modalImg.style.transition = "transform 0.3s ease";

			const closeBtn = document.createElement("button");
			closeBtn.innerHTML = "&times;";
			closeBtn.style.position = "absolute";
			closeBtn.style.top = "20px";
			closeBtn.style.right = "20px";
			closeBtn.style.background = "none";
			closeBtn.style.border = "none";
			closeBtn.style.color = "white";
			closeBtn.style.fontSize = "2rem";
			closeBtn.style.cursor = "pointer";

			// Append elements to modal
			modal.appendChild(modalImg);
			modal.appendChild(closeBtn);
			document.body.appendChild(modal);

			// Show modal with animation
			setTimeout(() => {
				modal.style.opacity = "1";
				modalImg.style.transform = "scale(1)";
			}, 10);

			// Close modal on button click
			closeBtn.addEventListener("click", function () {
				modal.style.opacity = "0";
				setTimeout(() => {
					document.body.removeChild(modal);
				}, 300);
			});

			// Close modal on background click
			modal.addEventListener("click", function (e) {
				if (e.target === modal) {
					modal.style.opacity = "0";
					setTimeout(() => {
						document.body.removeChild(modal);
					}, 300);
				}
			});
		});
	});

	// Parallax effect for hero section on scroll
	window.addEventListener("scroll", function () {
		const scrollPosition = window.scrollY;

		if (scrollPosition < window.innerHeight) {
			const parallaxSpeed = 0.5;
			heroSection.style.backgroundPositionY = `${
				scrollPosition * parallaxSpeed
			}px`;

			// Move images at different speeds
			heroImages.forEach((image, index) => {
				const speed = 0.1 * (index + 1);
				const yPos = scrollPosition * speed;
				image.style.transform = `translateY(${yPos}px) rotate(var(--rotation))`;
			});
		}
	});

	// Add random subtle movements to images
	function addRandomMovement() {
		heroImages.forEach((image, index) => {
			const randomX = (Math.random() - 0.5) * 5;
			const randomY = (Math.random() - 0.5) * 5;
			const randomRotate = (Math.random() - 0.5) * 2;
			const delay = index * 0.2;

			image.style.transition = `transform 3s ease ${delay}s`;
			image.style.transform = `translate(${randomX}px, ${randomY}px) rotate(calc(var(--rotation) + ${randomRotate}deg))`;

			setTimeout(() => {
				image.style.transform = `rotate(var(--rotation))`;
			}, 3000 + delay * 1000);
		});

		// Repeat the movement every 6 seconds
		setTimeout(addRandomMovement, 6000);
	}

	// Start random movements after initial load
	setTimeout(addRandomMovement, 2000);
});
