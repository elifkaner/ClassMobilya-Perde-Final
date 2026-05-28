# WEB TASARIM VE PROGRAMLAMA FİNAL ÖDEVİ PROJE RAPORU

**Öğrenci Adı Soyadı:** [Adınız Soyadınız]
**Proje Adı:** ClassMobilya Home & Class Perde Kurumsal Web Sitesi
**Tarih:** 28 Mayıs 2026

---

## 1. Müşteri Tanıtımı ve İhtiyaç Analizi

**1.1. Müşteri Profili:**
Projemizin müşterisi olan "ClassMobilya Home & Class Perde", Eskişehir Çamlıca Mahallesi'nde faaliyet gösteren, lüks mobilya ve ev tekstili ürünlerini (ağırlıklı olarak özel tasarım perdeler, yatak odası takımları, yemek masaları ve çok amaçlı dolaplar) tek bir çatı altında sunan butik bir işletmedir. Firmanın fiziksel bir mağazası bulunmasına rağmen, günümüz rekabet koşullarında elzem olan kurumsal bir dijital kimliği ve web sitesi bulunmamaktaydı.

**1.2. İhtiyaç Analizi ve Hedefler:**
Müşteri ile yapılan ön görüşmeler ve analizler sonucunda, işletmenin sadece bir "dijital kartvizit"ten ziyade, ürünlerini modern bir galeride sergileyebileceği, kullanıcıların kategoriler arası rahatça gezinebileceği bir platforma ihtiyacı olduğu tespit edilmiştir. 
Hedef kitlenin "evini yenilemek isteyen, kalite ve lükse önem veren" bireyler olması sebebiyle, tasarımın premium bir algı yaratması gerekiyordu. Ayrıca, müşterilerin ilgilendikleri ürünle ilgili doğrudan fiyat ve sipariş bilgisi alabilmeleri için hızlı iletişim kurabilecekleri çalışan bir form yapısı talep edilmiştir. Projenin temel amacı, yerel bir işletmenin profesyonel bir web varlığı ile potansiyel müşteri tabanını genişletmektir.

---

## 2. Tasarım Kararları ve UI/UX Yaklaşımı

