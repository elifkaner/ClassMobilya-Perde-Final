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
    
    const resimListesi = [
        { dosya: 'oturma-odasi.jpeg', kategori: 'koltuklar', w: '240', d: '95', h: '85' },
        { dosya: 'oturma-odasi-1.jpeg', kategori: 'koltuklar', w: '230', d: '90', h: '80' },
        { dosya: 'oturma-odasi-2.jpeg', kategori: 'koltuklar', w: '250', d: '100', h: '90' },
        { dosya: 'oturma-odasi-3.jpeg', kategori: 'koltuklar', w: '220', d: '85', h: '80' },
        { dosya: 'oturma-odasi-4.jpeg', kategori: 'koltuklar', w: '260', d: '95', h: '85' },
        { dosya: 'yemek-masasi.jpeg', kategori: 'yemek-masasi', w: '160', d: '90', h: '75' },
        { dosya: 'yemek-masasi-1.jpeg', kategori: 'yemek-masasi', w: '180', d: '90', h: '75' },
        { dosya: 'yemek-masasi-2.jpeg', kategori: 'yemek-masasi', w: '200', d: '100', h: '76' },
        { dosya: 'yemek-masasi-3.jpeg', kategori: 'yemek-masasi', w: '150', d: '85', h: '75' },
        { dosya: 'perde.jpeg', kategori: 'perde', w: '200', d: '-', h: '260' },
        { dosya: 'perde1.jpeg', kategori: 'perde', w: '250', d: '-', h: '260' },
        { dosya: 'perde2.jpeg', kategori: 'perde', w: '300', d: '-', h: '270' },
        { dosya: 'perde3.jpeg', kategori: 'perde', w: '150', d: '-', h: '250' },
        { dosya: 'perde4.jpeg', kategori: 'perde', w: '200', d: '-', h: '250' },
        { dosya: 'hali.jpeg', kategori: 'perde', w: '160', d: '-', h: '230', ozel: true },
        { dosya: 'hali1.jpeg', kategori: 'perde', w: '200', d: '-', h: '290', 
          baslikTR: 'Modern Desenli Halı', baslikEN: 'Modern Patterned Carpet', 
          aciklamaTR: 'Odanıza ferahlık katacak, silinebilir ve leke tutmaz özel dokuma modern halı tasarımı. Antialerjik yapısıyla çocuklu aileler için idealdir.', 
          aciklamaEN: 'Modern carpet design woven with easily wipeable and stain-resistant fabric, adding spaciousness to your room. Ideal for families with its anti-allergic structure.' },
        { dosya: 'dolap.jpeg', kategori: 'dolap', w: '200', d: '60', h: '210' },
        { dosya: 'dolap1.jpeg', kategori: 'dolap', w: '180', d: '55', h: '200' },
        { dosya: 'dolap2.jpeg', kategori: 'dolap', w: '220', d: '65', h: '220' },
        { dosya: 'dolap3.jpeg', kategori: 'dolap', w: '150', d: '50', h: '190' },
        { dosya: 'yatak.jpeg', kategori: 'yatak', w: '160', d: '200', h: '110' },
        { dosya: 'yatak1.jpeg', kategori: 'yatak', w: '180', d: '200', h: '120' },
        { dosya: 'yatak2.jpeg', kategori: 'yatak', w: '150', d: '200', h: '105' },
        { dosya: 'yatak3.jpeg', kategori: 'yatak', w: '160', d: '200', h: '115' },
        { dosya: 'yatak4.jpeg', kategori: 'yatak', w: '200', d: '200', h: '125' },
        { dosya: 'yatak5.jpeg', kategori: 'yatak', w: '140', d: '190', h: '100' },
        { dosya: 'yatak6.jpeg', kategori: 'yatak', w: '180', d: '200', h: '110' },
        { dosya: 'yatak7.jpeg', kategori: 'yatak', w: '160', d: '200', h: '120' }
    ];
    
    // Resimleri JS objelerine dönüştürerek detaylandırma
    const urunler = resimListesi.map((uye, indeks) => {
        let kategoriSecimi = uye.kategori;
        
        let kategoriIsmiTR = kategoriSecimi === 'koltuklar' ? 'Oturma Odası Grubu' : 
                             kategoriSecimi === 'perde' ? 'Perde & Halı' : 
                             kategoriSecimi === 'dolap' ? 'Şık Mobilya' : 
                             kategoriSecimi === 'yemek-masasi' ? 'Yemek Masası Takımı' : 'Konfor Yatak';
                             
        let kategoriIsmiEN = kategoriSecimi === 'koltuklar' ? 'Living Room Set' : 
                             kategoriSecimi === 'perde' ? 'Curtain & Carpet' : 
                             kategoriSecimi === 'dolap' ? 'Elegant Furniture' : 
                             kategoriSecimi === 'yemek-masasi' ? 'Dining Table Set' : 'Comfort Bed';

        let varsayilanAciklamaTR = `Evinizin dekorasyonuna uyum sağlayacak birinci sınıf malzemelerden üretilmiş ${kategoriIsmiTR.toLowerCase()} tasarımı. İhtiyacınıza göre özel ölçülerde üretilebilir.`;
        let varsayilanAciklamaEN = `Premium ${kategoriIsmiEN.toLowerCase()} design crafted from top-quality materials to match your home decoration. Can be custom-sized according to your needs.`;

        return {
            id: indeks,
            resimYolu: `fotograflar/${uye.dosya}`,
            kategori: kategoriSecimi,
            baslikTR: uye.baslikTR || (uye.dosya.includes('hali') && !uye.ozel ? 'Özel Dokuma Halı' : `Örnek ${kategoriIsmiTR}`),
            baslikEN: uye.baslikEN || (uye.dosya.includes('hali') && !uye.ozel ? 'Custom Woven Carpet' : `Sample ${kategoriIsmiEN}`),
            aciklamaTR: uye.aciklamaTR || varsayilanAciklamaTR,
            aciklamaEN: uye.aciklamaEN || varsayilanAciklamaEN,
            w: uye.w || 'Özel',
            d: uye.d || 'Özel',
            h: uye.h || 'Özel'
        };
    });

    // Ürünleri HTML'e basma fonksiyonu
    function urunleriEkranaBas() {
        if(!urunIzgarasi) return; // Ana sayfada çalışmaz, sadece urunler.html'de çalışır
        urunIzgarasi.innerHTML = ''; // Temizle
        
        urunler.forEach((urun, indeks) => {
            // Asimetrik şekiller sırayla değişsin
            const asimetrikClass = (indeks % 2 === 0) ? 'shape-asymmetric' : 'shape-asymmetric-alt';
            
            const urunHTML = `
                <div class="col-md-6 col-lg-4 product-item reveal active" data-category="${urun.kategori}">
                    <article class="card h-100 border-0 shadow-sm hover-float product-card cursor-pointer bg-card ${asimetrikClass}" 
                        data-baslik-tr="${urun.baslikTR}" 
                        data-baslik-en="${urun.baslikEN}" 
                        data-aciklama-tr="${urun.aciklamaTR}" 
                        data-aciklama-en="${urun.aciklamaEN}"
                        data-dim-w="${urun.w}"
                        data-dim-d="${urun.d}"
                        data-dim-h="${urun.h}">
                        
                        ${urun.kategori === 'perde' ? `<span class="position-absolute top-0 end-0 m-3 badge bg-secondary-gold text-dark py-2 px-3 fs-7 tracking-wider z-2 rounded-2 shadow-sm" data-i18n="badge_curtain">CLASS PERDE & HALI</span>` : ''}
                        
                        <div class="card-img-wrapper overflow-hidden ratio ratio-4x3">
                            <img src="${urun.resimYolu}" alt="${urun.baslikTR}" class="card-img-top object-fit-cover" loading="lazy">
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <h3 class="card-title h4 font-display fw-bold mb-3 text-primary-dark urun-baslik">${urun.baslikTR}</h3>
                            <div class="mt-auto pt-3 border-top d-flex justify-content-between text-muted fs-6">
                                <span><strong class="text-body" data-i18n="dim_w">G:</strong> ${urun.w === '-' ? '-' : urun.w + ' cm'}</span>
                                <span><strong class="text-body" data-i18n="dim_d">D:</strong> ${urun.d === '-' ? '-' : urun.d + ' cm'}</span>
                                <span><strong class="text-body" data-i18n="dim_h">Y:</strong> ${urun.h === '-' ? '-' : urun.h + ' cm'}</span>
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
                
                const w = kart.getAttribute('data-dim-w');
                const d = kart.getAttribute('data-dim-d');
                const h = kart.getAttribute('data-dim-h');
                
                if(modalBaslik) modalBaslik.textContent = baslik;
                if(modalGorsel) {
                    modalGorsel.setAttribute('src', imgSrc);
                    modalGorsel.setAttribute('alt', baslik);
                }
                if(modalAciklama) modalAciklama.textContent = aciklama;
                
                const modalBoyutlar = document.getElementById('modal-boyutlar');
                if (modalBoyutlar) {
                    const lW = aktifDil === 'en' ? 'W' : 'G';
                    const lD = aktifDil === 'en' ? 'D' : 'D';
                    const lH = aktifDil === 'en' ? 'H' : 'Y';
                    const warningTR = "Bu tasarım belirtilen ölçülerde stokta olup, isteğinize göre alanınıza en uygun özel ölçülerde de tasarlanabilmektedir.";
                    const warningEN = "This design is in stock with the specified dimensions and can also be custom designed to best fit your space upon request.";
                    const warning = aktifDil === 'en' ? warningEN : warningTR;
                    
                    modalBoyutlar.innerHTML = `
                        <div class="d-flex flex-wrap gap-4 mb-2 fs-5 fw-semibold text-primary-dark">
                            <span>${lW}: ${w === '-' ? '-' : w + ' cm'}</span>
                            <span>${lD}: ${d === '-' ? '-' : d + ' cm'}</span>
                            <span>${lH}: ${h === '-' ? '-' : h + ' cm'}</span>
                        </div>
                        <p class="mb-0 fs-7">${warning}</p>
                    `;
                }

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
            "filter_sofas": "Oturma Odası Grubu",
            "filter_beds": "Yatak & Baza",
            "filter_dining": "Yemek Masası Takımı",
            "filter_curtains": "CLASS PERDE & HALI",
            "filter_cabinets": "Şifonyer & Dolap",
            "badge_curtain": "CLASS PERDE",
            "dim_w": "G:", "dim_d": "D:", "dim_h": "Y:",
            "contact_title": "İletişime Geçin",
            "contact_desc": "Sizleri mağazamızda ağırlamaktan ve hayalinizdeki yaşam alanını birlikte tasarlamaktan mutluluk duyarız.",
            "contact_address": "Adres",
            "contact_address_value": "Çamlıca Mahallesi, Tombakzade Bulvarı NO:72/A Eskişehir",
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
            "categories_title": "Categories",
            "categories_subtitle": "Special designs for every corner of your home",
            "products_title": "Collections",
            "products_subtitle": "Our carefully selected furniture and home textile products",
            "filter_all": "All Collection",
            "filter_sofas": "Living Room Sets",
            "filter_beds": "Bed & Bases",
            "filter_dining": "Dining Table Sets",
            "filter_curtains": "CLASS PERDE & CARPET",
            "filter_cabinets": "Cabinets & Dressers",
            "badge_curtain": "CLASS CURTAIN & CARPET",
            "dim_w": "W:", "dim_d": "D:", "dim_h": "H:",
            "contact_title": "Get in Touch",
            "contact_desc": "We would be happy to host you in our store and design your dream living space together.",
            "contact_address": "Address",
            "contact_address_value": "Çamlıca Mahallesi, Tombakzade Bulvarı NO:72/A Eskişehir",
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
