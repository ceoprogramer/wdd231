import { europe } from '../data/europe.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const toursGrid = document.getElementById('toursGrid');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const modal = document.getElementById('tourModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    
    let currentView = 'grid';
    
    // Display tours
    function displayTours(view = 'grid') {
        toursGrid.innerHTML = '';
        toursGrid.className = view === 'grid' ? 'tours-grid' : 'tours-list';
        
        europe.forEach(tour => {
            const tourElement = createTourElement(tour, view);
            toursGrid.appendChild(tourElement);
        });
    }
    
    // Create tour element based on view type
    function createTourElement(tour, view) {
        if (view === 'grid') {
            return createTourCard(tour);
        } else {
            return createTourListItem(tour);
        }
    }
    
    // Create grid card
    function createTourCard(tour) {
        const card = document.createElement('div');
        card.className = 'tour-card';
        card.innerHTML = `
            <img src="${tour.photo_url}" alt="${tour.attraction}">
            <div class="tour-info">
                <h3>${tour.attraction}</h3>
                <p><strong>Country:</strong> ${tour.country}</p>
                <p><strong>Duration:</strong> ${tour.trip_duration}</p>
                <p class="tour-price">$${tour.cost_usd_per_person} per person</p>
            </div>
        `;
        
        card.addEventListener('click', () => openModal(tour));
        return card;
    }
    
    // Create list item
    function createTourListItem(tour) {
        const item = document.createElement('div');
        item.className = 'tour-item';
        item.innerHTML = `
            <img src="${tour.photo_url}" alt="${tour.attraction}">
            <div class="tour-item-info">
                <h3>${tour.attraction}</h3>
                <p><strong>Country:</strong> ${tour.country}</p>
                <p><strong>Duration:</strong> ${tour.trip_duration}</p>
                <p>${tour.description.substring(0, 100)}...</p>
                <p class="tour-item-price">$${tour.cost_usd_per_person} per person</p>
            </div>
        `;
        
        item.addEventListener('click', () => openModal(tour));
        return item;
    }
    
    // Open modal with tour details
    function openModal(tour) {
        modalContent.innerHTML = `
            <img src="${tour.photo_url}" alt="${tour.attraction}" class="modal-tour-image">
            <div class="modal-tour-info">
                <h2>${tour.attraction}</h2>
                <p>${tour.description}</p>
                <div class="modal-tour-details">
                    <div class="detail-item">
                        <span class="detail-label">Country</span>
                        <span class="detail-value">${tour.country}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duration</span>
                        <span class="detail-value">${tour.trip_duration}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Price</span>
                        <span class="detail-value">$${tour.cost_usd_per_person} per person</span>
                    </div>
                </div>
                <a href="https://wa.me/15551234567?text=Hi! I'm interested in booking the ${tour.attraction} tour in ${tour.country}" class="whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i> Book via WhatsApp
                </a>
            </div>
        `;
        modal.style.display = 'block';
    }
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
    }
    
    // Event listeners
    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        displayTours('grid');
    });
    
    listViewBtn.addEventListener('click', () => {
        currentView = 'list';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        displayTours('list');
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Initialize
    displayTours();
});