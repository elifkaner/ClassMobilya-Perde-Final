document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. Tema Ayarları (Karanlık / Aydınlık Mod)
       ========================================= */
    const temaButonu = document.getElementById('tema-degistirici');
    const kokElement = document.documentElement;
    const KAYIT_ANAHTARI = 'classmobilya-tema-v2';

    const kayitliTema = localStorage.getItem(KAYIT_ANAHTARI) || 'light';
    
    if (kayitliTema === 'dark') {
        kokElement.setAttribute('data-theme', 'dark');
    } else {
        kokElement.setAttribute('data-theme', 'light');
    }

    if(temaButonu) {
        temaButonu.addEventListener('click', () => {
            const mevcutTema = kokElement.getAttribute('data-theme');
            const yeniTema = mevcutTema === 'dark' ? 'light' : 'dark';
            
            kokElement.setAttribute('data-theme', yeniTema);
            localStorage.setItem(KAYIT_ANAHTARI, yeniTema);
        });
    }

    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (olay) => {
    //     if (!localStorage.getItem(KAYIT_ANAHTARI)) {
    //         kokElement.setAttribute('data-theme', olay.matches ? 'dark' : 'light');
    //     }
    // });

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
        { dosya: 'oturma-odasi.jpeg', kategori: 'koltuklar', w: '240', d: '95', h: '85',
          baslikTR: 'Comfort Köşe Takımı', baslikEN: 'Comfort Corner Sofa',
          aciklamaTR: 'Extra ithal kuşak hareketli kumaş. Süngeri 36 dansite, iskeleti ve ayakları fırınlanmış gürgen ağacından oluşmaktadır. Ayak renkleri ve ölçüleri isteğe göre değişebilir.',
          aciklamaEN: 'Extra imported belt, dynamic fabric. 36 density sponge, frame and legs are made of baked hornbeam wood. Leg colors and dimensions can be customized.' },
          
        { dosya: 'oturma-odasi-1.jpeg', kategori: 'koltuklar', w: '230', d: '90', h: '80',
          baslikTR: 'Paris Koltuk Takımı', baslikEN: 'Paris Sofa Set',
          aciklamaTR: 'İskeleti fırınlanmış gürgen ağacından oluşmaktadır. Ayakları metal gümüş, siyah ve gold olarak üretilebilir. 32 dansite sünger, isteğe göre sertlik derecesi ayarlanabilir.',
          aciklamaEN: 'Frame made of baked hornbeam wood. Metal legs available in silver, black, and gold. 32 density sponge, customizable firmness.' },
          
        { dosya: 'oturma-odasi-2.jpeg', kategori: 'koltuklar', w: '250', d: '100', h: '90',
          baslikTR: 'Barcelona Koltuk Takımı', baslikEN: 'Barcelona Sofa Set',
          aciklamaTR: 'Sırtlar ve kollar açılıp geniş yatak olmaktadır. Ayaklar ve iskeleti fırınlanmış gürgen ağacından oluşmaktadır.',
          aciklamaEN: 'Backrests and armrests open to become a wide bed. Legs and frame are made of baked hornbeam wood.' },
          
        { dosya: 'oturma-odasi-3.jpeg', kategori: 'koltuklar', w: '220', d: '85', h: '80',
          baslikTR: 'Soft Koltuk Takımı', baslikEN: 'Soft Sofa Set',
          aciklamaTR: 'Sandıklı tasarım, yüksek ayaklı. Fırınlanmış gürgen ağacından üretilmiştir. Kumaş ve ayak renkleri isteğe göre değişebilir.',
          aciklamaEN: 'Design with storage, high legs. Made of baked hornbeam wood. Fabric and leg colors can be customized.' },
          
        { dosya: 'oturma-odasi-4.jpeg', kategori: 'koltuklar', w: '260', d: '95', h: '85',
          baslikTR: 'Madrid Koltuk Takımı', baslikEN: 'Madrid Sofa Set',
          aciklamaTR: 'Yüksek ayaklı ve zarif görsel tasarım. Ayak ve kumaş renkleri değiştirilebilir.',
          aciklamaEN: 'Elegant visual design with high legs. Leg and fabric colors can be customized.' },
          
        { dosya: 'yemek-masasi.jpeg', kategori: 'yemek-masasi', w: '130', d: '80', h: '75',
          baslikTR: 'MDF Yemek Masası Takımı', baslikEN: 'MDF Dining Table Set',
          aciklamaTR: 'MDF masa, 38’lik profil ayak. Sandalyeler iç malzeme ve döşeme altları MDF. Masa ölçüsü 80x130 cm.',
          aciklamaEN: 'MDF table, 38 profile legs. Chairs with MDF inner material. Table dimensions 80x130 cm.' },
          
        { dosya: 'yemek-masasi-1.jpeg', kategori: 'yemek-masasi', w: '90', d: '90', h: '75',
          baslikTR: 'Ekonomik Yuvarlak Masa', baslikEN: 'Economic Round Table',
          aciklamaTR: '90x90 ekonomik masa modeli. Suntalem malzeme, zarif sandalye detaylı.',
          aciklamaEN: '90x90 economic round table model. Chipboard material, elegant chair details.' },
          
        { dosya: 'yemek-masasi-2.jpeg', kategori: 'yemek-masasi', w: '200', d: '100', h: '76',
          baslikTR: 'Küçük Yemek Masası', baslikEN: 'Small Dining Table',
          aciklamaTR: 'Küçük aileler için ideal, leke tutmaz özel kumaş kaplı sandalyelere sahip zarif ve dayanıklı masa takımı.',
          aciklamaEN: 'Ideal for small families, elegant and durable table set with stain-resistant custom fabric chairs.' },
          
        { dosya: 'yemek-masasi-3.jpeg', kategori: 'yemek-masasi', w: '150', d: '85', h: '75',
          baslikTR: 'Ahşap Desenli Yemek Masası', baslikEN: 'Wood Patterned Dining Table',
          aciklamaTR: 'Şık ve modern ahşap desenli yüzey, paslanmaz çelik ayak detaylarıyla uzun ömürlü kullanım.',
          aciklamaEN: 'Stylish and modern wood patterned surface, long-lasting use with stainless steel leg details.' },
          
        { dosya: 'perde.jpeg', kategori: 'perde', w: '200', d: '-', h: '260',
          baslikTR: 'Lüks Kruvaze Tül Perde', baslikEN: 'Luxury Tulle Curtain',
          aciklamaTR: 'Evinize zarafet katan, özel tasarım lüks kruvaze tül perde.',
          aciklamaEN: 'Specially designed luxury tulle curtain adding elegance to your home.' },
          
        { dosya: 'perde1.jpeg', kategori: 'perde', w: '250', d: '-', h: '260',
          baslikTR: 'Keten Fon Perde', baslikEN: 'Linen Drape Curtain',
          aciklamaTR: 'Güneş ışığını nazikçe süzen, kırışmaz keten dokulu şık fon perde.',
          aciklamaEN: 'Stylish linen drape curtain that gently filters sunlight and is wrinkle-resistant.' },
          
        { dosya: 'perde2.jpeg', kategori: 'perde', w: '300', d: '-', h: '270',
          baslikTR: 'Mavi Dokulu Fon Perde', baslikEN: 'Blue Textured Drape',
          aciklamaTR: 'Kalın dokusu ve özel deseniyle evinize şıklık katan, güneşi engelleyen mavi fon perde.',
          aciklamaEN: 'Blue drape curtain with thick texture and special pattern that blocks the sun and adds elegance to your home.' },
          
        { dosya: 'perde3.jpeg', kategori: 'perde', w: '150', d: '-', h: '250',
          baslikTR: 'Rustik Tül Perde', baslikEN: 'Rustic Tulle Curtain',
          aciklamaTR: 'Ahşap rustik detaylarıyla otantik bir hava katan ince dokuma tül.',
          aciklamaEN: 'Finely woven tulle adding an authentic atmosphere with wooden rustic details.' },
          
        { dosya: 'perde4.jpeg', kategori: 'perde', w: '200', d: '-', h: '250',
          baslikTR: 'Kadife Karartma Fon', baslikEN: 'Velvet Blackout Drape',
          aciklamaTR: 'Işığı tamamen kesen, yatak odaları için ideal premium kadife karartma perde.',
          aciklamaEN: 'Premium velvet blackout curtain that completely blocks light, ideal for bedrooms.' },
          
        { dosya: 'hali.jpeg', kategori: 'perde', w: '160', d: '-', h: '230', ozel: true,
          baslikTR: 'Zengin Halı Çeşitleri', baslikEN: 'Rich Carpet Varieties',
          aciklamaTR: 'Mağazamızda her tarza ve bütçeye uygun yüzlerce farklı halı seçeneği sizleri bekliyor. Klasikten moderne tüm renk ve desenler mevcut.',
          aciklamaEN: 'Hundreds of different carpet options suitable for every style and budget are waiting for you in our store. All colors and patterns from classic to modern are available.' },
          
        { dosya: 'hali1.jpeg', kategori: 'perde', w: '200', d: '-', h: '290', 
          baslikTR: 'Özel Tasarım Halı', baslikEN: 'Custom Design Carpet', 
          aciklamaTR: 'Odanıza ferahlık katacak, silinebilir ve leke tutmaz özel dokuma modern halı tasarımı. Antialerjik yapısıyla çocuklu aileler için idealdir.', 
          aciklamaEN: 'Modern carpet design woven with easily wipeable and stain-resistant fabric, adding spaciousness to your room. Ideal for families with its anti-allergic structure.' },
          
        { dosya: 'dolap.jpeg', kategori: 'dolap', w: '200', d: '60', h: '210',
          baslikTR: 'Çok Amaçlı Dolap', baslikEN: 'Multi-Purpose Wardrobe',
          aciklamaTR: 'Geniş iç hacmi ve çok sayıda rafıyla eşyalarınızı düzenli tutmanızı sağlayan fonksiyonel dolap.',
          aciklamaEN: 'Functional wardrobe that allows you to keep your belongings organized with its large interior volume and numerous shelves.' },
          
        { dosya: 'dolap1.jpeg', kategori: 'dolap', w: '160', d: '50', h: '50',
          baslikTR: 'Çok Amaçlı Kitaplık ve Dolap', baslikEN: 'Multi-Purpose Bookshelf and Cabinet',
          aciklamaTR: 'Modern tasarımıyla hem kitaplık hem de kapalı depolama alanı olarak kullanabileceğiniz çok amaçlı dekoratif ünite.',
          aciklamaEN: 'Multi-purpose decorative unit that you can use both as a bookshelf and closed storage area with its modern design.' },
          
        { dosya: 'dolap2.jpeg', kategori: 'dolap', w: '220', d: '65', h: '220',
          baslikTR: 'İki Kapaklı Çekmeceli Dolap', baslikEN: 'Two-Door Cabinet with Drawers',
          aciklamaTR: 'Evinizin her köşesinde kullanabileceğiniz, çekmece ve dolap detaylarıyla pratik saklama alanı sunan dolap takımı.',
          aciklamaEN: 'Cabinet set that you can use in every corner of your home, offering practical storage space with drawer and cabinet details.' },
          
        { dosya: 'dolap3.jpeg', kategori: 'dolap', w: '150', d: '50', h: '190',
          baslikTR: 'Modern TV Ünitesi', baslikEN: 'Modern TV Unit',
          aciklamaTR: 'Özel dekoratif panelleri ve LED aydınlatma efektiyle salonunuza şıklık katan geniş TV ünitesi.',
          aciklamaEN: 'Wide TV unit that adds elegance to your living room with its custom decorative panels and LED lighting effect.' },
          
        { dosya: 'yatak.jpeg', kategori: 'yatak', w: '100', d: '200', h: '110',
          baslikTR: 'Soft Başlıklı Baza Yatak', baslikEN: 'Single Bed with Soft Headboard',
          aciklamaTR: '100x200 ölçüsünde baza. Çelik profil, MDF içerik. Soft başlık. Kuş tüyü sünger, extra omurga destek süngeri. Sertlik derecesi 6.',
          aciklamaEN: '100x200 base. Steel profile, MDF content. Soft headboard. Down sponge, extra spine support sponge. Firmness degree 6.' },
          
        { dosya: 'yatak1.jpeg', kategori: 'yatak', w: '150', d: '200', h: '120',
          baslikTR: 'Paris Yatak Modeli', baslikEN: 'Paris Bed Model',
          aciklamaTR: '150x200 Paris yatak modeli. Çelik profil, MDF içerik baza. İşlemeli kapitone başlık detayı. 29-31 cm yükseklik, sertlik derecesi 7, extra comfort süngeri.',
          aciklamaEN: '150x200 Paris bed model. Steel profile, MDF content base. Embroidered quilted headboard detail. 29-31 cm height, firmness degree 7, extra comfort sponge.' },
          
        { dosya: 'yatak2.jpeg', kategori: 'yatak', w: '160', d: '200', h: '105',
          baslikTR: 'Ortopedik Tek Kişilik Yatak', baslikEN: 'Orthopedic Single Bed',
          aciklamaTR: 'Tam ortopedik yay sistemi ile omurga sağlığınızı koruyan tek kişilik yatak.',
          aciklamaEN: 'Single bed that protects your spine health with a full orthopedic spring system.' },
          
        { dosya: 'yatak3.jpeg', kategori: 'yatak', w: '160', d: '200', h: '115',
          baslikTR: 'Relax Yatak Modeli', baslikEN: 'Relax Bed Model',
          aciklamaTR: 'Terletmeyen özel kumaş teknolojisi ve ekstra konfor katmanıyla kesintisiz uyku.',
          aciklamaEN: 'Uninterrupted sleep with non-sweating custom fabric technology and extra comfort layer.' },
          
        { dosya: 'yatak4.jpeg', kategori: 'yatak', w: '200', d: '200', h: '125',
          baslikTR: 'King Size Lüks Yatak', baslikEN: 'King Size Luxury Bed',
          aciklamaTR: 'Ultra geniş uyku alanı sunan, lüks otel konforunu evinize getiren özel tasarım yatak.',
          aciklamaEN: 'Custom-designed bed bringing luxury hotel comfort to your home, offering ultra-wide sleeping space.' },
          
        { dosya: 'yatak5.jpeg', kategori: 'yatak', w: '140', d: '190', h: '100',
          baslikTR: 'Kompakt Baza Seti', baslikEN: 'Compact Base Set',
          aciklamaTR: 'Dar alanlar için tasarlanmış geniş iç hacimli, amortisörlü güvenli baza sistemi.',
          aciklamaEN: 'Spacious interior, safe shock-absorber base system designed for narrow spaces.' },
          
        { dosya: 'yatak6.jpeg', kategori: 'yatak', w: '180', d: '200', h: '110',
          baslikTR: 'Doğa Dostu Bambu Yatak', baslikEN: 'Eco-Friendly Bamboo Bed',
          aciklamaTR: 'Doğal bambu ipliklerinden dokunmuş yüzeyi ile nefes alan sağlıklı yatak.',
          aciklamaEN: 'Healthy breathing bed with surface woven from natural bamboo threads.' },
          
        { dosya: 'yatak7.jpeg', kategori: 'yatak', w: '160', d: '200', h: '120',
          baslikTR: 'Diamond Premium Yatak', baslikEN: 'Diamond Premium Bed',
          aciklamaTR: 'Paket yay sistemi sayesinde eşlerin dönüşlerinden etkilenmeyen premium konfor.',
          aciklamaEN: 'Premium comfort unaffected by partner movements thanks to the pocket spring system.' }
    ];
    
    // Resimleri JS objelerine dönüştürerek detaylandırma
    const urunler = resimListesi.map((uye, indeks) => {
        return {
            id: indeks,
            resimYolu: `fotograflar/${uye.dosya}`,
            kategori: uye.kategori,
            baslikTR: uye.baslikTR,
            baslikEN: uye.baslikEN,
            aciklamaTR: uye.aciklamaTR,
            aciklamaEN: uye.aciklamaEN,
            w: uye.w || '-',
            d: uye.d || '-',
            h: uye.h || '-'
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
                        
                        ${urun.kategori === 'perde' ? `<span class="position-absolute top-0 end-0 m-3 badge bg-secondary-gold text-dark py-2 px-3 fs-7 tracking-wider z-2 rounded-2 shadow-sm" data-i18n="badge_curtain">CLASS PERDE <span style="font-family: Arial, sans-serif;">&amp;</span> HALI</span>` : ''}
                        
                        <div class="card-img-wrapper overflow-hidden ratio ratio-4x3">
                            <img src="${urun.resimYolu}" alt="${urun.baslikTR}" class="card-img-top object-fit-cover" width="600" height="450" loading="lazy">
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
                    modalBoyutlar.innerHTML = `
                        <div class="d-flex flex-wrap gap-2 gap-md-4 mb-2 fs-6 fw-semibold text-primary-dark">
                            <span>${lW}: ${w === '-' ? '-' : w + ' cm'}</span>
                            <span>${lD}: ${d === '-' ? '-' : d + ' cm'}</span>
                            <span>${lH}: ${h === '-' ? '-' : h + ' cm'}</span>
                        </div>
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
            "nav_home": "Ana Sayfa",
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
