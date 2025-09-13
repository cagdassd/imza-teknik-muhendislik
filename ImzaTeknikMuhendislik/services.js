const serviceContents = {
    'sihhi-tesisat': {
        title: 'Sıhhi Tesisat',
        description: `Sıhhi tesisat sistemleri, modern yapıların temel ihtiyaçlarından biridir. Uzman ekibimiz, temiz su, pis su ve yağmur suyu tesisatları için profesyonel çözümler sunar.
        
        Hizmetlerimiz arasında:
        • Temiz su tesisatı
        • Pis su tesisatı
        • Yağmur suyu tesisatı
        • Hidrofor sistemleri bulunmaktadır.`,
        images: [
            'img/Sihhi1.png',
            'img/sihhhhi.jpeg'
        ]
    },
    'isitma-tesisatlari': {
        title: 'Isıtma Tesisatları',
        description: `Modern ve verimli ısıtma sistemleri ile yaşam alanlarınızda maksimum konfor sağlıyoruz. Merkezi ısıtma sistemlerinden bireysel çözümlere kadar geniş bir yelpazede hizmet sunuyoruz.
        
        Uzman ekibimiz:
        • Kazan sistemleri
        • Yerden ısıtma
        • Radyatör sistemleri
        • Isı pompası uygulamaları konularında hizmet vermektedir.`,
        images: [
            'img/Isıtma1.png',
            'img/isitmaa1.jpeg'
        ]
    },
    'dogalgaz-tesisatlari': {
        title: 'Doğalgaz Tesisatları',
        description: `Doğalgaz tesisatı konusunda uzman ekibimizle, güvenli ve verimli sistemler kuruyoruz. Projelendirmeden uygulamaya kadar tüm süreçlerde profesyonel hizmet sunuyoruz.
        
        Hizmetlerimiz:
        • Doğalgaz tesisat projelendirme
        • Doğalgaz dönüşüm sistemleri
        • Endüstriyel doğalgaz sistemleri
        • Bakım ve onarım hizmetleri`,
        images: [
            'img/dogalgazz.jpeg',
            'img/Dogalgaz2.png'
        ]
    },
    'yangin-tesisatlari': {
        title: 'Yangın Tesisatları',
        description: `Yangın güvenliği sistemleri konusunda kapsamlı çözümler sunuyoruz. Modern teknoloji ve uzman kadromuzla can ve mal güvenliğinizi koruyoruz.
        
        Hizmetlerimiz:
        • Sprinkler sistemleri
        • Yangın dolapları
        • Hidrant sistemleri
        • Köpüklü söndürme sistemleri`,
        images: [
            'img/yangin.jpeg',
            'img/yannginn.jpeg'
        ]
    },
    'havalandirma-tesisatlari': {
        title: 'Havalandırma Tesisatları',
        description: `Havalandırma sistemleri ile iç mekan hava kalitesini artırıyor, sağlıklı ve konforlu ortamlar yaratıyoruz.
        
        Sistemlerimiz:
        • Merkezi havalandırma
        • Egzoz sistemleri
        • Taze hava sistemleri
        • Endüstriyel havalandırma`,
        images: [
            'img/Havalandirmaa.jpeg',
            'img/Havalandirmaa2.jpeg'
        ]
    },
    'iklimlendirme': {
        title: 'İklimlendirme',
        description: `İklimlendirme sistemleri ile yaşam ve çalışma alanlarınızda ideal ortam koşullarını sağlıyoruz. Modern ve enerji verimli çözümlerle konfor ve tasarrufu bir arada sunuyoruz.
        
        Hizmetlerimiz:
        • VRF sistemleri
        • Chiller sistemleri
        • Fan coil üniteleri
        • Hassas kontrollü klimalar`,
        images: [
            'img/iklimlendirme.png',
            'img/iklimlendirme2.png'
        ]
    },
    'buhar-tesisatlari': {
        title: 'Buhar Tesisatları',
        description: `Endüstriyel tesisler için buhar sistemleri kurulumu ve bakımı yapıyoruz. Verimli ve güvenli buhar tesisatları ile üretiminizi destekliyoruz.
        
        Hizmetlerimiz:
        • Buhar kazanları
        • Buhar dağıtım hatları
        • Kondens hatları
        • Buhar kapanları`,
        images: [
            'img/Buhar.jpeg',
            'img/Pdogalgaz.jpg'
        ]
    },
    'evaporatif-tesisat': {
        title: 'Evaporatif Tesisat',
        description: `Evaporatif soğutma sistemleri ile enerji tasarruflu serinletme çözümleri sunuyoruz. Özellikle geniş alanlar için ideal olan bu sistemlerle maliyetlerinizi düşürüyoruz.
        
        Sistemlerimiz:
        • Endüstriyel evaporatif soğutma
        • Nem kontrol sistemleri
        • Direkt/endirekt evaporatif soğutma
        • Hibrit sistemler`,
        images: [
            'img/Evaporatif.png',
            'img/Evaporatif2.png'
        ]
    }
};

// URL'den hizmet ID'sini al
function getServiceIdFromUrl() {
    const hash = window.location.hash.slice(1);
    return hash && serviceContents[hash] ? hash : 'sihhi-tesisat';
}

document.addEventListener('DOMContentLoaded', () => {
    const initialServiceId = getServiceIdFromUrl();
    showService(initialServiceId);
    
    const activeLink = document.querySelector(`[data-service="${initialServiceId}"]`);
    if (activeLink) {
        document.querySelector('.service-link.active')?.classList.remove('active');
        activeLink.classList.add('active');
    }

    window.addEventListener('hashchange', () => {
        const serviceId = getServiceIdFromUrl();
        showService(serviceId);
        
        document.querySelector('.service-link.active')?.classList.remove('active');
        document.querySelector(`[data-service="${serviceId}"]`)?.classList.add('active');
    });

    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceId = link.dataset.service;
            
            window.location.hash = serviceId;
        });
    });
});

function showService(serviceId) {
    const service = serviceContents[serviceId];
    if (!service) return;

    const contentSection = document.querySelector('.service-content');
    contentSection.innerHTML = `
        <div class="service-header">
            <h1>${service.title}</h1>
        </div>
        <div class="service-description">
            ${service.description.split('\n').map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="service-gallery">
            ${service.images.map(img => `
                <div class="gallery-item">
                    <img src="${img}" alt="${service.title}">
                </div>
            `).join('')}
        </div>
    `;
} 