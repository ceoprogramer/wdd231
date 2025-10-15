
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    const summaryDetails = document.getElementById('summaryDetails');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationDetails = document.getElementById('confirmationDetails');
    const closeBtn = document.querySelector('.close');
    const printBtn = document.getElementById('printConfirmation');
    const newReservationBtn = document.getElementById('newReservation');
    
    // Tour data with pricing information
    const tourData = {
        'china_great_wall': { name: 'Great Wall of China', price: 40, duration: '1 day' },
        'india_taj_mahal': { name: 'Taj Mahal', price: 15, duration: '1 day' },
        'south_korea_jeju': { name: 'Jeju Island', price: 60, duration: '1 day' },
        'japan_kyoto': { name: 'Kyoto Temples', price: 8, duration: '2 days' },
        'thailand_phi_phi': { name: 'Phi Phi Islands', price: 25, duration: '2 days' },
        'nepal_everest': { name: 'Everest Base Camp', price: 500, duration: '2 days' },
        'vietnam_ha_long': { name: 'Ha Long Bay Cruise', price: 37, duration: '3 days' },
        'singapore_tour': { name: 'Singapore City Tour', price: 45, duration: '1 day' },
        'south_korea_seoul': { name: 'Seoul Palace Tour', price: 5, duration: '1 day' },
        'france_paris': { name: 'Paris City Tour', price: 120, duration: '1 day' },
        'italy_rome': { name: 'Rome & Vatican Tour', price: 180, duration: '2 days' },
        'spain_barcelona': { name: 'Barcelona Architecture', price: 90, duration: '1 day' },
        'uk_london': { name: 'London Highlights', price: 110, duration: '1 day' },
        'switzerland_lucerne': { name: 'Lucerne & Pilatus', price: 150, duration: '1 day' },
        'greece_athens': { name: 'Athens & Sounion', price: 95, duration: '1 day' },
        'usa_nyc': { name: 'New York City Tour', price: 130, duration: '1 day' },
        'canada_niagara': { name: 'Niagara Falls', price: 90, duration: '1 day' },
        'mexico_cabo': { name: 'Los Cabos Arch', price: 95, duration: '1 day' },
        'usa_vegas': { name: 'Las Vegas Tour', price: 95, duration: '1 day' },
        'usa_san_francisco': { name: 'San Francisco Tour', price: 120, duration: '1 day' },
        'mexico_cancun': { name: 'Cancún Cruise', price: 85, duration: '1 day' },
        'usa_grand_canyon': { name: 'Grand Canyon', price: 160, duration: '1 day' },
        'canada_banff': { name: 'Banff National Park', price: 140, duration: '1 day' },
        'mexico_chichen': { name: 'Chichén Itzá', price: 75, duration: '1 day' },
        'peru_machu_picchu': { name: 'Machu Picchu', price: 250, duration: '2 days' },
        'brazil_rio': { name: 'Rio de Janeiro', price: 120, duration: '1 day' },
        'argentina_buenos_aires': { name: 'Buenos Aires', price: 90, duration: '1 day' },
        'chile_santiago': { name: 'Santiago & Valparaíso', price: 110, duration: '1 day' },
        'ecuador_galapagos': { name: 'Galápagos Islands', price: 950, duration: '5 days' },
        'colombia_cartagena': { name: 'Cartagena', price: 95, duration: '1 day' }
    };
    
    // Additional services pricing
    const servicesPricing = {
        'travel_insurance': 50,
        'airport_transfer': 30,
        'meal_plan': 75,
        'guided_tours': 100
    };
    
    // Update summary when form changes
    reservationForm.addEventListener('input', updateSummary);
    reservationForm.addEventListener('change', updateSummary);
    
    // Form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            showConfirmation();
        }
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === confirmationModal) {
            closeModal();
        }
    });
    
    // Print confirmation
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // New reservation
    newReservationBtn.addEventListener('click', function() {
        closeModal();
        reservationForm.reset();
        updateSummary();
    });
    
    // Update reservation summary
    function updateSummary() {
        const formData = new FormData(reservationForm);
        const destination = formData.get('destination');
        const travelers = parseInt(formData.get('travelers')) || 0;
        const services = formData.getAll('services');
        
        if (!destination) {
            summaryDetails.innerHTML = '<p>Complete the form to see your reservation details and estimated cost.</p>';
            return;
        }
        
        const tour = tourData[destination];
        let total = tour.price * travelers;
        
        // Add services cost
        services.forEach(service => {
            if (servicesPricing[service]) {
                total += servicesPricing[service] * travelers;
            }
        });
        
        // Calculate duration
        const departureDate = new Date(formData.get('departureDate'));
        const returnDate = new Date(formData.get('returnDate'));
        const nights = returnDate && departureDate ? Math.ceil((returnDate - departureDate) / (1000 * 60 * 60 * 24)) : 0;
        
        summaryDetails.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Destination:</span>
                <span class="summary-value">${tour.name}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Duration:</span>
                <span class="summary-value">${tour.duration}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Travelers:</span>
                <span class="summary-value">${travelers}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Tour Cost:</span>
                <span class="summary-value">$${tour.price} × ${travelers} = $${tour.price * travelers}</span>
            </div>
            ${services.length > 0 ? `
            <div class="summary-item">
                <span class="summary-label">Additional Services:</span>
                <span class="summary-value">$${calculateServicesTotal(services, travelers)}</span>
            </div>
            ` : ''}
            <div class="summary-total">
                <span class="summary-label">Estimated Total:</span>
                <span class="summary-value">$${total}</span>
            </div>
        `;
    }
    
    // Calculate services total
    function calculateServicesTotal(services, travelers) {
        let total = 0;
        services.forEach(service => {
            if (servicesPricing[service]) {
                total += servicesPricing[service] * travelers;
            }
        });
        return total;
    }
    
    // Validate form
    function validateForm() {
        const requiredFields = reservationForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Validate dates
        const departureDate = new Date(document.getElementById('departureDate').value);
        const returnDate = new Date(document.getElementById('returnDate').value);
        
        if (returnDate && departureDate && returnDate <= departureDate) {
            alert('Return date must be after departure date.');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show confirmation modal
    function showConfirmation() {
        const formData = new FormData(reservationForm);
        const destination = formData.get('destination');
        const travelers = formData.get('travelers');
        const services = formData.getAll('services');
        const tour = tourData[destination];
        
        let total = tour.price * parseInt(travelers);
        const servicesTotal = calculateServicesTotal(services, parseInt(travelers));
        total += servicesTotal;
        
        confirmationDetails.innerHTML = `
            <div class="confirmation-item">
                <strong>Name:</strong> ${formData.get('firstName')} ${formData.get('lastName')}
            </div>
            <div class="confirmation-item">
                <strong>Email:</strong> ${formData.get('email')}
            </div>
            <div class="confirmation-item">
                <strong>Phone:</strong> ${formData.get('phone')}
            </div>
            <div class="confirmation-item">
                <strong>Destination:</strong> ${tour.name}
            </div>
            <div class="confirmation-item">
                <strong>Travel Dates:</strong> ${formData.get('departureDate')} to ${formData.get('returnDate')}
            </div>
            <div class="confirmation-item">
                <strong>Travelers:</strong> ${travelers}
            </div>
            <div class="confirmation-item">
                <strong>Room Type:</strong> ${formData.get('roomType')}
            </div>
            ${services.length > 0 ? `
            <div class="confirmation-item">
                <strong>Additional Services:</strong> ${services.map(service => getServiceName(service)).join(', ')}
            </div>
            ` : ''}
            <div class="confirmation-item total">
                <strong>Estimated Total:</strong> $${total}
            </div>
        `;
        
        confirmationModal.style.display = 'block';
    }
    
    // Get service name for display
    function getServiceName(serviceKey) {
        const serviceNames = {
            'travel_insurance': 'Travel Insurance',
            'airport_transfer': 'Airport Transfer',
            'meal_plan': 'Full Meal Plan',
            'guided_tours': 'Additional Guided Tours'
        };
        return serviceNames[serviceKey] || serviceKey;
    }
    
    // Close modal
    function closeModal() {
        confirmationModal.style.display = 'none';
    }
    
    // Initialize summary
    updateSummary();
});