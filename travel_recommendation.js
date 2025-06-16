document.addEventListener('DOMContentLoaded', () => {
    const travelData = {
        "countries": [
            { "id": 1, "name": "Australia", "cities": [
                { "name": "Sydney, Australia", "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/93/a7/be/sydney-opera-house.jpg?w=900&h=500&s=1", "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Harbour Bridge." },
                { "name": "Melbourne, Australia", "imageUrl": "https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2018/10/melbourne-panoramica-noturna-australia-477607498.jpg", "description": "Known for its laneway cafes, cultural institutions, and a lively arts scene." }
            ]},
            { "id": 2, "name": "Japan", "cities": [
                { "name": "Tokyo, Japan", "imageUrl": "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/gettyimages-1390815938?_a=BAVAZGDX0", "description": "A bustling metropolis blending traditional temples with futuristic skyscrapers." },
                { "name": "Kyoto, Japan", "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/e6/6d/87/caption.jpg?w=1200&h=700&s=1&cx=2550&cy=1700&chk=v1_07f8c3fadbb1e4b056fe", "description": "Famous for its classical Buddhist temples, gardens, imperial palaces, and traditional wood houses." }
            ]},
            { "id": 3, "name": "Brazil", "cities": [
                { "name": "Rio de Janeiro, Brazil", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/960px-Cidade_Maravilhosa.jpg", "description": "Known for its Copacabana and Ipanema beaches, and the Christ the Redeemer statue." },
                { "name": "São Paulo, Brazil", "imageUrl": "https://travelwandergrow.com/wp-content/uploads/2023/06/Sao-Paulo-scaled.jpeg", "description": "Brazil's vibrant financial center, with numerous cultural institutions and a rich architectural tradition." }
            ]}
        ],
        "temples": [
            { "id": 1, "name": "Senso-ji Temple, Tokyo", "imageUrl": "https://en.japantravel.com/photo/poi-5-214199/1200x630/tokyo-sensoji-temple-214199.jpg", "description": "An ancient Buddhist temple located in Asakusa, Tokyo, Japan. It is Tokyo's oldest temple." },
            { "id": 2, "name": "Kinkaku-ji, Kyoto", "imageUrl": "https://www.japan-guide.com/g18/3908_top.jpg", "description": "The Temple of the Golden Pavilion, a Zen Buddhist temple in Kyoto, Japan." }
        ],
        "beaches": [
            { "id": 1, "name": "Bondi Beach, Sydney", "imageUrl": "https://www.tahititourisme.com/app/uploads/iris-images/23893/cg.v-bora-dscf2511b-hi-scaled-4-1600x800-f50_50.jpg", "description": "One of Australia's most famous beaches, offering great surf, cafes, and coastal walks." },
            { "id": 2, "name": "Copacabana Beach, Rio", "imageUrl": "https://voyeglobal.com/wp-content/uploads/2025/02/thumbnail-23.jpg", "description": "A 4 km balneario beach in Rio de Janeiro, Brazil, famous for its promenade." }
        ]
    };

    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');

    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    const recommendationsPanel = document.getElementById('recommendations');
    const resultsContainer = document.getElementById('results-container');
    
    function showSection(sectionToShow) {
        
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'none';
             
        recommendationsPanel.style.display = 'none'; 
        
        if (sectionToShow === 'home') {
            homeSection.style.display = 'flex';
        } else if (sectionToShow === 'about') {
            aboutSection.style.display = 'flex';
        } else if (sectionToShow === 'contact') {
            contactSection.style.display = 'flex';
        }
    }
    
    homeLink.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
    aboutLink.addEventListener('click', (e) => { e.preventDefault(); showSection('about'); });
    contactLink.addEventListener('click', (e) => { e.preventDefault(); showSection('contact'); });

    const handleSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            resultsContainer.innerHTML = ''; 
            recommendationsPanel.style.display = 'none'; 
            return;
        }

       let results = [];
const keyword = query.toLowerCase();

if (keyword.includes('beach')) {
    results = travelData.beaches;
} else if (keyword.includes('temple')) {
    results = travelData.temples;
} else if (keyword === 'country') {
    // When the query is exactly 'country', return all cities from all countries.
    travelData.countries.forEach(country => {
        results = results.concat(country.cities);
    });
} else {
    travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(keyword)) {
            results = results.concat(country.cities);
        }
    });
}

        showSection('home');
        displayRecommendations(results);
        recommendationsPanel.style.display = 'block'; 
    };

    function displayRecommendations(results) {
        resultsContainer.innerHTML = ''; 
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p style="color:white; text-align:center;">No results found.</p>';
            return;
        }

        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/CCCCCC/FFFFFF?text=Image+Not+Found';">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <a href="#" class="visit-btn">Visit</a>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
        recommendationsPanel.style.display = 'none';
        showSection('home');
    });
    
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    function displayTime() {
        const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const nyTime = new Date().toLocaleTimeString('en-US', options);
        console.log(`Current time in New York: ${nyTime}`);
    }

    setInterval(displayTime, 60000); 
});
