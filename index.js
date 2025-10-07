// Wait for DOM content to be loaded
    document.addEventListener('DOMContentLoaded', function() {
      // Preloader - Faster loading
      setTimeout(function() {
        document.querySelector('.preloader').classList.add('hide');
      }, 600); // Reduced from 2500ms to 600ms
      
      // Initialize AOS (Animation On Scroll) - Faster animations
      AOS.init({
        duration: 500, // Reduced from 1000ms to 500ms
        easing: 'ease-out',
        once: true,
        mirror: false,
        offset: 50 // Start animation earlier
      });
      
      // Initialize GLightbox (Gallery)
      const lightbox = GLightbox({
        selector: '[data-gallery="gallery-images"]',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
      
      // Initialize Swiper sliders
      
      // Hero Slider
      const heroSwiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });

      // Theme Toggle
      const toggleBtn = document.getElementById("theme-toggle");
      const body = document.body;

      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          body.classList.toggle("dark-theme");
          
          if (body.classList.contains("dark-theme")) {
            toggleBtn.textContent = "☀️ Light";
          } else {
            toggleBtn.textContent = "🌙 Dark";
          }
        });
      }
  
      // Initialize Service Sliders with slower timing
      const serviceSliders = document.querySelectorAll('.service-slider');
      serviceSliders.forEach(slider => {
        new Swiper(slider, {
          slidesPerView: 1,
          loop: true,
          speed: 1000, // Smooth transition speed (1 second)
          autoplay: { 
            delay: 5000, // Wait 5 seconds before changing slides
            disableOnInteraction: false 
          },
          pagination: {
            el: slider.querySelector('.swiper-pagination'),
            clickable: true,
          },
        });
      });

      
      // Testimonial Slider
      const testimonialSwiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.testimonial-slider .swiper-pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }
      });
      
      // Mobile Navigation Toggle
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('navMenu');
      
      hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
      
      // Close mobile nav when clicking on a nav item
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navMenu.classList.remove('active');
          const icon = hamburger.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        });
      });
      
      // Active Navigation Link on Scroll
      window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY + 100;
        
        // Add scrolled class to header
        const header = document.getElementById('header');
        if (scrollPosition > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        const backToTop = document.getElementById('backToTop');
        if (scrollPosition > 1000) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
        
        // Highlight active nav link
        document.querySelectorAll('section').forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.remove('active');
            });
            
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
          }
        });
      });
      
      // Back to Top Button
      const backToTop = document.getElementById('backToTop');
      backToTop.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Services Tabs - Fixed to properly handle slider updates
      const serviceTabs = document.querySelectorAll('.service-tab');
      const serviceContents = document.querySelectorAll('.service-content');
      
      serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const tabId = tab.getAttribute('data-tab');
          
          // Remove active class from all tabs
          serviceTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          
          // Show/hide content and update sliders
          serviceContents.forEach(content => {
            content.classList.remove('active');
            if (content.getAttribute('data-tab-content') === tabId) {
              content.classList.add('active');
              
              // Update the slider in the newly active tab
              setTimeout(() => {
                const activeSlider = content.querySelector('.service-slider');
                if (activeSlider && activeSlider.swiper) {
                  activeSlider.swiper.update();
                  activeSlider.swiper.slideTo(0);
                }
              }, 100);
            }
          });
        });
      });
      
      // Gallery Filter
      const galleryFilters = document.querySelectorAll('.gallery-filter');
      const galleryItems = document.querySelectorAll('.gallery-item');
      
      galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
          galleryFilters.forEach(filter => filter.classList.remove('active'));
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-filter');
          
          galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 100);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
      

// WhatsApp Contact Form Submission

   document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("contactName").value;
  let email = document.getElementById("contactEmail").value;
  let subject = document.getElementById("contactSubject").value;
  let message = document.getElementById("contactMessage").value;

  // 🔹 Replace with your WhatsApp number (with country code, no + or spaces)
  let phoneNumber = "254703902829"; 

  let whatsappMessage = `Full Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

  let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(url, "_blank");
});

      // Form Submission - Booking Form
      const appointmentForm = document.getElementById('appointmentForm');
      const confirmationModal = document.getElementById('confirmationModal');
      const closeModalBtn = document.getElementById('closeModal');
      const modalOkBtn = document.getElementById('modalOkBtn');
      
      if (appointmentForm) {
        // Load saved form data from localStorage if it exists
        const savedBookingData = localStorage.getItem('bookingFormData');
        if (savedBookingData) {
          const formData = JSON.parse(savedBookingData);
          
          // Fill the form with saved data
          Object.keys(formData).forEach(key => {
            const input = appointmentForm.querySelector(`[name="${key}"]`);
            if (input) {
              input.value = formData[key];
            }
          });
        }

// WhatsApp Integration for Booking Form
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent normal form submission

  // Get form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const notes = document.getElementById("notes").value;

  // Your WhatsApp Business number (with country code, no + or spaces)
  const businessNumber = "254703902829"; // Replace with your number

  // Create WhatsApp message
  const message = `Hello, I’d like to book an appointment:%0A
