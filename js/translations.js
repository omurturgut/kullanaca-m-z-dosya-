// ========== MULTI-LANGUAGE SYSTEM ==========
// Translations for Posthumane Website (EN/TR)

const translations = {
    en: {
        // Header
        'header.about': 'About',
        'header.work': 'Work',
        'header.services': 'Services',
        'header.pricing': 'Pricing',
        'header.faq': 'FAQ',
        'header.manifesto': 'Manifesto',
        'header.cta': 'Book a Call',

        // Hero
        'hero.title.normal': 'Video Production,<br>Without the ',
        'hero.title.italic': 'Production',
        'hero.subtitle': 'AI video production • Vibe coding • Smart automation we make complexity disappear',
        'hero.cta.primary': 'Schedule a Consultation',
        'hero.cta.secondary': 'Explore Our Work',
        'hero.trust': 'Trusted By Teams At',
        'hero.delivery': '24h',
        'hero.delivery.label': 'Delivery Time',

        // About
        'about.label': 'ABOUT US',
        'about.title': 'We make videos, build digital products, and automate your <span class="handwritten">chaos</span>.',
        'about.description': 'We are the studio where ambitious brands plug into one connected brain. We turn complex ideas into <span class="highlight-text">AI powered videos in 24 hours</span>, apps for everything you launch, sell and manage and <span class="highlight-text">self running workflows</span> that make it all move together. One team instead of many, one system instead of fragments, <span class="highlight-text">less chaos more clarity</span>, less friction more flow, so your brand runs faster, looks sharper and feels smarter at every touchpoint.',
        'about.service1.title': 'AI Video Production',
        'about.service1.desc': 'Ads, explainers, social content, brand stories created with AI, delivered in 24 hours',
        'about.service2.title': 'Vibe Coding',
        'about.service2.desc': 'Websites, web apps, landing pages modern, fast, and built to convert',
        'about.service3.title': 'Smart Automation',
        'about.service3.desc': 'Connect your tools, build AI agents, eliminate repetitive tasks we make systems work for you',
        'about.founders.label': 'CORE TEAM',

        // Services
        'services.label': 'WHAT WE DO',
        'services.title': 'We Turn Ideas Into <span class="highlight">Digital Reality</span>',
        'services.subtitle': 'From concept to launch, we handle everything: AI video production, web development, and workflow automation.',

        // Portfolio
        'portfolio.label': 'OUR WORK',
        'portfolio.title': 'Projects That Made <span class="highlight">Impact</span>',

        // Case Study
        'case.label': 'CASE STUDY',
        'case.title': 'Digital Transformation of a Restaurant',
        'case.subtitle': 'From zero to fully automated operations in 30 days',
        'case.challenge.title': 'Challenge',
        'case.challenge.desc': 'The restaurant was struggling with manual order management, inventory tracking, and marketing efforts. They needed a complete digital transformation.',
        'case.solution.title': 'Solution',
        'case.solution.point1': 'Developed order management app (web + mobile)',
        'case.solution.point2': 'Created AI-powered ad campaigns',
        'case.solution.point3': 'Automated inventory and order processes',
        'case.solution.point4': 'Implemented AI-driven social media management',
        'case.results.title': 'Results',
        'case.result1': '300% increase in orders',
        'case.result2': '60% reduction in operational costs',
        'case.result3': '10+ hours saved per week',
        'case.result4': '4.8/5 customer satisfaction',
        'case.cta': 'Start Your Transformation',

        // Contact Form
        'contact.label': 'GET IN TOUCH',
        'contact.title': 'Let\'s Create Something <span class="highlight">Amazing</span> Together',
        'contact.subtitle': 'Have a project in mind? Fill out the form below and we\'ll get back to you within 24 hours.',
        'contact.name': 'Your Name',
        'contact.email': 'Your Email',
        'contact.phone': 'Phone (Optional)',
        'contact.service': 'Select Service',
        'contact.service.video': 'AI Video Production',
        'contact.service.web': 'Web Development',
        'contact.service.automation': 'Workflow Automation',
        'contact.service.other': 'Other',
        'contact.message': 'Tell us about your project...',
        'contact.submit': 'Send Message',
        'contact.success': 'Thank you! We\'ll get back to you within 24 hours.',
        'contact.error': 'Oops! Something went wrong. Please try again or email us directly.',
        'contact.whatsapp': 'Or message us on WhatsApp',

        // Footer CTA
        'footer.cta.title': 'Let\'s Create Something Amazing Together',
        'footer.cta.subtitle': 'Schedule a free 30-minute consultation to discuss your project',
        'footer.cta.button': 'Schedule a Consultation',
        'footer.cta.alternative': 'Prefer email? <a href="mailto:omur@posthumane.com">Send us a message</a>',

        // Footer
        'footer.home': 'Home',
        'footer.about': 'About',
        'footer.services': 'Services',
        'footer.work': 'Work',
        'footer.pricing': 'Pricing',
        'footer.copyright': '© 2025 Posthumane. All rights reserved.',

        // FAQ Modal
        'faq.label': 'FREQUENTLY ASKED QUESTIONS',
        'faq.title': 'Everything You Need to Know <span class="highlight">About Posthumane</span>',
        'faq.subtitle': 'Get answers to common questions about our AI video production, web development, and automation services',
        'faq.search': 'Search for answers... (e.g., \'pricing\', \'timeline\', \'video quality\')',
    },

    tr: {
        // Header
        'header.about': 'Hakkımızda',
        'header.work': 'Projeler',
        'header.services': 'Hizmetler',
        'header.pricing': 'Fiyatlar',
        'header.faq': 'SSS',
        'header.manifesto': 'Manifesto',
        'header.cta': 'Görüşme Ayarla',

        // Hero
        'hero.title.normal': 'Video Prodüksiyon,<br>Prodüksiyon ',
        'hero.title.italic': 'Olmadan',
        'hero.subtitle': 'AI video prodüksiyonu • Vibe coding • Akıllı otomasyon karmaşıklığı yok ediyoruz',
        'hero.cta.primary': 'Ücretsiz Görüşme',
        'hero.cta.secondary': 'Projelerimiz',
        'hero.trust': 'Güvenilir İşbirliği',
        'hero.delivery': '24s',
        'hero.delivery.label': 'Teslimat Süresi',

        // About
        'about.label': 'HAKKIMIZDA',
        'about.title': 'Video yapıyoruz, dijital ürünler geliştiriyoruz ve <span class="handwritten">kaosunuzu</span> otomatikleştiriyoruz.',
        'about.description': 'Hırslı markaların tek bir bağlı beyne takıldığı stüdyoyuz. Karmaşık fikirleri <span class="highlight-text">24 saatte AI destekli videolara</span> dönüştürüyor, başlatacağınız, satacağınız ve yöneteceğiniz her şey için uygulamalar ve <span class="highlight-text">kendi kendine çalışan iş akışları</span> oluşturuyoruz. Çok yerine tek ekip, parçalar yerine tek sistem, <span class="highlight-text">daha az kaos daha fazla netlik</span>, daha az sürtüşme daha fazla akış, böylece markanız her temas noktasında daha hızlı çalışır, daha keskin görünür ve daha akıllı hisseder.',
        'about.service1.title': 'AI Video Prodüksiyonu',
        'about.service1.desc': 'Reklamlar, açıklayıcı videolar, sosyal medya içerikleri, marka hikayeleri AI ile 24 saatte',
        'about.service2.title': 'Vibe Coding',
        'about.service2.desc': 'Web siteleri, web uygulamaları, landing page\'ler modern, hızlı ve dönüşüm odaklı',
        'about.service3.title': 'Akıllı Otomasyon',
        'about.service3.desc': 'Araçlarınızı bağlayın, AI ajanlar oluşturun, tekrarlayan görevleri ortadan kaldırın sistemler sizin için çalışsın',
        'about.founders.label': 'EKİBİMİZ',

        // Services
        'services.label': 'HİZMETLERİMİZ',
        'services.title': 'Fikirleri <span class="highlight">Dijital Gerçeğe</span> Dönüştürüyoruz',
        'services.subtitle': 'Konseptten lansmanaan kadar her şeyi hallederiz: AI video prodüksiyonu, web geliştirme ve iş akışı otomasyonu.',

        // Portfolio
        'portfolio.label': 'PROJELERİMİZ',
        'portfolio.title': '<span class="highlight">Etki</span> Yaratan Projeler',

        // Case Study
        'case.label': 'VAKA ÇALIŞMASI',
        'case.title': 'Bir Restoranın Dijital Dönüşümü',
        'case.subtitle': '30 günde sıfırdan tamamen otomatik operasyonlara',
        'case.challenge.title': 'Zorluk',
        'case.challenge.desc': 'Restoran manuel sipariş yönetimi, stok takibi ve pazarlama çabalarıyla boğuşuyordu. Tam bir dijital dönüşüme ihtiyaçları vardı.',
        'case.solution.title': 'Çözüm',
        'case.solution.point1': 'Sipariş yönetim uygulaması geliştirdik (web + mobil)',
        'case.solution.point2': 'AI destekli reklam kampanyaları oluşturduk',
        'case.solution.point3': 'Stok ve sipariş süreçlerini otomatikleştirdik',
        'case.solution.point4': 'AI tabanlı sosyal medya yönetimi kurduk',
        'case.results.title': 'Sonuçlar',
        'case.result1': '%300 sipariş artışı',
        'case.result2': '%60 operasyonel maliyet düşüşü',
        'case.result3': 'Haftada 10+ saat tasarruf',
        'case.result4': '4.8/5 müşteri memnuniyeti',
        'case.cta': 'Dönüşümünüzü Başlatın',

        // Contact Form
        'contact.label': 'İLETİŞİM',
        'contact.title': 'Birlikte Harika Bir <span class="highlight">Şey</span> Yaratalım',
        'contact.subtitle': 'Aklınızda bir proje mi var? Aşağıdaki formu doldurun, 24 saat içinde size dönelim.',
        'contact.name': 'Adınız Soyadınız',
        'contact.email': 'E-posta Adresiniz',
        'contact.phone': 'Telefon (Opsiyonel)',
        'contact.service': 'Hizmet Seçin',
        'contact.service.video': 'AI Video Prodüksiyonu',
        'contact.service.web': 'Web Geliştirme',
        'contact.service.automation': 'İş Akışı Otomasyonu',
        'contact.service.other': 'Diğer',
        'contact.message': 'Projeniz hakkında bize bilgi verin...',
        'contact.submit': 'Mesaj Gönder',
        'contact.success': 'Teşekkürler! 24 saat içinde size dönüş yapacağız.',
        'contact.error': 'Bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan e-posta gönderin.',
        'contact.whatsapp': 'veya WhatsApp\'tan yazın',

        // Footer CTA
        'footer.cta.title': 'Birlikte Harika Bir Şey Yaratalım',
        'footer.cta.subtitle': 'Projenizi konuşmak için ücretsiz 30 dakikalık görüşme ayarlayın',
        'footer.cta.button': 'Görüşme Ayarla',
        'footer.cta.alternative': 'E-posta mı tercih edersiniz? <a href="mailto:omur@posthumane.com">Bize mesaj gönderin</a>',

        // Footer
        'footer.home': 'Ana Sayfa',
        'footer.about': 'Hakkımızda',
        'footer.services': 'Hizmetler',
        'footer.work': 'Projeler',
        'footer.pricing': 'Fiyatlar',
        'footer.copyright': '© 2025 Posthumane. Tüm hakları saklıdır.',

        // FAQ Modal
        'faq.label': 'SIK SORULAN SORULAR',
        'faq.title': '<span class="highlight">Posthumane Hakkında</span> Bilmeniz Gereken Her Şey',
        'faq.subtitle': 'AI video prodüksiyonu, web geliştirme ve otomasyon hizmetlerimiz hakkında sık sorulan sorulara cevaplar',
        'faq.search': 'Cevap arayın... (örn: \'fiyat\', \'süre\', \'video kalitesi\')',
    }
};

