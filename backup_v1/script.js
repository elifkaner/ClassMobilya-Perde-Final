document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. Tema Ayarları (Karanlık / Aydınlık Mod)
       ========================================= */
    const temaButonu = document.getElementById('tema-degistirici');
    const kokElement = document.documentElement;
    const KAYIT_ANAHTARI = 'classmobilya-tema';

    const kayitliTema = localStorage.getItem(KAYIT_ANAHTARI);
    const sistemKaranlikMi = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (kayitliTema === 'dark' || (!kayitliTema && sistemKaranlikMi)) {
        kokElement.setAttribute('data-theme', 'dark');
    }

    if(temaButonu) {
        temaButonu.addEventListener('click', () => {
            const mevcutTema = kokElement.getAttribute('data-theme');
            const yeniTema = mevcutTema === 'dark' ? 'light' : 'dark';
            
            kokElement.setAttribute('data-theme', yeniTema);
            localStorage.setItem(KAYIT_ANAHTARI, yeniTema);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (olay) => {
        if (!localStorage.getItem(KAYIT_ANAHTARI)) {
            kokElement.setAttribute('data-theme', olay.matches ? 'dark' : 'light');
        }
    });

    /* =========================================
       2. Menü Kaydırma Efekti (Header Scroll)
       ========================================= */
    const ustMenu = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            ustMenu.classList.add('scrolled');
        } else {
            ustMenu.classList.remove('scrolled');
        }
    });

    /* =========================================
       3. Dinamik Ürün Listesi ve Kategorizasyon
       ========================================= */
    const urunIzgarasi = document.getElementById('urun-grid');
    
    // Geçici Ürün Listesi: Resimlerinizi isimlendirdikçe buraya dosya adlarını ekleyebilirsiniz.
    const resimListesi = [
        { dosya: 'koltuk.jpeg', kategori: 'koltuklar' },
        { dosya: 'perde.jpeg', kategori: 'perde' },
        { dosya: 'dolap.jpeg', kategori: 'dolap' },
        { dosya: 'yatak.jpeg', kategori: 'yatak' },
        { dosya: 'yemek-masasi.jpeg', kategori: 'yemek-masasi' }
    ];
    
    // Resimleri JS objelerine dönüştürerek detaylandırma
    const urunler = resimListesi.map((uye, indeks) => {
        let kategoriSecimi = uye.kategori;
        
        let kategoriIsmiTR = kategoriSecimi === 'koltuklar' ? 'Lüks Koltuk' : 
                             kategoriSecimi === 'perde' ? 'Özel Perde' : 
                             kategoriSecimi === 'dolap' ? 'Şık Mobilya' : 
                             kategoriSecimi === 'yemek-masasi' ? 'Yemek Masası' : 'Konfor Yatak';
                             
        let kategoriIsmiEN = kategoriSecimi === 'koltuklar' ? 'Luxury Sofa' : 
                             kategoriSecimi === 'perde' ? 'Custom Curtain' : 
                             kategoriSecimi === 'dolap' ? 'Elegant Furniture' : 
                             kategoriSecimi === 'yemek-masasi' ? 'Dining Table' : 'Comfort Bed';

        return {
            id: indeks,
            resimYolu: `fotograflar/${uye.dosya}`,
            kategori: kategoriSecimi,
            baslikTR: `Örnek ${kategoriIsmiTR}`,
            baslikEN: `Sample ${kategoriIsmiEN}`,
            aciklamaTR: `Evinizin dekorasyonuna uyum sağlayacak birinci sınıf malzemelerden üretilmiş ${kategoriIsmiTR.toLowerCase()} tasarımı. İhtiyacınıza göre özel ölçülerde üretilebilir.`,
            aciklamaEN: `Premium ${kategoriIsmiEN.toLowerCase()} design crafted from top-quality materials to match your home decoration. Can be custom-sized according to your needs.`
        };
    });

    // Ürünleri HTML'e basma fonksiyonu
    function urunleriEkranaBas() {
        if(!urunIzgarasi) return; // Ana sayfada çalışmaz, sadece urunler.html'de çalışır
        urunIzgarasi.innerHTML = ''; // Temizle
        
        urunler.forEach((urun) => {
            const urunHTML = `
                <div class="col-md-6 col-lg-4 product-item reveal active" data-category="${urun.kategori}">
                    <article class="card h-100 border-0 shadow-sm hover-elevate product-card cursor-pointer bg-card" 
                        data-baslik-tr="${urun.baslikTR}" 
                        data-baslik-en="${urun.baslikEN}" 
                        data-aciklama-tr="${urun.aciklamaTR}" 
                        data-aciklama-en="${urun.aciklamaEN}">
                        
                        ${urun.kategori === 'perde' ? `<span class="position-absolute top-0 end-0 m-3 badge bg-secondary-gold text-dark py-2 px-3 fs-7 tracking-wider z-2 rounded-2 shadow-sm" data-i18n="badge_curtain">CLASS PERDE</span>` : ''}
                        
                        <div class="card-img-wrapper overflow-hidden ratio ratio-4x3">
                            <img src="${urun.resimYolu}" alt="${urun.baslikTR}" class="card-img-top object-fit-cover" loading="lazy">
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <h3 class="card-title h4 font-display fw-bold mb-3 text-primary-dark urun-baslik">${urun.baslikTR}</h3>
                            <div class="mt-auto pt-3 border-top d-flex justify-content-between text-muted fs-6">
                                <span><strong class="text-body" data-i18n="dim_w">G:</strong> Özel</span>
                                <span><strong class="text-body" data-i18n="dim_d">D:</strong> Özel</span>
                                <span><strong class="text-body" data-i18n="dim_h">Y:</strong> Özel</span>
                            </div>
                        </div>
                    </article>
                </div>
            `;
            urunIzgarasi.insertAdjacentHTML('beforeend', urunHTML);
        });

        // Ürünler eklendikten sonra modal tıklamalarını aktifleştir
        modalIslemleriniAyarla();
    }

    urunleriEkranaBas();

    /* =========================================
       4. Ürün Filtreleme İşlemleri
       ========================================= */
    const filtreButonlari = document.querySelectorAll('.filter-btn');
    
    window.kategoriSec = function(kategoriDegeri) {
        filtreButonlari.forEach(buton => {
            if(buton.getAttribute('data-filter') === kategoriDegeri) {
                buton.click(); 
            }
        });
    };

    filtreButonlari.forEach(buton => {
        buton.addEventListener('click', () => {
            filtreButonlari.forEach(b => b.classList.remove('active'));
            buton.classList.add('active');

            const secilenKategori = buton.getAttribute('data-filter');
            const sayfadakiUrunler = document.querySelectorAll('.product-item');

            sayfadakiUrunler.forEach(urun => {
                if (secilenKategori === 'all' || urun.getAttribute('data-category') === secilenKategori) {
                    urun.classList.remove('d-none');
                    setTimeout(() => urun.classList.add('active'), 50);
                } else {
                    urun.classList.add('d-none');
                    urun.classList.remove('active');
                }
            });
            
            GozlemciyiTetikle();
        });
    });

    // Sayfa açıldığında URL'de kategori parametresi varsa otomatik filtrele
    const urlParametreleri = new URLSearchParams(window.location.search);
    const gelenKategori = urlParametreleri.get('kategori');
    if(gelenKategori && filtreButonlari.length > 0) {
        setTimeout(() => {
            window.kategoriSec(gelenKategori);
        }, 100);
    }

    /* =========================================
       5. Scroll Reveal (Aşağı Kaydırdıkça Gösterme)
       ========================================= */
    let gorselGozlemci;
    function GozlemciyiTetikle() {
        const gosterilecekElemanlar = document.querySelectorAll('.reveal');
        
        if(gorselGozlemci) gorselGozlemci.disconnect();

        gorselGozlemci = new IntersectionObserver((girdiler, gozlemci) => {
            girdiler.forEach(girdi => {
                if (girdi.isIntersecting) {
                    girdi.target.classList.add('active');
                    gozlemci.unobserve(girdi.target); 
                }
            });
        }, { root: null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        gosterilecekElemanlar.forEach(eleman => gorselGozlemci.observe(eleman));
    }
    
    GozlemciyiTetikle();

    /* =========================================
       6. Tam Ekran Modal (Fullscreen Modal)
       ========================================= */
    function modalIslemleriniAyarla() {
        const urunKartlari = document.querySelectorAll('.product-card');
        const modalGorsel = document.getElementById('modal-gorsel');
        const modalBaslik = document.getElementById('modal-baslik');
        const modalAciklama = document.getElementById('modal-aciklama');
        const modalEtiket = document.getElementById('modal-etiket');
        
        let bootstrapModal;
        if (document.getElementById('urunModali')) {
            bootstrapModal = new bootstrap.Modal(document.getElementById('urunModali'));
        }

        urunKartlari.forEach(kart => {
            kart.addEventListener('click', () => {
                const img = kart.querySelector('img');
                const imgSrc = img ? img.getAttribute('src') : '';
                const kategoriSpan = kart.querySelector('.badge');
                
                const aktifDil = localStorage.getItem('classmobilya-lang') || 'tr';
                const baslik = aktifDil === 'en' ? kart.getAttribute('data-baslik-en') : kart.getAttribute('data-baslik-tr');
                const aciklama = aktifDil === 'en' ? kart.getAttribute('data-aciklama-en') : kart.getAttribute('data-aciklama-tr');
                
                if(modalBaslik) modalBaslik.textContent = baslik;
                if(modalGorsel) {
                    modalGorsel.setAttribute('src', imgSrc);
                    modalGorsel.setAttribute('alt', baslik);
                }
                if(modalAciklama) modalAciklama.textContent = aciklama;
                
                if(kategoriSpan && modalEtiket) {
                    modalEtiket.textContent = kategoriSpan.textContent;
                    modalEtiket.classList.remove('d-none');
                } else if(modalEtiket) {
                    modalEtiket.classList.add('d-none');
                }
                
                if(bootstrapModal) bootstrapModal.show();
            });
        });
    }

    /* =========================================
       7. Dinamik Footer Yılı
       ========================================= */
    const yilElemani = document.getElementById('yil');
    if (yilElemani) yilElemani.textContent = new Date().getFullYear();

    /* =========================================
       8. Çoklu Dil (TR / EN) Sistemi
       ========================================= */
    const dilSozlugu = {
        "tr": {
            "skip_link": "Ana içeriğe atla",
            "nav_home": "Anasayfa",
            "nav_about": "Hakkımızda",
            "nav_products": "Ürünler",
            "nav_contact": "İletişim",
            "hero_title": "Yaşam Alanlarınıza Lüks Dokunuş",
            "hero_subtitle": "Modern tasarımlar, kaliteli işçilik ve zarafet ile evinizi yeniden yaratın.",
            "hero_btn": "Koleksiyonu Keşfedin",
            "about_title": "Hakkımızda",
            "about_p1": "Yılların getirdiği ustalık ve tasarım anlayışıyla, evlerinizi sadece bir yaşam alanı değil, bir sanat eserine dönüştürüyoruz. CLASSMOBİLYA HOME olarak her bir parçada estetik ve fonksiyonelliği bir araya getiriyoruz.",
            "about_highlight": "Mobilya sektöründeki tecrübemizi CLASS PERDE markamızla ev tekstiline de taşıyoruz.",
            "about_p2": "Müşteri memnuniyetini ön planda tutan yaklaşımımızla, evinize en uygun çözümleri sunmak için buradayız.",
            "categories_title": "Kategorilerimiz",
            "categories_subtitle": "Evinizin her köşesi için özel tasarımlar",
            "products_title": "Koleksiyonlarımız",
            "products_subtitle": "Özenle seçilmiş mobilya ve ev tekstili ürünlerimiz",
            "filter_all": "Tüm Koleksiyon",
            "filter_sofas": "Koltuklar",
            "filter_beds": "Yatak & Baza",
            "filter_dining": "Yemek Masaları",
            "filter_curtains": "Perdeler",
            "filter_cabinets": "Şifonyer & Dolap",
            "badge_curtain": "CLASS PERDE",
            "dim_w": "G:", "dim_d": "D:", "dim_h": "Y:",
            "contact_title": "İletişime Geçin",
            "contact_desc": "Sizleri mağazamızda ağırlamaktan ve hayalinizdeki yaşam alanını birlikte tasarlamaktan mutluluk duyarız.",
            "contact_address": "Adres",
            "contact_address_value": "Lüks Mobilyacılar Caddesi No:1, İstanbul",
            "contact_phone": "Telefon",
            "contact_email": "E-posta",
            "form_name_label": "Adınız Soyadınız",
            "form_name_ph": "Adınız Soyadınız",
            "form_email_label": "E-posta Adresiniz",
            "form_email_ph": "ornek@email.com",
            "form_msg_label": "Mesajınız",
            "form_msg_ph": "Size nasıl yardımcı olabiliriz?",
            "form_submit": "Gönder",
            "modal_dimensions": "Ürün Detayları",
            "modal_contact_btn": "Sipariş & Bilgi İçin İletişime Geçin",
            "modal_close_btn": "Geri Dön",
            "footer_rights": "Tüm Hakları Saklıdır."
        },
        "en": {
            "skip_link": "Skip to main content",
            "nav_home": "Home",
            "nav_about": "About Us",
            "nav_products": "Products",
            "nav_contact": "Contact",
            "hero_title": "A Touch of Luxury to Your Living Spaces",
            "hero_subtitle": "Recreate your home with modern designs, quality craftsmanship, and elegance.",
            "hero_btn": "Explore the Collection",
            "about_title": "About Us",
            "about_p1": "With years of mastery and design philosophy, we transform your homes not just into a living space, but into a work of art. At CLASSMOBİLYA HOME, we combine aesthetics and functionality in every piece.",
            "about_highlight": "We bring our experience in the furniture sector to home textiles with our CLASS PERDE brand.",
            "about_p2": "With our customer satisfaction-oriented approach, we are here to offer the most suitable solutions for your home.",
            "categories_title": "Our Categories",
            "categories_subtitle": "Special designs for every corner of your home",
            "products_title": "Our Collections",
            "products_subtitle": "Our carefully selected furniture and home textile products",
            "filter_all": "All Collection",
            "filter_sofas": "Sofas",
            "filter_beds": "Bed & Bases",
            "filter_dining": "Dining Tables",
            "filter_curtains": "Curtains",
            "filter_cabinets": "Cabinets & Dressers",
            "badge_curtain": "CLASS CURTAIN",
            "dim_w": "W:", "dim_d": "D:", "dim_h": "H:",
            "contact_title": "Get in Touch",
            "contact_desc": "We would be happy to host you in our store and design your dream living space together.",
            "contact_address": "Address",
            "contact_address_value": "Luxury Furniture Street No:1, Istanbul",
            "contact_phone": "Phone",
            "contact_email": "Email",
            "form_name_label": "Full Name",
            "form_name_ph": "Your Full Name",
            "form_email_label": "Email Address",
            "form_email_ph": "example@email.com",
            "form_msg_label": "Your Message",
            "form_msg_ph": "How can we help you?",
            "form_submit": "Send",
            "modal_dimensions": "Product Details",
            "modal_contact_btn": "Contact for Order & Info",
            "modal_close_btn": "Go Back",
            "footer_rights": "All Rights Reserved."
        }
    };

    const dilButonu = document.getElementById('dil-degistirici');
    
    let secilenDil = localStorage.getItem('classmobilya-lang') || 'tr';
    
    function dilUygula(dilKodu) {
        secilenDil = dilKodu;
        localStorage.setItem('classmobilya-lang', dilKodu);
        
        if(dilButonu) {
            dilButonu.textContent = dilKodu === 'tr' ? 'EN' : 'TR';
        }

        const kelimeler = dilSozlugu[dilKodu];
        if(!kelimeler) return;

        document.querySelectorAll('[data-i18n]').forEach(eleman => {
            const anahtar = eleman.getAttribute('data-i18n');
            if (kelimeler[anahtar]) {
                eleman.textContent = kelimeler[anahtar];
            }
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(eleman => {
            const anahtar = eleman.getAttribute('data-i18n-ph');
            if (kelimeler[anahtar]) {
                eleman.setAttribute('placeholder', kelimeler[anahtar]);
            }
        });

        const urunKartlari = document.querySelectorAll('.product-card');
        urunKartlari.forEach(kart => {
            const baslikElemani = kart.querySelector('.urun-baslik');
            if(baslikElemani) {
                baslikElemani.textContent = dilKodu === 'en' ? kart.getAttribute('data-baslik-en') : kart.getAttribute('data-baslik-tr');
            }
        });
    }

    if(dilButonu) {
        dilButonu.addEventListener('click', (olay) => {
            olay.preventDefault();
            const yeniDil = secilenDil === 'tr' ? 'en' : 'tr';
            dilUygula(yeniDil);
        });
    }

    dilUygula(secilenDil);
});
