// Main JavaScript file for English School website

document.addEventListener('DOMContentLoaded', function() {
    // Sticky header functionality
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'white';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for(let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = form.querySelector('input[type="email"]');
                const email = emailInput.value;
                
                if (!email || !isValidEmail(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // In a real application, you would send this data to a server
                console.log('Newsletter subscription:', email);
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                
                // Reset form
                form.reset();
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    navLinks.forEach(link => {
        if (link.hash && link.hash !== '') {
            link.addEventListener('click', function(e) {
                // Only prevent default if the link is to an anchor on the current page
                if (link.pathname === window.location.pathname) {
                    e.preventDefault();
                    
                    const targetId = link.hash.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
    
    // Active nav link highlighting
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            const headerHeight = header.offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    setActiveNavLink();
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
