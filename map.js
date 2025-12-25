document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('governorateModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalImages = document.getElementById('modalImages');
  const modalInfo = document.getElementById('modalInfo');

  // Clic sur les zones de la carte
  document.querySelectorAll('area.governorate[data-gov]').forEach(area => {
    area.addEventListener('click', (e) => {
      e.preventDefault();
      const govKey = area.dataset.gov; // ex : "tunis"
      showGovernorateInfo(govKey);
    });
  });

  // Boutons du modal
  const closeBtn = document.getElementById('modalClose');
  const backBtn = document.getElementById('modalBack');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backBtn) backBtn.addEventListener('click', showMap);

  // Clic en dehors du contenu du modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function showGovernorateInfo(govKey) {
    const article = document.getElementById(`gov-${govKey}`);
    if (!article) {
      console.warn("Aucun contenu HTML pour", govKey);
      return;
    }

    const name = article.querySelector('.gov-name')?.textContent || '';
    const subtitle = article.querySelector('.gov-subtitle')?.textContent || '';
    const description = article.querySelector('.gov-description')?.textContent || '';
    const population = article.querySelector('.gov-population')?.textContent || '';
    const superficie = article.querySelector('.gov-superficie')?.textContent || '';

    const attractions = [...article.querySelectorAll('.gov-attractions li')].map(li => li.textContent);
    const cuisine = [...article.querySelectorAll('.gov-cuisine li')].map(li => li.textContent);

    const imagesDiv = article.querySelector('.gov-images');
    const imagesCount = imagesDiv ? parseInt(imagesDiv.dataset.images || '0', 10) : 0;

    // Remplir le header du modal
    modalTitle.textContent = name;
    modalSubtitle.textContent = subtitle;

    // Images "placeholder"
    // Images : on récupère les <img> du HTML
modalImages.innerHTML = '';

const imageNodes = article.querySelectorAll('.gov-images img');

if (imageNodes.length === 0) {
  // Si pas d'images définies pour ce gouvernorat, tu peux afficher un message par défaut
  const placeholder = document.createElement('div');
  placeholder.className = 'modal-img';
  placeholder.textContent = `Photos à venir pour ${name}`;
  modalImages.appendChild(placeholder);
} else {
  imageNodes.forEach(imgEl => {
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-img';

    // on clone l'image pour ne pas la déplacer du HTML d'origine
    const clone = imgEl.cloneNode(true);
    wrapper.appendChild(clone);

    modalImages.appendChild(wrapper);
  });
}

if (!article) {
  alert("Information coming soon 🇹🇳");
  return;
}


    // Infos détaillées
    modalInfo.innerHTML = `
  <div class="info-card">
    <h3>📍 Description</h3>
    <p>${description}</p>
  </div>

  <div class="info-card">
    <h3>👥 Population</h3>
    <p>${population}</p>

    <h3 style="margin-top: 10px;">📏 Area</h3>
    <p>${superficie}</p>
  </div>

  <div class="info-card">
    <h3>🏛️ Main Attractions</h3>
    <ul>${attractions.map(a => `<li>${a}</li>`).join('')}</ul>
  </div>

  <div class="info-card">
    <h3>🍽️ Local Cuisine</h3>
    <ul>${cuisine.map(c => `<li>${c}</li>`).join('')}</ul>
  </div>
`;


    // Afficher le modal
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  function showMap() {
    closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
