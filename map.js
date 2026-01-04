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
    <h3>Description : </h3>
    <p>${description}</p>
  </div>

  <div class="info-card">
    <h3>Population : </h3>
    <p>${population}</p>

    <h3 style="margin-top: 10px;">Area : </h3>
    <p>${superficie}</p>
  </div>

  <div class="info-card">
    <h3>Main Attractions : </h3>
    <ul>${attractions.map(a => `<li>${a}</li>`).join('')}</ul>
  </div>

  <div class="info-card">
    <h3>Local Cuisine : </h3>
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

  const events = document.querySelectorAll('.timeline-event');

  const revealTimeline = () => {
    const trigger = window.innerHeight * 0.85;

    events.forEach((event, index) => {
      const top = event.getBoundingClientRect().top;

      if (top < trigger) {
        setTimeout(() => {
          event.classList.add('show');
        }, index * 150);
      }
    });
  };

  window.addEventListener('scroll', revealTimeline);
  revealTimeline();
  // Tab functionality
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs and sections
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active to clicked tab and corresponding section
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.classList.add('active');
    });
  });
});

 const chatToggle = document.getElementById('chatToggle');
        const chatPanel = document.getElementById('chatPanel');
        const chatClose = document.getElementById('chatClose');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const quickQuestions = document.getElementById('quickQuestions');
        let isLoading = false;

        // Knowledge base for Tunisia
       function getResponse(question) {
    const q = question.toLowerCase();
    
    // Known for / General / Overview
    if (q.includes('known for') || q.includes('famous for') || q.includes('tell me about') || q.includes('describe') || q.includes('introduction') || q.includes('overview') || q.includes('highlights') || q.includes('popular')) {
        return "Tunisia is known for its stunning Mediterranean beaches, the vast Sahara Desert, ancient ruins like Carthage and the El Djem amphitheater, and its rich cultural heritage blending Arab, Berber, African, and Mediterranean influences. It's also famous for its delicious cuisine, beautiful medinas, and warm hospitality!";
    }
    
    // Currency / Cost / Money
    if (q.includes('currency') || q.includes('money') || q.includes('dinar') || q.includes('pay') || q.includes('cost') || q.includes('price') || q.includes('expensive') || q.includes('cheap') || q.includes('budget') || q.includes('atm') || q.includes('credit card') || q.includes('cash')) {
        return "Tunisia uses the Tunisian Dinar (TND), which is divided into 1,000 millimes. The exchange rate is approximately 1 EUR = 3.43 TND. You can exchange currency at banks, airports, and authorized exchange offices. Tunisia is generally quite affordable compared to Europe, and credit cards are accepted in most hotels and larger restaurants, though cash is king in local markets.";
    }
    
    // Food / Drink / Dining
    if (q.includes('food') || q.includes('cuisine') || q.includes('dish') || q.includes('eat') || q.includes('drink') || q.includes('restaurant') || q.includes('meal') || q.includes('lunch') || q.includes('dinner') || q.includes('breakfast') || q.includes('menu') || q.includes('taste') || q.includes('specialty') || q.includes('typical')) {
        return "Tunisian cuisine is absolutely delicious! Must-try dishes include couscous (the national dish), brik (crispy pastry with egg and tuna), harissa (spicy chili paste), tajine, and mechouia salad. Don't miss the fresh seafood, fragrant mint tea, and sweet pastries like makroud and baklava!";
    }
    
    // Tourist sites / Sightseeing / Activities
    if (q.includes('tourist') || q.includes('visit') || q.includes('sites') || q.includes('attractions') || q.includes('places') || q.includes('monuments') || q.includes('sightseeing') || q.includes('what to do') || q.includes('see') || q.includes('trip') || q.includes('excursion') || q.includes('landmark') || q.includes('must-see') || q.includes('explore') || q.includes('activity') || q.includes('adventure')) {
        return "Tunisia has incredible attractions! Visit the ancient ruins of Carthage, the beautiful blue and white village of Sidi Bou Said, the Roman amphitheater in El Djem, the Medina of Tunis (UNESCO site), the oasis town of Tozeur, and the stunning island of Djerba. The Sahara Desert experience is unforgettable!";
    }
    
    // Weather / Climate / Packing
    if (q.includes('weather') || q.includes('climate') || q.includes('temperature') || q.includes('rain') || q.includes('sun') || q.includes('hot') || q.includes('cold') || q.includes('pack') || q.includes('packing') || q.includes('clothes') || q.includes('jacket') || q.includes('season')) {
        return "Tunisia has a Mediterranean climate with hot, dry summers and mild winters. Coastal areas are pleasant year-round, with summer temperatures around 29°C and winter around 11°C. The interior is semi-arid, and the south has an arid desert climate. The best time to visit is spring (March-May) or autumn (September-November).";
    }
    
    // Beaches / Coast / Sea
    if (q.includes('beach') || q.includes('coast') || q.includes('sea') || q.includes('swim') || q.includes('swimming') || q.includes('island') || q.includes('djerba')) {
        return "Tunisia has 1,298 km of beautiful Mediterranean coastline! Popular beach destinations include Hammamet, Sousse, Monastir, the island of Djerba, and Tabarka. You'll find golden sandy beaches, crystal-clear turquoise waters, and excellent resorts along the coast.";
    }
    
    // Sahara / Desert
    if (q.includes('sahara') || q.includes('desert') || q.includes('dunes') || q.includes('camel') || q.includes('tozeur') || q.includes('douz') || q.includes('tatooine')) {
        return "The Sahara Desert in southern Tunisia is breathtaking! Popular experiences include camel treks, overnight stays in desert camps, visiting oases like Douz and Tozeur, exploring the Star Wars filming locations, and watching magical sunrises and sunsets over the dunes.";
    }
    
    // Language / Communication
    if (q.includes('language') || q.includes('speak') || q.includes('talk') || q.includes('english') || q.includes('french') || q.includes('communicate') || q.includes('understand')) {
        return "Arabic is the official language of Tunisia. However, French is widely spoken and used in business and education. Many Tunisians also speak English, especially in tourist areas, and Italian is commonly understood. The local dialect is Tunisian Arabic (Derja).";
    }
    
    // History / Carthage / Ruins
    if (q.includes('history') || q.includes('carthage') || q.includes('roman') || q.includes('past') || q.includes('ancient') || q.includes('ruins') || q.includes('archaeological') || q.includes('phoenician')) {
        return "Tunisia has a fascinating history spanning over 3,000 years! It was home to the ancient Phoenician city of Carthage, later became part of the Roman Empire, was conquered by Arabs in the 7th century, and gained independence from France in 1956. You can explore incredible archaeological sites from all these periods.";
    }
    
    // Capital / Tunis
    if (q.includes('capital') || q.includes('tunis') || q.includes('main city') || q.includes('biggest city')) {
        return "Tunis is the capital and largest city of Tunisia, located on the Mediterranean coast. It's a vibrant mix of ancient medina (UNESCO World Heritage site), French colonial architecture, and modern districts. Must-see spots include the Bardo Museum, Zitouna Mosque, and nearby Carthage ruins.";
    }
    
    // Safety / Security / Crime
    if (q.includes('safe') || q.includes('safety') || q.includes('secure') || q.includes('danger') || q.includes('dangerous') || q.includes('crime') || q.includes('police') || q.includes('risk')) {
        return "Tunisia is generally a safe destination for tourists. The Tunisian people are known for their warm hospitality and friendliness. As with any travel destination, use common sense, stay aware of your surroundings, and follow local advice. Tourist Police (dial 197) are available to help visitors.";
    }
    
    // Best time to visit / Seasons
    if (q.includes('when') || q.includes('best time') || q.includes('when to go') || q.includes('month') || q.includes('good time')) {
        return "The best time to visit Tunisia is during spring (March to May) or autumn (September to November) when temperatures are pleasant and comfortable for sightseeing. Summer (June-August) is perfect for beach holidays but can be very hot inland. Winter is mild and great for exploring the south.";
    }
    
    // Culture / Traditions / Religion
    if (q.includes('culture') || q.includes('tradition') || q.includes('customs') || q.includes('religion') || q.includes('islam') || q.includes('muslim') || q.includes('people') || q.includes('lifestyle')) {
        return "Tunisia has a rich cultural blend of Arab, Berber, Mediterranean, and African influences. The population is predominantly Muslim, and religion plays an important role in daily life. Traditions include warm hospitality, mint tea ceremonies, vibrant festivals, traditional music like malouf, and beautiful handicrafts such as pottery, carpets, and metalwork.";
    }
    
    // Hotels / Accommodation / Sleeping
    if (q.includes('hotel') || q.includes('accommodation') || q.includes('stay') || q.includes('sleep') || q.includes('hostel') || q.includes('resort') || q.includes('riad') || q.includes('booking') || q.includes('lodge')) {
        return "Tunisia offers diverse accommodation options for all budgets! From luxury beach resorts and boutique riads in the medinas to budget-friendly hotels and desert camps. Popular areas include Hammamet, Sousse, Djerba, and Tunis. Many all-inclusive resorts are available along the coast.";
    }
    
    // Transportation / Getting around
    if (q.includes('transport') || q.includes('travel') || q.includes('get around') || q.includes('bus') || q.includes('train') || q.includes('taxi') || q.includes('car rental') || q.includes('drive') || q.includes('airport') || q.includes('flight') || q.includes('louage')) {
        return "Getting around Tunisia is easy! Options include trains (connecting major cities), buses (louages for shared taxis), private taxis, rental cars, and domestic flights. The TGM light rail connects Tunis to coastal suburbs like Carthage and Sidi Bou Said.";
    }

    // Geography / Location (New Category)
    if (q.includes('where is') || q.includes('location') || q.includes('continent') || q.includes('map') || q.includes('border') || q.includes('africa') || q.includes('europe')) {
        return "Tunisia is located in North Africa. It is the northernmost country in Africa and is bordered by Algeria to the west and southwest, Libya to the southeast, and the Mediterranean Sea to the north and east. It is just a short ferry ride away from islands like Sicily (Italy).";
    }

    // Shopping / Markets / Souvenirs (New Category)
    if (q.includes('shopping') || q.includes('shop') || q.includes('buy') || q.includes('souvenir') || q.includes('market') || q.includes('souk') || q.includes('bazaar') || q.includes('mall') || q.includes('carpet') || q.includes('pottery')) {
        return "Tunisia is a paradise for shoppers! You can visit traditional markets (souks) in the medinas to buy handwoven carpets, pottery, ceramics, leather goods, olive oil, and spices. Don't forget to haggle for the best price. The center of Tunis and Sidi Bou Said are famous for their artisan shops.";
    }

    // Visa / Entry Requirements (New Category)
    if (q.includes('visa') || q.includes('passport') || q.includes('entry') || q.includes('enter') || q.includes('requirements') || q.includes('document')) {
        return "Visa requirements for Tunisia vary depending on your nationality. Many European, North American, and some other nationalities do not need a visa for stays of up to 90 days. However, it is essential to check with the Tunisian embassy or consulate in your country for the most current visa regulations before you travel.";
    }
    
    // Greetings in French (Expanded)
    if (q.includes('bonjour') || q.includes('salut') || q.includes('ça va') || q.includes('merci')) {
        return "Bonjour! Je suis ravi de vous aider à découvrir la Tunisie. La Tunisie est un magnifique pays méditerranéen avec une histoire riche, des plages splendides, le désert du Sahara, et une culture accueillante. N'hésitez pas à me poser vos questions!";
    }
    
    // Greetings in Arabic (Expanded)
    if (q.includes('مرحبا') || q.includes('السلام') || q.includes('صباح الخير') || q.includes('مساء الخير') ||q.includes('عسلامة')||q.includes('asslema')) {
        return "مرحبا! تونس بلد جميل في شمال إفريقيا، مشهورة بشواطئها الرائعة، تاريخها العريق، صحراء الصحراء، وكرم ضيافة شعبها. كيف يمكنني مساعدتك في التعرف على تونس؟";
    }

    // Generic English Greetings (New)
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
        return "Hello! I'm here to help you plan your trip to Tunisia. Whether you have questions about the food, the history, or the beaches, just ask away!";
    }
    
    // Default response
    return "That's a great question about Tunisia! While I can provide general information about Tunisia's geography, culture, history, tourism, and daily life, I'd recommend checking official tourism websites for the most detailed and up-to-date information. Is there anything specific about Tunisia's beaches, deserts, cities, or culture you'd like to know?";
}

        // Toggle chat panel
        chatToggle.addEventListener('click', () => {
            chatPanel.classList.toggle('open');
            chatToggle.classList.toggle('active');
        });

        chatClose.addEventListener('click', () => {
            chatPanel.classList.remove('open');
            chatToggle.classList.remove('active');
        });

        // Send message
        async function sendMessage(message) {
            if (!message.trim() || isLoading) return;

            // Hide quick questions after first message
            if (chatMessages.children.length === 1) {
                quickQuestions.style.display = 'none';
            }

            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Show typing indicator
            isLoading = true;
            chatSend.disabled = true;
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message assistant';
            typingDiv.innerHTML = `
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            try {
                // Simulate API delay for realistic feel
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
                
                const reply = getResponse(message);
                typingDiv.remove();
                addMessage(reply, 'assistant');
            } catch (error) {
                typingDiv.remove();
                addMessage("I apologize, but I'm having trouble right now. Please try again in a moment.", 'assistant');
            } finally {
                isLoading = false;
                chatSend.disabled = false;
            }
        }

        function addMessage(text, role) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${role}`;
            
            if (role === 'assistant') {
                messageDiv.innerHTML = `
                    <div>
                        <div class="assistant-label">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            Tunisia Guide
                        </div>
                        <div class="message-bubble">${text}</div>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function sendQuickQuestion(question) {
            chatInput.value = question;
            sendMessage(question);
        }

        // Event listeners
        chatSend.addEventListener('click', () => sendMessage(chatInput.value));
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage(chatInput.value);
        });