const projects = [
    {
        id: 1,
        title: 'Emlak Konut Ispartakule Evleri',
        category: 'residences',
        image: 'img/1.jpg',
        description: 'İstanbul / Ispartakule'
    },
    {
        id: 2,
        title: 'Emlak Konut Avrupark Hayat 2',
        category: 'residences',
        image: 'img/2.jpg',
        description: 'İstanbul'
    },
    {
        id: 3,
        title: 'Emlak Konut Kartal Yakacık Okulu',
        category: 'education',
        image: 'img/3.jpg',
        description: 'İstanbul / Kartal'
    },
    {
        id: 4,
        title: 'İPKB İSOV Zincirlikuyu Meslek Lisesi',
        category: 'education',
        image: 'img/4.jpg',
        description: 'İstanbul / Zincirlikuyu'
    },
    {
        id: 5,
        title: 'Ataköy Medicana Divan Kafe',
        category: 'commercial',
        image: 'img/5.jpg',
        description: 'İstanbul / Ataköy'
    },
    {
        id: 6,
        title: 'Zincirlikuyu Medicana Divan Kafe',
        category: 'commercial',
        image: 'img/6.jpg',
        description: 'İstanbul / Zincirlikuyu'
    },
    {
        id: 7,
        title: 'Emlak Konut İstanbul Ümraniye Çakmak',
        category: 'residences',
        image: 'img/7.jpeg',
        description: 'Kentsel Dönüşüm Projesi - İstanbul / Ümraniye'
    },
    {
        id: 8,
        title: 'TOKİ Başakşehir Kayabaşı',
        category: 'residences',
        image: 'img/8.jpg',
        description: 'İstanbul / Başakşehir'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!galleryGrid) {
        console.error('Gallery grid element not found!');
        return;
    }

    function displayProjects(category = 'all') {
        try {
            galleryGrid.innerHTML = '';

            const filteredProjects = category === 'all' 
                ? projects 
                : projects.filter(project => project.category === category);

            filteredProjects.forEach(project => {
                const projectHTML = `
                    <article class="project-card wow fadeInUp" data-wow-delay="0.2s">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}" 
                                 onerror="this.onerror=null; this.src='img/placeholder.jpg';">
                            <div class="project-overlay">
                                <div class="project-info">
                                    <h3>${project.title}</h3>
                                    <p>${project.description}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
                galleryGrid.insertAdjacentHTML('beforeend', projectHTML);
            });

            if (typeof WOW !== 'undefined') {
                new WOW().init();
            }
        } catch (error) {
            console.error('Error displaying projects:', error);
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            displayProjects(category);
        });
    });

    displayProjects('all');
}); 