Name: ${name}%0A
Phone: ${phone}%0A
Service: ${service}%0A
Date: ${date}%0A
Time: ${time}%0A
Notes: ${notes}`;

  // Redirect to WhatsApp
  window.open(`https://wa.me/${businessNumber}?text=${message}`, "_blank");
});

        
        // Save form data to localStorage as user types
        appointmentForm.querySelectorAll('.form-control').forEach(input => {
          input.addEventListener('input', function() {
            saveFormToLocalStorage();
          });
        });
        
        appointmentForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const name = appointmentForm.querySelector('[name="name"]').value;
          const phone = appointmentForm.querySelector('[name="phone"]').value;
          const service = appointmentForm.querySelector('[name="service"]').value;
          const date = appointmentForm.querySelector('[name="date"]').value;
          const time = appointmentForm.querySelector('[name="time"]').value;
          const notes = appointmentForm.querySelector('[name="notes"]').value;
          
          // Form validation
          if (!name || !phone || !service || !date || !time) {
            alert('Please fill in all required fields.');
            return;
          }
          
          // Show confirmation modal
          confirmationModal.classList.add('show');
          
          // Clear localStorage after successful submission
          localStorage.removeItem('bookingFormData');
          
          // Reset form
          appointmentForm.reset();
        });
        
        // Modal close button
        closeModalBtn.addEventListener('click', function() {
          confirmationModal.classList.remove('show');
        });
        
        modalOkBtn.addEventListener('click', function() {
          confirmationModal.classList.remove('show');
        });
        
        // Save form data to localStorage
        function saveFormToLocalStorage() {
          const formData = {
            name: appointmentForm.querySelector('[name="name"]').value,
            phone: appointmentForm.querySelector('[name="phone"]').value,
            service: appointmentForm.querySelector('[name="service"]').value,
            date: appointmentForm.querySelector('[name="date"]').value,
            time: appointmentForm.querySelector('[name="time"]').value,
            notes: appointmentForm.querySelector('[name="notes"]').value
          };
          
          localStorage.setItem('bookingFormData', JSON.stringify(formData));
        }
      }
      
      // Contact Form Submission
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const name = contactForm.querySelector('[name="name"]').value;
          const email = contactForm.querySelector('[name="email"]').value;
          const subject = contactForm.querySelector('[name="subject"]').value;
          const message = contactForm.querySelector('[name="message"]').value;
          
          // Form validation
          if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
          }
          
          // Show confirmation
          alert('Thank you for your message. We will get back to you soon!');
          
          // Reset form
          contactForm.reset();
        });
      }
      
      // PWA Installation
      let deferredPrompt;
      const pwaInstall = document.getElementById('pwaInstall');
      const pwaInstallBtn = document.getElementById('pwaInstallBtn');
      const pwaCloseBtn = document.getElementById('pwaCloseBtn');
      
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show the install banner
        setTimeout(() => {
          pwaInstall.classList.add('show');
        }, 10000); // Show after 10 seconds
      });
      
      pwaInstallBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show the installation prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // We no longer need the prompt. Clear it up.
        deferredPrompt = null;
        // Hide the install banner
        pwaInstall.classList.remove('show');
      });
      
      pwaCloseBtn.addEventListener('click', () => {
        pwaInstall.classList.remove('show');
        // Store in localStorage that user dismissed the banner
        localStorage.setItem('pwaInstallDismissed', 'true');
      });
      
      // Check if user already dismissed the PWA banner
      if (localStorage.getItem('pwaInstallDismissed')) {
        pwaInstall.classList.remove('show');
      }
      
      // Register Service Worker for PWA
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered with scope:', registration.scope);
          }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
          });
        });
      }
    });