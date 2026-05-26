document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. Mobile Menu Toggle
       ========================================= */
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('open');
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden'; 
    }

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* =========================================
       2. Dark Mode Toggle (System + Manual)
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    const STORAGE_KEY = 'classmobilya-theme';

    // Check localStorage or system preference
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        rootElement.setAttribute('data-theme', 'dark');
    }

    // Listen for manual theme switch
    themeToggle.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
    });

    // Listen for system theme changes dynamically
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            rootElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    /* =========================================
       3. Header Scroll Effect
       ========================================= */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       4. Product Filtering & Animations
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter logic with animation reset
            productCards.forEach(card => {
                // Remove show class to reset fade animation
                card.classList.remove('show');
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    // Add tiny delay to allow DOM to register remove/add cycle for animation
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Trigger initial fade-in for all cards on load
    productCards.forEach(card => {
        card.classList.add('show');
    });

    /* =========================================
       5. Scroll Reveal Intersection Observer
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset bottom
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       6. Dynamic Footer Year
       ========================================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       7. Product Modal Interactions
       ========================================= */
    const productDetails = {
        "Lüks Koltuk Takımı": "İtalyan tasarımı esintileri taşıyan, birinci sınıf silinebilir nubuk kumaşı ve gürgen iskeletiyle yıllara meydan okuyan lüks koltuk takımı. Konforlu oturum alanı ve şık metal ayakları ile salonunuza prestij katar.",
        "Ortopedik Yatak & Baza": "Tam ortopedik pocket yay sistemi sayesinde omurga dostu, yüksek yoğunluklu süngeri ile bulutların üzerinde hissettiren premium uyku seti. Geniş hacimli amortisörlü bazası ekstra depolama alanı sunar.",
        "Modern Yemek Masası": "Doğal ceviz kaplama yüzeyi ve zarif metal ayakları ile endüstriyel lüksü harmanlayan modern yemek masası. Kalabalık misafirleriniz için ferah bir kullanım sunarken odanızın odak noktası olacak.",
        "CLASS PERDE Özel Koleksiyon": "Güneş ışığını zarifçe süzerek mekanınıza soft bir atmosfer katan, özel dokuma stor ve tül perde koleksiyonumuz. Evinizin havasını anında değiştirir.",
        "Şık Gardırop": "Yavaşlatıcılı menteşeleri, gizli mücevherlik bölmeleri ve geniş asma alanları ile hayatınızı kolaylaştıran şık tasarımlı aynalı gardırop. Mat lake boyası odanıza derinlik katar.",
        "Ahşap Şifonyer": "Masif meşe ağacından el işçiliği ile üretilmiş, üç geniş çekmecesiyle yatak odanızın vazgeçilmezi. Soft-close ray sistemi ile sessiz ve pürüzsüz bir kullanım deneyimi sunar."
    };

    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalDims = document.getElementById('modal-dimensions');
    const modalClose = document.querySelector('.modal-close');

    function openModal(card) {
        const title = card.querySelector('.product-title').textContent;
        const imgSrc = card.querySelector('.product-image').getAttribute('src');
        const dimsHTML = card.querySelector('.product-dimensions').innerHTML;
        
        modalTitle.textContent = title;
        modalImage.setAttribute('src', imgSrc);
        modalImage.setAttribute('alt', title);
        modalDims.innerHTML = dimsHTML;
        modalDesc.textContent = productDetails[title] || "Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    productCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    modalClose.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});