// ========== LANGUAGE SWITCHER FUNCTIONALITY ==========
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.createToggleButton();
        this.applyTranslations();
        this.setupEventListeners();
    }

    createToggleButton() {
        const header = document.querySelector('.header-nav');
        if (!header) return;

        // Create language toggle container
        const langToggle = document.createElement('div');
        langToggle.className = 'lang-toggle';
        langToggle.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <span class="lang-separator">/</span>
            <button class="lang-btn ${this.currentLang === 'tr' ? 'active' : ''}" data-lang="tr">TR</button>
        `;

        // Insert after Manifesto link
        const manifestoLink = header.querySelector('#headerManifestoBtn');
        if (manifestoLink) {
            manifestoLink.insertAdjacentElement('afterend', langToggle);
        } else {
            header.appendChild(langToggle);
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;

        this.currentLang = lang;
        localStorage.setItem('language', lang);

        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Apply translations with smooth transition
        document.body.style.opacity = '0.7';
        setTimeout(() => {
            this.applyTranslations();
            document.body.style.opacity = '1';
        }, 150);
    }

    applyTranslations() {
        const lang = translations[this.currentLang];

        // Translate all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (lang[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = lang[key];
                } else {
                    element.innerHTML = lang[key];
                }
            }
        });

        // Update document language
        document.documentElement.lang = this.currentLang;

        console.log(`✅ Language switched to: ${this.currentLang.toUpperCase()}`);
    }
}

// Initialize language switcher on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LanguageSwitcher();
    });
} else {
    new LanguageSwitcher();
}
