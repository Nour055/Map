// Gallery Video System - JavaScript
// Compatible with harmonized HTML structure

let currentFilter = 'all';

/**
 * Filter videos by category
 * @param {string} category - The category to filter by ('all', 'beach', 'unesco', 'desert', 'nature', 'culture', 'history')
 */
function filterVideos(category) {
    currentFilter = category;
    
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter video cards
    const cards = document.querySelectorAll('.video-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results counter
    const resultsInfo = document.getElementById('resultsInfo');
    if (category !== 'all') {
        resultsInfo.textContent = `Showing ${visibleCount} destination${visibleCount !== 1 ? 's' : ''}`;
    } else {
        resultsInfo.textContent = '';
    }
}

/**
 * Open video modal with destination details
 * @param {HTMLElement} element - The video card element that was clicked
 */
function openModal(element) {
    const title = element.querySelector('.video-title').textContent;
    const description = element.querySelector('.video-description').textContent;
    const videoUrl = element.querySelector('.video-data').getAttribute('data-url');

    // Populate modal with video information
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalIframe').src = videoUrl;
    
    // Convert embed URL to watch URL for YouTube link
    const youtubeUrl = videoUrl.includes('embed/') 
        ? videoUrl.replace('/embed/', '/watch?v=').split('?')[0] + '?v=' + videoUrl.split('/embed/')[1].split('?')[0]
        : videoUrl;
    document.getElementById('youtubeLink').href = youtubeUrl;
    
    // Show modal and prevent body scrolling
    document.getElementById('videoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close video modal and reset iframe
 */
function closeModal() {
    document.getElementById('videoModal').classList.remove('active');
    document.getElementById('modalIframe').src = '';
    document.body.style.overflow = 'auto';
}

/**
 * Smooth scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event Listeners

// Close modal when clicking outside content area
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial results info
    const resultsInfo = document.getElementById('resultsInfo');
    if (resultsInfo) {
        resultsInfo.textContent = '';
    }
    
    // Ensure all videos are visible on load
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    console.log('Gallery system initialized successfully');
});
