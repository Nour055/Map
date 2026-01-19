
document.addEventListener('DOMContentLoaded', () => {

  // 1. GOVERNORATES MODAL

  const modal = document.getElementById('governorateModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalImages = document.getElementById('modalImages');
  const modalInfo = document.getElementById('modalInfo');
  const closeBtn = document.getElementById('modalClose');
  const backBtn = document.getElementById('modalBack');

  // Click on map areas
  if (modal) {
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
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Show governorate informations
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
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }

  // Show map
  function showMap() {
    closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 2. NAVIGATION 

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

    // Hash match 
    if (href === currentHash && currentHash !== "") {
      link.classList.add("active");
    }
  });

  // 3. TIMELINE ANIMATIONS

  const events = document.querySelectorAll('.timeline-event');

  if (events.length > 0) {
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
  }

  // 4. TABS MANAGEMENT

  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.classList.add('active');
    });
  });

  // 5. CHATBOT 
 
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const quickQuestions = document.getElementById('quickQuestions');
  let isLoading = false;

  if (chatToggle && chatPanel) {

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
      
      // Greetings
      if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('salam') || q.includes('ahlan') || q.includes('asslemaa') || q.includes('السلام') || q.includes('bonjour')) {
        return "Asslemaa! 👋 Welcome! I'm your Tunisia guide assistant. I can help you with information about Tunisia's cities, attractions, food, culture, history, and travel tips. What would you like to know?";
      }
      
      // Currency
      if (q.includes('currency') || q.includes('money') || q.includes('dinar') || q.includes('tnd') || q.includes('exchange') || q.includes('cash')) {
        return "The currency in Tunisia is the Tunisian Dinar (TND). As of recent rates, 1 EUR ≈ 3.40 TND and 1 USD ≈ 3.10 TND. You can exchange money at banks, airports, or authorized exchange offices. ATMs are widely available in cities. It's illegal to import or export Tunisian dinars, so exchange remaining money before leaving!";
      }
      
      // Food
      if (q.includes('food') || q.includes('cuisine') || q.includes('dish') || q.includes('eat') || q.includes('couscous') || q.includes('brik') || q.includes('harissa')) {
        return "Tunisian cuisine is absolutely delicious! Must-try dishes include: Couscous (Friday tradition), Brik (crispy pastry with egg), Lablabi (chickpea soup), Ojja (spicy egg dish), Mechouia salad, Fricassé (fried bread sandwich), and Makroudh (date-filled cookies). Don't miss mint tea and Turkish coffee! Harissa (spicy paste) is Tunisia's signature condiment. The food combines Mediterranean, Arabic, and Berber flavors beautifully!";
      }
      
      // Tourist sites / Places to visit
      if (q.includes('tourist') || q.includes('visit') || q.includes('site') || q.includes('attraction') || q.includes('place') || q.includes('see') || q.includes('destination')) {
        return "Tunisia has incredible sites to visit! Top attractions: Carthage ruins (ancient Phoenician city), Sidi Bou Said (blue & white village), Medina of Tunis (UNESCO), El Djem amphitheater (Roman colosseum), Sahara Desert (camel treks in Douz), Matmata (underground homes & Star Wars filming), Kairouan (holy city with Great Mosque), Djerba island (beaches & culture), Chott el Jerid (salt lake), and Bardo Museum (amazing mosaics). Each region offers unique experiences!";
      }
      
      // Weather / Climate / Best time
      if (q.includes('weather') || q.includes('climate') || q.includes('temperature') || q.includes('season') || q.includes('best time') || q.includes('when to visit') || q.includes('hot') || q.includes('cold')) {
        return "Tunisia has a Mediterranean climate. Best times to visit: Spring (March-May) and Fall (September-November) - pleasant temperatures (20-28°C). Summer (June-August) is hot, especially inland (30-40°C), but perfect for beaches. Winter (December-February) is mild on the coast (10-18°C) but can be cold in the mountains. The Sahara is scorching in summer; visit October-April. Coastal areas are comfortable year-round!";
      }
      
      // Language
      if (q.includes('language') || q.includes('speak') || q.includes('arabic') || q.includes('french') || q.includes('english')) {
        return "The official language is Arabic (Tunisian dialect is quite unique!). French is widely spoken, especially in cities, tourism, and business. Many young people speak English, particularly in tourist areas. Italian is also understood in some places. Learning a few Arabic phrases like 'Asslemaa' (hello), 'Choukran' (thank you), and 'Beslama' (goodbye) is appreciated and will earn you smiles!";
      }
      
      // Safety / Security
      if (q.includes('safe') || q.includes('safety') || q.includes('security') || q.includes('dangerous') || q.includes('crime')) {
        return "Tunisia is generally safe for tourists! Major cities and tourist areas have good security. Normal precautions apply: watch your belongings in crowded places, avoid isolated areas at night, use official taxis or ride-sharing apps. The southern border regions near Libya and Algeria should be avoided due to travel advisories. Tunisians are known for their hospitality and friendliness. Always follow local advice and check your government's travel advisories before visiting.";
      }
      
      // Transportation / Getting around
      if (q.includes('transport') || q.includes('taxi') || q.includes('bus') || q.includes('train') || q.includes('car') || q.includes('metro') || q.includes('getting around') || q.includes('louage')) {
        return "Transportation in Tunisia: Louages (shared minivans) are cheap and efficient between cities. Trains connect major cities (Tunis-Sousse-Sfax corridor). City buses are available but can be crowded. Tunis has a modern metro/tram system. Taxis are affordable - insist on using the meter or agree on price beforehand. Ride-sharing apps like Bolt work in Tunis. Renting a car gives flexibility for exploring (international license required). Domestic flights connect Tunis with Djerba, Tozeur, and Sfax.";
      }
      
      // Beaches / Coast
      if (q.includes('beach') || q.includes('coast') || q.includes('sea') || q.includes('mediterranean') || q.includes('swim')) {
        return "Tunisia has stunning beaches! Popular beach destinations: Hammamet (golden sands, resorts), Sousse & Monastir (family-friendly beaches), Djerba (turquoise waters, all-inclusive resorts), Tabarka (coral reefs, diving), Mahdia (quieter, authentic), Bizerte (less touristy), and Kerkennah Islands (peaceful, pristine). Most beaches are sandy with calm Mediterranean waters. Many hotels have private beaches. Summer (June-September) is peak beach season. Water activities include diving, snorkeling, jet skiing, and parasailing!";
      }
      
      // Desert / Sahara
      if (q.includes('desert') || q.includes('sahara') || q.includes('sand') || q.includes('dune') || q.includes('camel')) {
        return "The Sahara Desert in southern Tunisia is magical! Top experiences: Douz (gateway to Sahara, camel treks), Ksar Ghilane (hot springs & dunes), Chott el Jerid (massive salt lake), Tozeur (oasis town, palm groves), Nefta (spiritual oasis), and Matmata (underground troglodyte homes). Take a camel trek, sleep under stars in Berber camps, visit desert oases, and explore Star Wars filming locations! Best time: October-April (avoid summer heat). 4x4 desert tours are unforgettable. Don't forget sunscreen and water!";
      }
      
      // History / Ancient sites
      if (q.includes('history') || q.includes('ancient') || q.includes('roman') || q.includes('carthage') || q.includes('hannibal') || q.includes('phoenician')) {
        return "Tunisia has incredible ancient history! Carthage was a powerful Phoenician city (814 BC) - rival to Rome until the Punic Wars. Explore Carthage archaeological site, Antonine Baths, and Byrsa Hill. El Djem's amphitheater is one of the world's best-preserved Roman buildings (3rd century AD). Dougga has stunning Roman ruins (UNESCO site). Bulla Regia features unique underground Roman villas. Tunisia was ruled by Phoenicians, Romans, Vandals, Byzantines, Arabs, Ottomans, and French. Visit the Bardo Museum for world-class Roman mosaics!";
      }
      
      // Culture / Traditions
      if (q.includes('culture') || q.includes('tradition') || q.includes('custom') || q.includes('festival') || q.includes('music') || q.includes('art')) {
        return "Tunisian culture is wonderfully diverse! It blends Arab, Berber, African, Turkish, and Mediterranean influences. Traditional music includes Malouf (Andalusian) and Stambeli (African roots). Festivals: Carthage International Festival (summer performances), Sahara Festival in Douz (December), and various music & arts events. Handicrafts: carpet weaving, pottery, copper work, and embroidery. Souks (markets) are vibrant cultural experiences. Coffee culture is strong - cafés are social hubs. Family is central to Tunisian life. Don't miss visiting a hammam (traditional bath)!";
      }
      
      // Visa / Entry requirements
      if (q.includes('visa') || q.includes('passport') || q.includes('entry') || q.includes('requirement') || q.includes('need visa')) {
        return "Visa requirements for Tunisia: Many nationalities (including EU, US, Canada, UK, Australia) can enter visa-free for 90 days for tourism. Your passport must be valid for at least 6 months beyond your stay. Some nationalities need a visa - check with Tunisian embassy. Citizens of some Arab and African countries can enter with ID cards. Always verify current requirements before travel, as policies can change. Entry/exit stamps are important - keep track of your 90-day limit!";
      }
      
      // Shopping / Souvenirs
      if (q.includes('shop') || q.includes('souvenir') || q.includes('buy') || q.includes('market') || q.includes('souk') || q.includes('medina') || q.includes('handicraft')) {
        return "Shopping in Tunisia is an adventure! Best souvenirs: Berber carpets & rugs (Kairouan is famous for these), pottery & ceramics (Nabeul), olive wood products, leather goods (bags, shoes), chechia (traditional red felt hats), silver jewelry, olive oil & harissa, Tunisian spices, traditional clothing, and hand-woven textiles. Shop in medinas (old markets) where haggling is expected - start at 30-50% of asking price. Fixed-price government shops (ONAT) offer quality handicrafts without bargaining. Avoid buying coral or protected species products!";
      }
      
      // Religion / Islam
      if (q.includes('religion') || q.includes('islam') || q.includes('muslim') || q.includes('mosque') || q.includes('ramadan')) {
        return "Tunisia is predominantly Muslim (about 98%), with a secular government and moderate Islamic practice. Five daily prayers are observed, and you'll hear the call to prayer (azan). During Ramadan (9th Islamic month), Muslims fast from dawn to sunset - some restaurants may be closed during day. Mosques are generally not open to non-Muslims, but some historic ones allow visitors outside prayer times - dress modestly (covered shoulders, knees, head covering for women). Friday is the holy day. Tunisia has a small Jewish community (Djerba) and Christian minority. Religious tolerance is part of Tunisian identity.";
      }
      
      // Accommodation / Hotels
      if (q.includes('hotel') || q.includes('accommodation') || q.includes('stay') || q.includes('hostel') || q.includes('resort') || q.includes('where to stay')) {
        return "Tunisia offers diverse accommodations! Options: Luxury beach resorts (Hammamet, Djerba, Sousse - all-inclusive options), Boutique hotels in medinas (riads with traditional architecture), Modern hotels in city centers, Budget hostels (Tunis, Sousse), Desert camps (glamping in Sahara), and Guesthouses/Airbnb. Popular areas: Tunis (sightseeing base), Hammamet (beach resort town), Sousse (beaches & nightlife), Djerba (island relaxation), Tozeur (desert gateway). Book ahead in peak season (July-August). Prices are generally reasonable compared to Europe. All-inclusive resorts are very popular!";
      }
      
      // Health / Medical
      if (q.includes('health') || q.includes('medical') || q.includes('doctor') || q.includes('hospital') || q.includes('sick') || q.includes('insurance') || q.includes('vaccine')) {
        return "Health tips for Tunisia: No mandatory vaccinations, but Hepatitis A & B, typhoid, and routine vaccines are recommended. Tap water is generally safe in cities but drink bottled water to be cautious. Travel insurance with medical coverage is essential. Pharmacies (marked with green cross) are widespread and pharmacists can help with minor issues. Major cities have good hospitals and English-speaking doctors. Common traveler issues: sun exposure (use sunscreen!), dehydration (drink lots of water), and occasional stomach issues (eat at busy restaurants). Emergency number: 190. EU residents: bring European Health Insurance Card (EHIC).";
      }
      
      // Internet / WiFi / Phone
      if (q.includes('internet') || q.includes('wifi') || q.includes('phone') || q.includes('sim card') || q.includes('data') || q.includes('connection')) {
        return "Internet & phones in Tunisia: WiFi is available in most hotels, cafés, and restaurants (ask for password - 'mot de passe'). Public WiFi is common in cities. For mobile data, buy a local SIM card (Ooredoo, Orange, or Tunisie Télécom) - very affordable! SIM cards require passport for registration. 4G coverage is good in cities and tourist areas. International roaming can be expensive - local SIM is better value. WhatsApp, social media, and messaging apps work well. Most restaurants and attractions are on Google Maps. Bring a universal power adapter (Tunisia uses European plugs, 230V).";
      }
      
      // Tipping / Etiquette
      if (q.includes('tip') || q.includes('tipping') || q.includes('etiquette') || q.includes('custom') || q.includes('manners') || q.includes('polite')) {
        return "Tunisian etiquette & tipping: Tipping is appreciated but not mandatory. Restaurants: 5-10% if service charge not included. Taxis: round up fare. Hotel staff: 1-2 TND for bellhop/housekeeping. Guides: 5-10 TND per person. Cultural tips: Greet with 'Asslemaa' and handshakes (wait for women to extend hand first). Remove shoes when entering homes. Use right hand for eating/giving. Dress modestly outside beach resorts. Accept offered mint tea - it's hospitality. During Ramadan, don't eat/drink publicly during daytime. Photography: ask permission before photographing people. Haggling is expected in souks - keep it friendly!";
      }
      
      // Price / Budget / Cost
      if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('expensive') || q.includes('cheap') || q.includes('how much')) {
        return "Tunisia is quite affordable! Sample costs (TND): Budget meal: 10-20, mid-range restaurant: 30-60, coffee: 2-5, bottled water: 1-2, local transport: 1-3, taxi ride: 5-15, desert tour: 150-400, museum entry: 5-15, hotel (budget): 80-150, hotel (mid-range): 150-400. All-inclusive beach resorts offer excellent value. Street food (brik, fricassé) is 3-8 TND. Local souks are cheaper than tourist shops. Daily budget: Backpacker ~100 TND, mid-range ~250 TND, luxury ~500+ TND. Credit cards accepted in hotels/large restaurants, but cash (TND) is essential for small businesses and souks!";
      }
      
      // Map / Geography / Location
      if (q.includes('map') || q.includes('where is') || q.includes('location') || q.includes('geography') || q.includes('size') || q.includes('border')) {
        return "Tunisia is in North Africa, bordering the Mediterranean Sea (north & east), Algeria (west), and Libya (southeast). It's the smallest North African country at 163,610 km². Shape: roughly rectangular with northern point. The country extends from Mediterranean coast to Sahara Desert. Capital: Tunis (northeast coast). Highest point: Jebel Chambi (1,544m). Major regions: Northern mountains, coastal plains, central steppes, southern Sahara. About 40% is desert. Tunisia is closer to Europe (Sicily 140km away) than to most African countries. Strategic Mediterranean location has shaped its history as a crossroads of civilizations!";
      }
      
      // Nightlife / Entertainment
      if (q.includes('nightlife') || q.includes('bar') || q.includes('club') || q.includes('night') || q.includes('party') || q.includes('drink') || q.includes('alcohol')) {
        return "Tunisia's nightlife varies by area! Tourist zones (Hammamet, Sousse, Djerba) have bars, clubs, and beach parties - quite lively in summer. Tunis has trendy bars, lounges, and nightclubs in La Marsa and Gammarth neighborhoods. Alcohol is available in hotels, tourist restaurants, and some bars (Tunisia is relatively liberal). Local beer: Celtia. Shisha cafés are popular social spots. Traditional music venues and festivals offer cultural evening entertainment. Conservative areas have limited nightlife - tea houses and cafés. Carthage International Festival (July-Aug) features concerts in ancient settings. Sousse is known as the nightlife capital. Note: Alcohol is less common outside tourist areas.";
      }
      
      // Family travel / Kids
      if (q.includes('family') || q.includes('kid') || q.includes('child') || q.includes('children') || q.includes('baby') || q.includes('toddler')) {
        return "Tunisia is very family-friendly! Tunisians love children and are welcoming. Best family activities: Beach resorts (many have kids clubs, pools, waterslides), camel rides in Sahara, Star Wars locations (kids love Matmata!), El Djem amphitheater, Carthageland theme park, aquarium in Tunis, Friguia Park (wildlife park near Sousse), boat trips, and medina exploration. All-inclusive resorts are convenient for families. Baby facilities: diapers/formula available in cities, but bring familiar brands. Restaurants are kid-friendly. Child seats in taxis are rare. Strollers work in modern areas but medinas have narrow streets/steps. Tunisia is safe and affordable for family travel!";
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
  }

});