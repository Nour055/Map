// =====================================
// MODAL MANAGEMENT - GOVERNORATES
// =====================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('governorateModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalImages = document.getElementById('modalImages');
  const modalInfo = document.getElementById('modalInfo');
  const closeBtn = document.getElementById('modalClose');
  const backBtn = document.getElementById('modalBack');

  // Click on map areas
  document.querySelectorAll('area.governorate[data-gov]').forEach(area => {
    area.addEventListener('click', (e) => {
      e.preventDefault();
      const govKey = area.dataset.gov; 
      showGovernorateInfo(govKey);
    });
  });

  // Close modal button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backBtn) backBtn.addEventListener('click', showMap);

  // Close modal on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Show governorate information
  function showGovernorateInfo(govKey) {
    const article = document.getElementById(`gov-${govKey}`);
    
    if (!article) {
      alert("Information coming soon 🇹🇳");
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

    modalTitle.textContent = name;
    modalSubtitle.textContent = subtitle;

    // Load images
    modalImages.innerHTML = '';
    const imageNodes = article.querySelectorAll('.gov-images img');

    if (imageNodes.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.className = 'modal-img';
      placeholder.textContent = `Photos à venir pour ${name}`;
      modalImages.appendChild(placeholder);
    } else {
      imageNodes.forEach(imgEl => {
        const wrapper = document.createElement('div');
        wrapper.className = 'modal-img';
        const clone = imgEl.cloneNode(true);
        wrapper.appendChild(clone);
        modalImages.appendChild(wrapper);
      });
    }

    // Load information
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

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  // Show map
  function showMap() {
    closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// =====================================
// NAVIGATION - ACTIVE LINK
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".primary-nav a");
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const currentHash = location.hash;

  links.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // Page match
    if (href === currentPage) {
      link.classList.add("active");
    }

    // Hash match (e.g. #contact)
    if (href === currentHash && currentHash !== "") {
      link.classList.add("active");
    }
  });
});

// =====================================
// TIMELINE ANIMATIONS
// =====================================
document.addEventListener('DOMContentLoaded', () => {
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

  // Intersection Observer for timeline
  const timelineEvents = document.querySelectorAll(".timeline-event");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineEvents.forEach(event => observer.observe(event));

  // Timeline event click
  timelineEvents.forEach(event => {
    event.addEventListener("click", () => {
      timelineEvents.forEach(e => e.classList.remove("active"));
      event.classList.add("active");
    });
  });
});

// =====================================
// TABS MANAGEMENT
// =====================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active class to clicked
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.classList.add('active');
    });
  });
});