**2.1. Renk Paleti:**
Markanın isim uzantısında yer alan "Class" (Sınıf/Kalite) vurgusunu yansıtmak amacıyla lüks algısı yaratan bir renk paleti oluşturulmuştur. Ana zeminlerde ferahlık hissi veren kırık beyaz (#FDFCF0) tonları kullanılırken, metinlerde ve vurgularda kömür siyahı (#1A1A1A) tercih edilmiştir. Call-to-action (harekete geçirici mesaj) butonlarında ve ikonlarda ise şıklığı tamamlayan "Altın" (#D4AF37 ve #C5A028) tonları kullanılmıştır. Geliştirme sürecinde "Karanlık Mod" denenmiş, ancak tarayıcıların otomatik OS temalarına müdahale etmesi (theme flickering) ve markanın aydınlık, ferah kimliğini bozması sebebiyle UX kararı olarak site tamamen "Aydınlık Mod (Light Mode)" üzerine sabitlenmiştir.

**2.2. Tipografi:**
Google Fonts üzerinden projeye iki modern font dahil edilmiştir. Başlıklarda (Headings) geometrik ve zarif bir yapıya sahip olan `Outfit` fontu, metin gövdelerinde (Body) ise yüksek okunabilirliği ile bilinen `Montserrat` tercih edilmiştir. Bu kombinasyon, lüks ama aynı zamanda modern bir tipografik hiyerarşi kurmamızı sağlamıştır.

**2.3. Yerleşim, Animasyonlar ve Mikro Etkileşimler:**
Standart, sıkıcı dörtgen (kutu) tasarımlarından kaçınılmıştır. "Özgünlük" kriterini sağlamak adına kart tasarımlarında asimetrik kenar kıvrımları (asymmetric border-radius) ve cam efekti (glassmorphism) kullanılmıştır. Kullanıcı deneyimini (UX) artırmak için sayfayı aşağı kaydırdıkça içeriklerin yumuşakça belirmesini sağlayan `Scroll Reveal` animasyonları eklenmiştir. 

---

## 3. Teknik Kararlar ve Mimari

**3.1. Altyapı Seçimleri:**
Proje, HTML5, CSS3 ve Vanilla JavaScript kullanılarak geliştirilmiştir. 
- **Semantik HTML5:** SEO uyumluluğu ve ekran okuyucular (erişilebilirlik) için `header, nav, main, section, article, footer` gibi anlamlı etiketler kullanılmıştır. Asla eskimiş `table` tabanlı yerleşim kullanılmamıştır.
- **CSS Flexbox ve Grid:** Eski `float` yöntemleri tamamen terk edilerek, modern CSS düzen sistemleri olan Flexbox (tek boyutlu hizalamalar, navbar ve buton grupları için) ve CSS Grid (iki boyutlu ürün galerisi ve grid sistemleri için) kullanılmıştır.
- **Bootstrap 5:** Geliştirme sürecini hızlandırmak ve sağlam bir responsive ızgara iskeleti kurmak için projeye dahil edilmiştir. Ancak tasarımın tekdüze olmaması için Bootstrap'in varsayılan stilleri, yazılan özel CSS (Custom CSS) kuralları ile tamamen ezilmiş ve özelleştirilmiştir.

**3.2. Performans ve SEO Optimizasyonu:**
Projenin Lighthouse performans skorunu >80 üzerinde tutmak için büyük hero görselleri sıkıştırılmış ve `loading="lazy"` niteliği ile yükleme süreleri optimize edilmiştir. SEO için Title, meta description, favicon, Open Graph sosyal medya etiketleri ve her görsele uygun `alt` etiketleri eklenmiştir. Ayrıca çalışan bir iletişim formu için backend yazmak yerine güvenilir üçüncü parti servis olan `FormSubmit` entegre edilmiştir.

---

## 4. Karşılaşılan Zorluklar ve Üretilen Çözümler

Proje geliştirme sürecinde çeşitli teknik engellerle karşılaşılmış ve bunlar iteratif bir şekilde çözülmüştür:

1. **Mobilde Yatay Kayma (Horizontal Overflow) ve Beyaz Şerit Hatası:**
   **Zorluk:** Cep telefonu görünümünde, ana menüdeki uzun logonun ("CLASSMOBİLYA | CLASS PERDE & HALI") ekrana sığmaması ve sağ tarafta boş bir beyaz şerit (scrollbar track) oluşması.
   **Çözüm:** CSS'te modern `clamp()` fonksiyonu kullanılarak logonun ekran genişliğine göre sıvı (fluid) bir şekilde küçülmesi sağlandı. Sağdaki beyaz şerit ise özel olarak yazılan `::-webkit-scrollbar` stilinin `@media (min-width: 992px)` sorgusu içine alınarak mobilde gizlenmesi ve `html` etiketine `overflow-x: hidden` eklenmesiyle kesin olarak çözüldü.

2. **Cihaz Temasıyla Çakışan Karanlık Mod (Theme Flickering):**
   **Zorluk:** Javascript ile yazılan aydınlık/karanlık mod geçiş sisteminin, bazı mobil cihazların "Zorunlu Karanlık Mod" ayarlarıyla çakışması ve tasarımdaki renkleri bozması.
   **Çözüm:** Marka kurumsallığını zedeleyen bu durum üzerine, `window.matchMedia` dinleyicileri koddan temizlenmiş ve tema `localStorage` kullanılarak kalıcı olarak Aydınlık (Light) moda kilitlenmiştir. Tarayıcı önbelleğindeki (cache) eski hatalı temanın silinmesi için CSS ve JS dosyalarına sürüm parametresi (`?v=2`) eklenerek "Cache Busting" yapılmıştır.

3. **JS Dinamik Modal Render ve Ölçü Hataları:**
   **Zorluk:** Javascript objesinden (Array) HTML'e dinamik olarak basılan ürün detaylarında, bazı mobilyaların (örn. TV ünitesi veya 2 kapaklı dolap) genişlik/yükseklik ölçülerinin gerçek dünya standartlarına uymaması ve mobilde çok fazla yer kaplayarak ekranı taşırması.
   **Çözüm:** Öncelikle ürün datalarındaki (JSON/Array nesneleri) ölçüler gerçek mobilya standartlarına göre revize edildi (Örn: TV ünitesi yüksekliği 190cm'den 55cm'ye düşürüldü). Ardından modal içerisindeki fotoğrafın `min-height` değeri mobilde `200px` olacak şekilde sınırlandırılarak dikey kaydırma zorunluluğu ortadan kaldırıldı.

---

## 5. Yapay Zeka (AI) Asistan Kullanımı ve Değerlendirmesi

Bu projenin geliştirme sürecinde Google Gemini (Antigravity) tabanlı yapay zeka kodlama asistanlarından aktif olarak faydalanılmıştır (Pair-Programming).

- **Hangi Görevlerde Kullanıldı?**
  Responsive (duyarlı) grid yapısının kurgulanmasında, CSS ile asimetrik/glassmorphism gibi modern tasarım detaylarının yazılmasında, Çoklu dil (TR/EN) geçiş sisteminin Vanilla JS ile kodlanmasında ve tarayıcıya özgü hataların (cache, overflow) tespit edilip çözülmesinde.

- **Kullanılan Prompt (İstem) Örnekleri:**
  - *"Hazır bir şablon kullanmadan, bana CSS Flexbox ve Grid kullanarak modern ve lüks bir Hero bölümü kodlar mısın?"*
  - *"Telefondan girince sağ tarafta kaydırma çubuğunun (scrollbar) beyaz izi kalıyor, bunu sadece CSS ile nasıl gizleyebiliriz?"*
  - *"Ürün detaylarına (Modal) tıkladığımda telefonda ekranı çok taşıyor, fotoğrafı küçültüp responsive kurallarıyla ekrana tam sığmasını sağla."*
  - *"Karanlık mod (dark mode) bazı cihazlarda sitenin renklerini bozuyor, temayı tamamen kalıcı olarak Aydınlık (Light) modda nasıl sabitleyebilirim?"*

- **Sonuçların Değerlendirmesi:**
  Yapay zeka asistanı temel kod iskeletini (HTML boilerplate, CSS gridleri ve JS dizilerini) çok hızlı ve hatasız bir şekilde kurarak zaman tasarrufu sağlamıştır. Ancak tasarımın estetik boyutu (renklerin fazla açık kalması, responsive sorunlar) ve iş mantığı hatalarında insan gözetimine ihtiyaç duyulmuştur. Asistan ile iteratif (sürekli geri bildirim vererek) çalışmak, ortaya çıkan UI/UX pürüzlerini hızla zımparalamamızı ve projeyi tam anlamıyla mükemmelleştirmemizi sağlamıştır.

---

## 6. Lighthouse ve Erişilebilirlik (Accessibility) Özeti

Proje boyunca WCAG 2.2 AA standartlarına dikkat edilmiş; altın rengi tonları beyaz arka plan üzerinde yeterli kontrast oranını (Contrast Ratio) yakalayacak şekilde koyulaştırılmış, klavye ile gezinilebilirliği sağlamak için "Skip to main content" (Ana İçeriğe Atla) gizli bağlantısı eklenmiş ve tüm ikon/görsellere `aria-label` veya `alt` nitelikleri girilmiştir.

**[Buraya Lighthouse Mobil Testinizin (Performance ve Accessibility) Ekran Görüntülerini Ekleyiniz]**

*(Bu kısma Google Chrome > İncele (Inspect) > Lighthouse sekmesinden yapacağınız analizin ekran görüntüsünü Word belgesine yapıştırınız. Hedeflenen skor Performans >80, Erişilebilirlik >90'dır.)*
