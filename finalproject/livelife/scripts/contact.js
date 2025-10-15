
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactModal = document.getElementById('contactModal');
    const contactConfirmationDetails = document.getElementById('contactConfirmationDetails');
    const closeBtn = document.querySelector('#contactModal .close');
    const closeContactModalBtn = document.getElementById('closeContactModal');
    const newContactMessageBtn = document.getElementById('newContactMessage');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateContactForm()) {
            showContactConfirmation();
        }
    });
    
    // FAQ Accordion functionality
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current answer
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            icon.className = answer.style.display === 'block' ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            
            // Close other answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    otherAnswer.style.display = 'none';
                    otherIcon.className = 'fas fa-chevron-down';
                }
            });
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeContactModal);
    closeContactModalBtn.addEventListener('click', closeContactModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            closeContactModal();
        }
    });
    
    // New message
    newContactMessageBtn.addEventListener('click', function() {
        closeContactModal();
        contactForm.reset();
    });
    
    // Validate contact form
    function validateContactForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Validate email format
        const emailField = document.getElementById('contactEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = 'red';
            alert('Please enter a valid email address.');
        }
        
        return isValid;
    }
    
    // Show contact confirmation
    function showContactConfirmation() {
        const formData = new FormData(contactForm);
        
        // Get subject display name
        const subjectDisplay = getSubjectDisplay(formData.get('subject'));
        
        // Get destination display name
        const destinationDisplay = getDestinationDisplay(formData.get('destination'));
        
        contactConfirmationDetails.innerHTML = `
            <div class="confirmation-item">
                <strong>Name:</strong> ${formData.get('firstName')} ${formData.get('lastName')}
            </div>
            <div class="confirmation-item">
                <strong>Email:</strong> ${formData.get('email')}
            </div>
            ${formData.get('phone') ? `
            <div class="confirmation-item">
                <strong>Phone:</strong> ${formData.get('phone')}
            </div>
            ` : ''}
            <div class="confirmation-item">
                <strong>Subject:</strong> ${subjectDisplay}
            </div>
            ${destinationDisplay ? `
            <div class="confirmation-item">
                <strong>Destination Interest:</strong> ${destinationDisplay}
            </div>
            ` : ''}
            <div class="confirmation-item">
                <strong>Message:</strong> ${formData.get('message').substring(0, 100)}...
            </div>
            ${formData.get('newsletter') ? `
            <div class="confirmation-item">
                <strong>Newsletter:</strong> Subscribed
            </div>
            ` : ''}
        `;
        
        contactModal.style.display = 'block';
        
     
        console.log('Contact form submitted:', {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            destination: formData.get('destination'),
            message: formData.get('message'),
            newsletter: formData.get('newsletter')
        });
    }
    
    // Get subject display name
    function getSubjectDisplay(subjectKey) {
        const subjectNames = {
            'general': 'General Inquiry',
            'booking': 'Booking Assistance',
            'custom': 'Custom Itinerary',
            'group': 'Group Travel',
            'complaint': 'Complaint',
            'partnership': 'Partnership',
            'other': 'Other'
        };
        return subjectNames[subjectKey] || subjectKey;
    }
    
    // Get destination display name
    function getDestinationDisplay(destinationKey) {
        const destinationNames = {
            'china': 'China',
            'japan': 'Japan',
            'thailand': 'Thailand',
            'south_korea': 'South Korea',
            'vietnam': 'Vietnam',
            'france': 'France',
            'italy': 'Italy',
            'spain': 'Spain',
            'uk': 'United Kingdom',
            'greece': 'Greece',
            'usa': 'United States',
            'canada': 'Canada',
            'mexico': 'Mexico',
            'peru': 'Peru',
            'brazil': 'Brazil',
            'argentina': 'Argentina',
            'chile': 'Chile'
        };
        return destinationNames[destinationKey] || '';
    }
    
    // Close contact modal
    function closeContactModal() {
        contactModal.style.display = 'none';
    }
});