// =====================================
// CHATBOT - TUNISIA GUIDE
// =====================================
document.addEventListener('DOMContentLoaded', () => {
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
    
    // Thank you responses
    if (q.includes('thank') || q.includes('thanks') || q.includes('merci') || q.includes('شكرا') || q.includes('choukran')) {
      return "You're very welcome! I'm happy to help you discover Tunisia. If you have any more questions about this beautiful country, feel free to ask anytime. Bon voyage! 🇹🇳";
    }
    
    // Goodbye responses
    if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('au revoir') || q.includes('بسلامة') || q.includes('beslama')) {
      return "Goodbye! Safe travels, and I hope you have an amazing time in Tunisia. Come back anytime you need more information. Beslama! 🌟";
    }
    
    // Known for / Overview / Beauty
    if (q.includes('known for') || q.includes('famous for') || q.includes('tell me about') || 
        q.includes('describe') || q.includes('introduction') || q.includes('overview') || 
        q.includes('highlights') || q.includes('popular') || q.includes('beautiful') || 
        q.includes('what is tunisia') || q.includes('about tunisia')) {
      return "Tunisia is known for its stunning Mediterranean beaches, the vast Sahara Desert, ancient ruins like Carthage and the El Djem amphitheater, and its rich cultural heritage blending Arab, Berber, African, and Mediterranean influences. It's also famous for its delicious cuisine, beautiful medinas, and warm hospitality!";
    }
    
    // Currency / Cost / Money
    if (q.includes('currency') || q.includes('money') || q.includes('dinar') || q.includes('pay') || 
        q.includes('cost') || q.includes('price') || q.includes('expensive') || q.includes('cheap') || 
        q.includes('budget') || q.includes('atm') || q.includes('credit card') || q.includes('cash') || 
        q.includes('affordable') || q.includes('exchange') || q.includes('tnd') || q.includes('euro')) {
      return "Tunisia uses the Tunisian Dinar (TND), which is divided into 1,000 millimes. The exchange rate is approximately 1 EUR = 3.43 TND. You can exchange currency at banks, airports, and authorized exchange offices. Tunisia is generally quite affordable compared to Europe, and credit cards are accepted in most hotels and larger restaurants, though cash is king in local markets. ATMs are widely available in cities.";
    }
    
    // Food / Drink / Dining
    if (q.includes('food') || q.includes('cuisine') || q.includes('dish') || q.includes('eat') || 
        q.includes('drink') || q.includes('restaurant') || q.includes('meal') || q.includes('lunch') || 
        q.includes('dinner') || q.includes('breakfast') || q.includes('menu') || q.includes('taste') || 
        q.includes('specialty') || q.includes('typical') || q.includes('couscous') || q.includes('brik') || 
        q.includes('harissa') || q.includes('tajine') || q.includes('vegetarian') || q.includes('halal') || 
        q.includes('wine') || q.includes('tea') || q.includes('coffee')) {
      return "Tunisian cuisine is absolutely delicious! Must-try dishes include couscous (the national dish, usually served on Fridays), brik (crispy pastry with egg and tuna), harissa (spicy chili paste), tajine, mechouia salad, and lablabi (chickpea soup). Don't miss the fresh seafood, fragrant mint tea, strong espresso, and sweet pastries like makroud and baklava! Tunisia also produces excellent olive oil and local wines. Vegetarian options are available, and all food is halal.";
    }
    
    // Tourist sites / Sightseeing / Things to do
    if (q.includes('tourist') || q.includes('visit') || q.includes('sites') || q.includes('attractions') || 
        q.includes('places') || q.includes('monuments') || q.includes('sightseeing') || q.includes('what to do') || 
        q.includes('see') || q.includes('trip') || q.includes('excursion') || q.includes('landmark') || 
        q.includes('must-see') || q.includes('explore') || q.includes('activity') || q.includes('adventure') || 
        q.includes('itinerary') || q.includes('plan') || q.includes('recommend')) {
      return "Tunisia has incredible attractions! Visit the ancient ruins of Carthage, the beautiful blue and white village of Sidi Bou Said, the Roman amphitheater in El Djem (3rd largest in the world), the Medina of Tunis (UNESCO site), the oasis town of Tozeur, the stunning island of Djerba, and the mountain village of Matmata with its troglodyte homes. The Sahara Desert experience is unforgettable! Other activities include scuba diving, thalassotherapy spas, golf, and exploring the medinas.";
    }
    
    // Weather / Climate / Best time to visit
    if (q.includes('weather') || q.includes('climate') || q.includes('temperature') || q.includes('rain') || 
        q.includes('sun') || q.includes('hot') || q.includes('cold') || q.includes('pack') || 
        q.includes('packing') || q.includes('clothes') || q.includes('jacket') || q.includes('season') || 
        q.includes('when') || q.includes('best time') || q.includes('when to go') || q.includes('month') || 
        q.includes('good time') || q.includes('summer') || q.includes('winter') || q.includes('spring') || q.includes('autumn')) {
      return "Tunisia has a Mediterranean climate with hot, dry summers and mild winters. Coastal areas are pleasant year-round, with summer temperatures around 29°C (84°F) and winter around 11°C (52°F). The interior is semi-arid, and the south has an arid desert climate. The best time to visit is spring (March-May) or autumn (September-November) when temperatures are comfortable for sightseeing. Summer is perfect for beach holidays but very hot inland. Winter is mild and ideal for exploring the Sahara. Pack light layers, sunscreen, and comfortable walking shoes!";
    }
    
    // Beaches / Coast / Swimming
    if (q.includes('beach') || q.includes('coast') || q.includes('sea') || q.includes('swim') || 
        q.includes('swimming') || q.includes('island') || q.includes('djerba') || q.includes('relax') || 
        q.includes('hammamet') || q.includes('sousse') || q.includes('water sports') || q.includes('diving')) {
      return "Tunisia has 1,298 km of beautiful Mediterranean coastline! Popular beach destinations include Hammamet (known as the Saint-Tropez of Tunisia), Sousse, Monastir, the island of Djerba (famous for its year-round sunshine), Mahdia, and Tabarka (great for diving and coral reefs). You'll find golden sandy beaches, crystal-clear turquoise waters, excellent resorts, and water sports like jet skiing, parasailing, and windsurfing.";
    }
    
    // Sahara / Desert / Star Wars
    if (q.includes('sahara') || q.includes('desert') || q.includes('dunes') || q.includes('camel') || 
        q.includes('tozeur') || q.includes('douz') || q.includes('tatooine') || q.includes('star wars') || 
        q.includes('matmata') || q.includes('ksar') || q.includes('chott el jerid')) {
      return "The Sahara Desert in southern Tunisia is breathtaking! Popular experiences include camel treks, overnight stays in traditional Bedouin desert camps under the stars, visiting oases like Douz (Gateway to the Sahara) and Tozeur, exploring the Star Wars filming locations (Matmata, Tozeur, Nefta, Ksar Ghilane), seeing the salt lake Chott el Jerid, and watching magical sunrises and sunsets over the golden dunes. The Ksour (fortified granaries) are also fascinating to explore!";
    }
    
    // Language / Communication
    if (q.includes('language') || q.includes('speak') || q.includes('talk') || q.includes('english') || 
        q.includes('french') || q.includes('communicate') || q.includes('understand') || q.includes('arabic') || 
        q.includes('translation') || q.includes('phrase')) {
      return "Arabic is the official language of Tunisia, specifically Tunisian Arabic (Derja), which differs from Modern Standard Arabic. French is widely spoken and used in business, education, and tourism. Many Tunisians also speak English, especially in tourist areas, hotels, and restaurants. Italian and German are commonly understood in tourist zones. Learning a few basic Arabic phrases like 'Asslema' (hello), 'Choukran' (thank you), and 'Inshallah' (God willing) will be greatly appreciated!";
    }
    
    // History / Carthage / Archaeology
    if (q.includes('history') || q.includes('carthage') || q.includes('roman') || q.includes('past') || 
        q.includes('ancient') || q.includes('ruins') || q.includes('archaeological') || q.includes('phoenician') || 
        q.includes('hannibal') || q.includes('berber') || q.includes('ottoman') || q.includes('colonial') || 
        q.includes('independence') || q.includes('empire')) {
      return "Tunisia has a fascinating history spanning over 3,000 years! It was home to the ancient Phoenician city of Carthage (founded 814 BC), ruled by the legendary Hannibal. It later became part of the Roman Empire, producing emperors and magnificent structures. The Arabs conquered it in the 7th century, bringing Islam and Arabic culture. The Ottomans ruled from the 16th century, followed by French colonization (1881-1956). Tunisia gained independence in 1956 under Habib Bourguiba. You can explore incredible UNESCO archaeological sites from all these periods, including Carthage, Dougga, El Djem, and Bulla Regia.";
    }
    
    // Capital / Tunis / Cities
    if (q.includes('capital') || q.includes('tunis') || q.includes('main city') || q.includes('biggest city') || 
        q.includes('city') || q.includes('cities') || q.includes('urban') || q.includes('sfax') || q.includes('kairouan')) {
      return "Tunis is the capital and largest city of Tunisia, located on the Mediterranean coast with a population of over 2.7 million in the metro area. It's a vibrant mix of ancient medina (UNESCO World Heritage site), French colonial architecture, and modern districts. Must-see spots include the Bardo Museum (world's finest Roman mosaic collection), Zitouna Mosque, Avenue Habib Bourguiba, and nearby Carthage ruins. Other major cities include Sfax (economic hub), Sousse (coastal resort), Kairouan (holy city and UNESCO site), and Bizerte (port city).";
    }
    
    // Safety / Security / Health
    if (q.includes('safe') || q.includes('safety') || q.includes('secure') || q.includes('danger') || 
        q.includes('dangerous') || q.includes('crime') || q.includes('police') || q.includes('risk') || 
        q.includes('emergency') || q.includes('help') || q.includes('health') || q.includes('hospital') || 
        q.includes('doctor') || q.includes('pharmacy') || q.includes('vaccine') || q.includes('insurance')) {
      return "Tunisia is generally a safe destination for tourists, and Tunisian people are known for their warm hospitality and friendliness. As with any travel destination, use common sense, stay aware of your surroundings, avoid isolated areas at night, and follow local advice. Emergency numbers: Tourist Police 197, General Emergency 112, Ambulance 190, Fire 198. No special vaccinations are required, but travel insurance is recommended. Tap water is generally safe in cities, but bottled water is widely available. Pharmacies are abundant and well-stocked.";
    }
    
    // Culture / Traditions / Religion / Festivals
    if (q.includes('culture') || q.includes('tradition') || q.includes('customs') || q.includes('religion') || 
        q.includes('islam') || q.includes('muslim') || q.includes('people') || q.includes('lifestyle') || 
        q.includes('festival') || q.includes('ramadan') || q.includes('eid') || q.includes('music') || 
        q.includes('dance') || q.includes('art') || q.includes('handicraft') || q.includes('etiquette')) {
      return "Tunisia has a rich cultural blend of Arab, Berber, Mediterranean, and African influences. The population is predominantly Muslim (99%), and Islam plays an important role in daily life while Tunisia maintains a moderate, progressive approach. Traditions include warm hospitality (you'll often be offered mint tea!), vibrant festivals like the Carthage International Festival and Douz Sahara Festival, traditional music (malouf, mezwed), and beautiful handicrafts (pottery, carpets, metalwork, leatherwork). During Ramadan, respect fasting hours. Dress modestly in religious sites. Friday is the weekly day of rest. Tunisians are friendly, expressive, and love to share their culture with visitors!";
    }
    
    // Hotels / Accommodation / Where to stay
    if (q.includes('hotel') || q.includes('accommodation') || q.includes('stay') || q.includes('sleep') || 
        q.includes('hostel') || q.includes('resort') || q.includes('riad') || q.includes('booking') || 
        q.includes('lodge') || q.includes('where to stay') || q.includes('room') || q.includes('guesthouse')) {
      return "Tunisia offers diverse accommodation options for all budgets! From luxury 5-star beach resorts and boutique riads in the medinas to budget-friendly hotels, youth hostels, and authentic desert camps. Popular areas include Hammamet and Sousse (beach resorts), Djerba (all-inclusive hotels), Tunis and Kairouan (boutique riads), and Tozeur/Douz (desert lodges). Many all-inclusive resorts are available along the coast, offering excellent value. Book in advance during peak season (July-August). Consider staying in a traditional medina guesthouse for an authentic experience!";
    }
    
    // Transportation / Getting around
    if (q.includes('transport') || q.includes('travel') || q.includes('get around') || q.includes('bus') || 
        q.includes('train') || q.includes('taxi') || q.includes('car rental') || q.includes('drive') || 
        q.includes('airport') || q.includes('flight') || q.includes('louage') || q.includes('public transport') || 
        q.includes('metro') || q.includes('tgm') || q.includes('rental') || q.includes('uber')) {
      return "Getting around Tunisia is easy and affordable! Options include: SNCFT trains connecting major cities (comfortable and scenic), buses and louages (shared minivans - fast and cheap), yellow taxis (use meters in cities), rental cars (roads are generally good, international license accepted), the TGM light rail (Tunis to Carthage and Sidi Bou Said), and domestic flights. Main airports are Tunis-Carthage, Enfidha-Hammamet, Monastir, and Djerba. Uber and Bolt operate in major cities. For desert trips, organized tours are recommended. Driving is on the right side.";
    }

    // Geography / Location / Size
    if (q.includes('where is') || q.includes('location') || q.includes('continent') || q.includes('map') || 
        q.includes('border') || q.includes('africa') || q.includes('europe') || q.includes('size') || 
        q.includes('area') || q.includes('mediterranean') || q.includes('neighbor')) {
      return "Tunisia is located in North Africa, positioned at the northernmost point of the African continent. It covers 163,610 km² (about the size of Florida) and is bordered by Algeria to the west and southwest, Libya to the southeast, and the Mediterranean Sea to the north and east (1,148 km of coastline). It's strategically located between Europe and Africa - just 140 km from Sicily, Italy. The geography ranges from fertile coastal plains and mountains (Dorsale range) to the vast Sahara Desert in the south.";
    }

    // Shopping / Souvenirs / Markets
    if (q.includes('shopping') || q.includes('shop') || q.includes('buy') || q.includes('souvenir') || 
        q.includes('market') || q.includes('souk') || q.includes('bazaar') || q.includes('mall') || 
        q.includes('carpet') || q.includes('pottery') || q.includes('handicraft') || q.includes('olive oil') || 
        q.includes('haggle') || q.includes('bargain')) {
      return "Tunisia is a paradise for shoppers! Visit traditional souks (markets) in the medinas to buy handwoven Berber carpets and kilims, colorful pottery and ceramics from Nabeul, leather goods (bags, shoes, babouches), argan and olive oil, dates, harissa, spices (especially rose water), colorful chechias (traditional hats), jewelry, and copper/brass items. Haggling is expected and part of the fun - start at 50% of the asking price! The Medina of Tunis, Hammamet, Houmt Souk (Djerba), and Kairouan are famous for artisan shops. Modern shopping malls exist in major cities for fixed-price shopping.";
    }

    // Visa / Entry Requirements / Documents
    if (q.includes('visa') || q.includes('passport') || q.includes('entry') || q.includes('enter') || 
        q.includes('requirements') || q.includes('document') || q.includes('customs') || q.includes('immigration')) {
      return "Visa requirements for Tunisia vary by nationality. Citizens of the EU, USA, Canada, UK, Australia, and many other countries do NOT need a visa for tourist stays up to 90 days - just a passport valid for at least 6 months. Some nationalities can obtain a visa on arrival. Always check current requirements with the Tunisian embassy or consulate before travel as regulations can change. Keep your passport safe at all times. Customs allows duty-free: 200 cigarettes, 1 liter of spirits, reasonable personal items. Export of antiquities is strictly forbidden.";
    }
    
    // Internet / WiFi / Phone / SIM card
    if (q.includes('internet') || q.includes('wifi') || q.includes('wi-fi') || q.includes('phone') || 
        q.includes('sim card') || q.includes('mobile') || q.includes('data') || q.includes('roaming') || 
        q.includes('call') || q.includes('whatsapp') || q.includes('connection')) {
      return "Internet and WiFi are widely available in Tunisia! Most hotels, restaurants, and cafes offer free WiFi. For mobile connectivity, buy a local SIM card from providers like Ooredoo, Orange Tunisia, or Tunisie Telecom at the airport or phone shops - very affordable (around 5-10 TND with data). You'll need your passport. 4G coverage is good in cities and tourist areas, but can be limited in remote desert regions. WhatsApp, Facebook, and other social media work normally. International roaming can be expensive, so a local SIM is recommended for longer stays.";
    }
    
    // Photography / Instagram / Scenic spots
    if (q.includes('photo') || q.includes('picture') || q.includes('instagram') || q.includes('camera') || 
        q.includes('scenic') || q.includes('picturesque') || q.includes('photography') || q.includes('selfie')) {
      return "Tunisia is incredibly photogenic! Top photo spots include: Sidi Bou Said (iconic blue and white architecture), Chott el Jerid salt lake (mirror reflections), Sahara dunes at sunrise/sunset, colorful medina souks, ancient Carthage and El Djem ruins, Matmata's troglodyte homes, Kairouan's Great Mosque, Djerba's pink flamingos, and the blue doors of Tunisia. Always ask permission before photographing people, especially women. Avoid photographing military installations, airports, and government buildings. The golden hour light in the desert is magical for photography!";
    }
    
    // Nightlife / Entertainment / Bars
    if (q.includes('nightlife') || q.includes('night') || q.includes('bar') || q.includes('club') || 
        q.includes('disco') || q.includes('party') || q.includes('entertainment') || q.includes('music') || 
        q.includes('alcohol') || q.includes('beer') || q.includes('wine')) {
      return "Tunisia offers varied nightlife, especially in tourist areas and major cities! Hammamet, Sousse, and Djerba have beach clubs, bars, and discos. Tunis has trendy bars, lounges, and nightclubs in areas like La Marsa and Gammarth. Many resort hotels have evening entertainment, live music, and belly dancing shows. While Tunisia is a Muslim country, alcohol is available in hotels, tourist restaurants, and licensed bars (though not in the medina). Local Celtia beer and Tunisian wines are good. Nightlife is more conservative than Europe, but coastal resorts are lively, especially in summer!";
    }
    
    // Family / Kids / Children
    if (q.includes('family') || q.includes('kid') || q.includes('child') || q.includes('baby') || 
        q.includes('toddler') || q.includes('children') || q.includes('family-friendly') || q.includes('playground')) {
      return "Tunisia is very family-friendly! Tunisians love children and are welcoming to families. Great family activities include: beach resorts with kids' clubs and pools, camel rides in the desert, exploring Carthage and Roman ruins (educational and fun), Djerba Explore Park (crocodile farm and heritage village), water parks in Sousse and Djerba, glass-bottom boat rides, and easy medina walks. Most hotels offer family rooms and many have childcare. Tunisian food includes kid-friendly options like couscous, grilled meats, and pastries. High chairs and baby facilities are available in tourist areas. The culture is very child-centric!";
    }
    
    // Adventure / Sports / Activities
    if (q.includes('adventure') || q.includes('sport') || q.includes('hiking') || q.includes('diving') || 
        q.includes('golf') || q.includes('quad') || q.includes('4x4') || q.includes('cycling') || 
        q.includes('trek') || q.includes('sandboard') || q.includes('kitesurf')) {
      return "Tunisia offers amazing adventures! Try: scuba diving and snorkeling (Tabarka has coral reefs), quad biking and 4x4 desert safaris, sandboarding on Sahara dunes, camel trekking, mountain hiking in Kroumirie and Dorsale ranges, golf (several world-class courses), kitesurfing and windsurfing (Djerba, Zarzis), sailing, fishing, bird watching (especially in wetlands), hot air ballooning, and thalassotherapy spa treatments. For the brave: paragliding, caving in the Matmata region, and off-road desert rallies. The mix of sea, mountains, and desert makes Tunisia perfect for active travelers!";
    }
    
    // Ramadan / Islamic holidays
    if (q.includes('ramadan') || q.includes('eid') || q.includes('holiday') || q.includes('feast') || 
        q.includes('mouled') || q.includes('islamic')) {
      return "During Ramadan (the Islamic holy month of fasting), many restaurants and cafes close during daytime, especially in non-touristy areas, though tourist restaurants usually remain open. Respect locals by not eating/drinking/smoking publicly during fasting hours (sunrise to sunset). Evenings are festive with special Ramadan meals (iftar). Eid al-Fitr and Eid al-Adha are major celebrations with family gatherings. Banks, government offices, and some shops close during these holidays. It's actually a fascinating time to visit and experience Tunisian culture, though some services may be limited. Tourist areas remain accommodating to visitors.";
    }
    
    // Women travelers / Solo travel / LGBT
    if (q.includes('woman') || q.includes('female') || q.includes('solo') || q.includes('alone') || 
        q.includes('single') || q.includes('girl') || q.includes('lgbt') || q.includes('gay')) {
      return "Tunisia is generally safe for solo travelers and women. Women travelers should dress modestly (covering shoulders and knees, especially outside beach resorts), be firm but polite with unwanted attention, and stick to well-lit, populated areas at night. Solo women are common in Tunisia. Tunisian women are educated and increasingly visible in public life. For solo travelers of any gender: join group tours for desert trips, stay in reputable accommodations, and trust your instincts. LGBT travelers should note that while homosexuality is illegal in Tunisia, tourist areas are generally tolerant, though public displays of affection (for all couples) should be discreet.";
    }
    
    // Tipping / Gratuity
    if (q.includes('tip') || q.includes('tipping') || q.includes('gratuity') || q.includes('service charge') || 
        q.includes('how much to tip')) {
      return "Tipping is customary in Tunisia and appreciated! General guidelines: Restaurants (10% if service not included), cafes (small change or 1 TND), taxis (round up or add 0.5-1 TND), hotel porters (2-3 TND per bag), hotel housekeeping (5-10 TND per week), tour guides (5-10 TND per day), spa staff (10%), and drivers (negotiated daily rate plus 5-10 TND tip). In tourist areas, tips are expected. For exceptional service, be generous. Always carry small bills for tipping. A service charge is sometimes included in restaurant bills - check before adding extra.";
    }
    
    // Electricity / Plugs / Adapters
    if (q.includes('electric') || q.includes('plug') || q.includes('adapter') || q.includes('voltage') || 
        q.includes('socket') || q.includes('charger') || q.includes('power')) {
      return "Tunisia uses 230V, 50Hz electrical current. Plug types are C and E (European two-pin round plugs). If you're from the US, UK, or other countries with different plug types, bring a universal travel adapter. Most modern electronics (phones, laptops, cameras) work with 110-240V and only need a plug adapter, but check your devices. Adapters are available in airports and electronics shops in Tunisia, but it's easier to bring your own. Many hotels have USB charging ports. Power outages are rare in tourist areas.";
    }
    
    // Weddings / Honeymoon / Romance
    if (q.includes('wedding') || q.includes('honeymoon') || q.includes('romantic') || q.includes('romance') || 
        q.includes('couple') || q.includes('anniversary') || q.includes('marry')) {
      return "Tunisia is a wonderful romantic and honeymoon destination! Enjoy: luxurious beach resorts with couples' spas and private pools, sunset camel rides in the Sahara, candlelit dinners in Sidi Bou Said overlooking the Mediterranean, traditional hammam experiences for two, dhow sailing trips, stargazing in the desert, exploring ancient ruins hand-in-hand, and staying in boutique riads with rooftop terraces. Many resorts offer honeymoon packages with special amenities. The blend of exotic culture, stunning landscapes, and excellent service makes Tunisia perfect for romance. Tunisian weddings are elaborate, festive affairs lasting several days if you're lucky enough to be invited!";
    }
    
    // Sousse / Monastir / Mahdia / Specific cities
    if (q.includes('sousse') || q.includes('monastir') || q.includes('mahdia') || q.includes('bizerte') || 
        q.includes('nabeul') || q.includes('kairouan') || q.includes('tabarka')) {
      return "Each Tunisian city has unique charm! Sousse: Beach resort with a beautiful medina and Ribat fortress (UNESCO site). Monastir: Bourguiba's birthplace, marina, and fortified monastery. Mahdia: Quieter coastal town, great beaches, and traditional fishing port. Kairouan: Holy city (4th holiest in Islam), stunning Great Mosque, and carpet-weaving center. Bizerte: Authentic port city with old harbor and beaches. Nabeul: Famous for pottery, citrus fruits, and Friday market. Tabarka: Coral reefs, jazz festival, and mountainous scenery. Each offers authentic Tunisian experiences beyond the typical tourist trail!";
    }
    
    // Greetings in French
    if (q.includes('bonjour') || q.includes('salut') || q.includes('ça va') || q.includes('merci')) {
      return "Bonjour! Je suis ravi de vous aider à découvrir la Tunisie. La Tunisie est un magnifique pays méditerranéen avec une histoire riche, des plages splendides, le désert du Sahara, et une culture accueillante. Vous pouvez me poser des questions en français ou en anglais. Comment puis-je vous aider?";
    }
    
    // Greetings in Arabic
    if (q.includes('مرحبا') || q.includes('السلام') || q.includes('صباح الخير') || q.includes('مساء الخير') || 
        q.includes('عسلامة') || q.includes('asslema') || q.includes('سلام')) {
      return "مرحبا بك! تونس بلد جميل في شمال إفريقيا، مشهورة بشواطئها الرائعة، تاريخها العريق، صحراء الصحراء، وكرم ضيافة شعبها. كيف يمكنني مساعدتك في التعرف على تونس؟ 🇹🇳";
    }

    // Generic English Greetings
    if (q.includes('hello') || q.includes('hi ') || q === 'hi' || q.includes('hey') || q.includes('greetings') || 
        q.includes('good morning') || q.includes('good afternoon') || q.includes('good evening')) {
      return "Hello! Welcome! I'm here to help you discover the beauty of Tunisia. Whether you have questions about beaches, deserts, food, culture, history, or practical travel tips, feel free to ask anything. How can I assist you today?";
    }
    
    // Help / What can you do
    if (q.includes('help') || q.includes('what can you') || q.includes('how can you') || q.includes('assist')) {
      return "I can help you with all aspects of visiting Tunisia! Ask me about: tourist attractions and sightseeing, beaches and desert adventures, food and restaurants, hotels and accommodation, transportation and getting around, culture and traditions, safety and health, visa requirements, best times to visit, costs and currency, language and communication, history and archaeology, shopping and souvenirs, or any specific cities and regions. What would you like to know?";
    }
    
    // Yes/No/OK responses
    if (q === 'yes' || q === 'no' || q === 'ok' || q === 'okay' || q.includes('sure') || q === 'nice' || q === 'cool' || q === 'great') {
      return "Great! Do you have any specific questions about Tunisia? I'm here to help you plan the perfect trip!";
    }
    
    // Population / Demographics
    if (q.includes('population') || q.includes('how many people') || q.includes('inhabitants') || q.includes('demographic')) {
      return "Tunisia has a population of approximately 12.3 million people (as of 2024). About 70% live in urban areas, with the capital Tunis being home to over 2.7 million. The population is predominantly Arab-Berber (98%), with small European and Jewish minorities. Tunisia has a young population with a median age of around 33 years. The literacy rate is high at over 81%, and the country is known for its educated workforce and progressive social policies in the region.";
    }
    
    // Flag / National symbols
    if (q.includes('flag') || q.includes('national symbol') || q.includes('anthem') || q.includes('emblem')) {
      return "The Tunisian flag features a red background with a white circle in the center containing a red crescent moon and a five-pointed red star. Red symbolizes the blood of martyrs, the crescent and star are traditional Islamic symbols. The national anthem is 'Humat al-Hima' (Defenders of the Homeland). The olive tree is a significant national symbol, representing peace and prosperity. Tunisia is one of the world's largest olive oil producers!";
    }
    
    // Government / Politics
    if (q.includes('government') || q.includes('president') || q.includes('politics') || q.includes('democracy') || q.includes('parliament')) {
      return "Tunisia is a unitary semi-presidential republic. The country underwent a democratic transition following the 2011 revolution (part of the Arab Spring), which began in Tunisia and inspired movements across the region. Tunisia has a multi-party system with an elected president and parliament. The country is known for its relatively progressive approach in the Arab world, particularly regarding women's rights and civil liberties. For current political information, I recommend checking recent news sources.";
    }
    
    // Economy / Business / Work
    if (q.includes('economy') || q.includes('business') || q.includes('work') || q.includes('job') || q.includes('industry') || q.includes('gdp')) {
      return "Tunisia has a diversified economy based on agriculture (especially olives, dates, citrus), tourism (a major source of revenue), manufacturing (textiles, automotive components), phosphate mining, and petroleum production. The country has strong trade ties with Europe, particularly France, Italy, and Germany. The service sector accounts for about 60% of GDP. Tunisia has invested heavily in education and produces many engineers and skilled workers. The government encourages foreign investment and entrepreneurship, particularly in technology and renewable energy sectors.";
    }
    
    // Duration of visit / How long to stay
    if (q.includes('how long') || q.includes('duration') || q.includes('how many days') || q.includes('week') || q.includes('days')) {
      return "The ideal duration depends on what you want to see! For a quick overview: 3-4 days (Tunis, Carthage, Sidi Bou Said). For beaches and culture: 5-7 days (add Hammamet or Sousse). For a comprehensive trip: 10-14 days (includes coast, desert, and cultural sites). Recommended 2-week itinerary: Tunis and Carthage (2 days), Sidi Bou Said (1 day), Hammamet or Sousse (2-3 days), Kairouan (1 day), El Djem (half day), Sahara Desert including Tozeur, Douz, and Matmata (4-5 days), Djerba Island (2-3 days). Tunisia rewards longer stays!";
    }
    
    // Medical tourism / Healthcare
    if (q.includes('medical') || q.includes('healthcare') || q.includes('clinic') || q.includes('surgery') || q.includes('dental')) {
      return "Tunisia is an emerging medical tourism destination! The country offers high-quality, affordable medical services including dental care, cosmetic surgery, ophthalmology, and thalassotherapy (seawater therapy). Many doctors are trained in France and speak multiple languages. Medical care costs 40-60% less than in Europe or North America while maintaining international standards. Major cities have modern private clinics and hospitals. Tunisia is particularly famous for its thalassotherapy centers along the coast, offering therapeutic spa treatments using seawater and marine products.";
    }
    
    // Religion sites / Mosques / Churches / Synagogues
    if (q.includes('mosque') || q.includes('church') || q.includes('synagogue') || q.includes('religious site') || q.includes('zitouna') || q.includes('ghriba')) {
      return "Tunisia has significant religious sites! Major mosques: Zitouna Mosque in Tunis (oldest in the capital, dating to 732 AD), Great Mosque of Kairouan (one of Islam's holiest sites and architectural masterpiece), Mosque of Uqba, and mosques in Sousse and Monastir. The El Ghriba Synagogue in Djerba is one of the oldest synagogues in the world and a pilgrimage site for Jews. There are also several historic churches, particularly in Tunis and Carthage. Non-Muslims can visit some mosques outside prayer times, but dress modestly and ask permission.";
    }
    
    // Traditional dress / Clothing
    if (q.includes('traditional dress') || q.includes('clothing') || q.includes('what to wear') || q.includes('dress code') || q.includes('sefsari') || q.includes('jebba')) {
      return "Traditional Tunisian clothing is colorful and elegant! Men wear the 'jebba' (long tunic) with a 'farmla' (vest) and 'chechia' (red felt hat). Women wear the 'sefsari' (white silk wrap) in some regions, though modern dress is common in cities. For visitors: Casual, comfortable clothing is fine in tourist areas and beaches. In cities and religious sites, dress modestly - cover shoulders, avoid low necklines, wear pants/skirts below the knee. Beachwear is only for the beach/pool. A light scarf is useful for women visiting mosques. In general, Tunisia is quite relaxed, but respect local customs outside resort areas.";
    }
    
    // Hammam / Spa / Thalassotherapy
    if (q.includes('hammam') || q.includes('spa') || q.includes('thalasso') || q.includes('massage') || q.includes('wellness') || q.includes('bath')) {
      return "Tunisia is famous for its wellness traditions! Hammams (traditional Turkish baths) offer steam rooms, exfoliating scrubs (gommage), and massages - a deeply cleansing and relaxing experience. Both tourist hammams and authentic local ones exist. Thalassotherapy uses heated seawater and marine products for therapeutic treatments - Tunisia has world-class thalasso centers in Hammamet, Sousse, Djerba, and Tabarka. Treatments include hydrotherapy, algae wraps, and massages for stress relief, skin care, and pain management. It's an affordable luxury compared to Europe. Book spa treatments in advance during peak season!";
    }
    
    // Wildlife / Nature / National Parks
    if (q.includes('wildlife') || q.includes('animal') || q.includes('nature') || q.includes('national park') || q.includes('bird') || q.includes('flamingo')) {
      return "Tunisia has diverse wildlife and ecosystems! Ichkeul National Park (UNESCO site) is vital for migratory birds with thousands of flamingos, ducks, and storks. The Sahara has fennec foxes, gazelles, and reptiles. Coastal areas host sea turtles and dolphins. Djerba attracts pink flamingos. Boukornine National Park near Tunis offers hiking with wild boar and porcupines. Chambi National Park has mountains and Atlas cedar forests. The island of La Galite is a marine reserve. Bird watching is excellent, especially during migration seasons (spring and autumn). Tunisia's varied geography supports Mediterranean, mountain, desert, and wetland species!";
    }
    
    // Festivals / Events / Celebrations
    if (q.includes('festival') || q.includes('event') || q.includes('celebration') || q.includes('concert') || q.includes('carthage festival')) {
      return "Tunisia hosts vibrant festivals year-round! Major events include: Carthage International Festival (July-August) - music, theater, and performances in ancient Roman theaters; Sahara Festival in Douz (December) - desert culture with camel races, traditional music, and poetry; Tabarka Jazz Festival (July); International Festival of the Medina in Tunis; Djerba Ulysses Festival; El Jem Symphonic Music Festival in the Roman amphitheater; and the Ksour Festival in Tataouine. Religious celebrations include Eid al-Fitr and Eid al-Adha. Local moussems (saint festivals) happen throughout the year. Check event calendars before your trip!";
    }
    
    // Olive oil / Agriculture / Dates
    if (q.includes('olive') || q.includes('date') || q.includes('agriculture') || q.includes('farming') || q.includes('harvest')) {
      return "Tunisia is a major agricultural producer! The country is the world's 4th largest olive oil producer and 2nd largest exporter. Tunisian olive oil is renowned for its quality, particularly the organic varieties. Dates are another key export - Deglet Nour dates from the oases are considered among the world's finest and are called 'fingers of light.' Other important crops include citrus fruits (especially from Cap Bon region), almonds, figs, grapes, and grains. You can visit olive groves and date palm oases, attend olive harvest festivals (October-January), and buy high-quality olive oil and dates as souvenirs!";
    }
    
    // Jewish heritage / Jewish community
    if (q.includes('jewish') || q.includes('jew') || q.includes('judaism') || q.includes('ghriba')) {
      return "Tunisia has a rich Jewish heritage! Jews have lived in Tunisia for over 2,000 years. The El Ghriba Synagogue on Djerba island is one of the oldest synagogues in the world (legend says it was built in 586 BCE) and remains an active pilgrimage site. The annual Lag BaOmer pilgrimage (usually in May) attracts thousands of Jewish pilgrims. Historic Jewish quarters (haras) exist in Tunis and other cities. While the Jewish population has decreased significantly since the 1960s (from 100,000 to about 1,000 today), the community maintains synagogues, kosher facilities, and cultural sites. Tunisia's Jewish heritage is an integral part of the country's diverse cultural tapestry.";
    }
    
    // Scams / Tourist traps / Precautions
    if (q.includes('scam') || q.includes('tourist trap') || q.includes('cheat') || q.includes('fake') || q.includes('beware') || q.includes('careful')) {
      return "While Tunisia is generally safe, be aware of common tourist situations: In souks, shopkeepers may inflate prices - always haggle and don't feel pressured to buy. Some guides offer 'free' tours then demand large tips - agree on prices upfront. Taxi drivers may not use meters - insist on the meter or agree on a price before starting. 'Helpful' strangers at tourist sites may demand payment for unsolicited guidance. Restaurants in ultra-touristy areas can overcharge - check prices and bills carefully. At carpet shops, high-pressure sales tactics are common - take your time deciding. Trust official tourist guides and licensed services. Most Tunisians are genuinely friendly and honest, but stay alert in heavy tourist areas!";
    }
    
    // Books / Movies / Star Wars
    if (q.includes('book') || q.includes('movie') || q.includes('film') || q.includes('star wars') || q.includes('tatooine') || q.includes('read')) {
      return "Tunisia features prominently in cinema! Star Wars was filmed here - locations include: Matmata (Luke Skywalker's home), Tozeur and Nefta (Mos Espa), Chott el Jerid (Tatooine landscapes), and Ajim on Djerba (Mos Eisley). The English Patient, Raiders of the Lost Ark, Monty Python's Life of Brian, and Gladiator also filmed in Tunisia. To understand Tunisia better, read 'The Pillar of Salt' by Albert Memmi, works by Tahar Ben Jelloun, or 'Carthage Must Be Destroyed' for ancient history. Before visiting, watch 'The Last of Us' documentary series or 'Halfaouine: Boy of the Terraces' for cultural insight!";
    }
    
    // Default response
    return "That's a great question about Tunisia! While I can provide general information about Tunisia's geography, culture, history, tourism, and daily life, I'd recommend checking official tourism websites or asking me a more specific question. I'm here to help with anything about visiting Tunisia - from ancient ruins to desert adventures, cuisine to culture, beaches to practical travel tips. What specific aspect of Tunisia interests you most?";
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

  // Add message to chat
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

  // Send quick question
  function sendQuickQuestion(question) {
    chatInput.value = question;
    sendMessage(question);
  }

  // Event listeners
  chatSend.addEventListener('click', () => sendMessage(chatInput.value));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage(chatInput.value);
  });

  // Expose sendQuickQuestion globally for HTML onclick
  window.sendQuickQuestion = sendQuickQuestion;
});