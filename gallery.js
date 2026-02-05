// Stores the currently selected filter category
let currentFilter = 'all';

// Filters video cards based on the selected category

function filterVideos(category) {
    currentFilter = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
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
    
    const resultsInfo = document.getElementById('resultsInfo');
    if (category !== 'all') {
        resultsInfo.textContent = `Showing ${visibleCount} destination${visibleCount !== 1 ? 's' : ''}`;
    } else {
        resultsInfo.textContent = '';
    }
}

// Opens the video modal and loads the selected video
 function openModal(element) {
    const title = element.querySelector('.video-title').textContent;
    const description = element.querySelector('.video-description').textContent;
    const videoUrl = element.querySelector('.video-data').getAttribute('data-url');

   
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalIframe').src = videoUrl;
    
    
    const youtubeUrl = videoUrl.includes('embed/') 
        ? videoUrl.replace('/embed/', '/watch?v=').split('?')[0] + '?v=' + videoUrl.split('/embed/')[1].split('?')[0]
        : videoUrl;
    document.getElementById('youtubeLink').href = youtubeUrl;
    
    
    document.getElementById('videoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

//Closes the video modal and stops the video playback
function closeModal() {
    document.getElementById('videoModal').classList.remove('active');
    document.getElementById('modalIframe').src = '';
    document.body.style.overflow = 'auto';
}

//Closes the modal when clicking outside of its content area
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

//Closes the modal when the Escape key is pressed
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    const resultsInfo = document.getElementById('resultsInfo');
    if (resultsInfo) {
        resultsInfo.textContent = '';
    }
    
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    console.log('Gallery system initialized successfully');
});
