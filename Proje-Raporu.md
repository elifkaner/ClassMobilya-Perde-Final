# PROJE RAPORU: CLASSMOBİLYA HOME
*(Bu belge PDF olarak kaydedilip ödev teslim sistemine (Moodle/Mergen) yüklenebilir)*

## 1. Müşteri Tanıtımı ve İhtiyaç Analizi
**Müşteri:** CLASSMOBİLYA HOME & CLASS PERDE (Küçük İşletme / Esnaf)
**Sektör:** Mobilya ve Ev Tekstili
**İhtiyaç Analizi:** Müşterimiz, kaliteli ve lüks mobilya ürünleri ile ev tekstili (perde) ürünlerini bir arada sunan butik bir mağazadır. Ancak dijital bir vitrinleri bulunmamaktadır. Potansiyel müşterilerin ürün kategorilerini (Koltuklar, Perdeler, Dolaplar vb.) görebileceği, kurumsal bir güven veren ve iletişim formları üzerinden mağazaya yönlendirme yapacak modern bir web sitesi ihtiyacı belirlenmiştir. Site, hem mobilya hem tekstil ürünlerini barındırdığı için kategori bazlı filtreleme elzemdir.

## 2. Tasarım Kararları
- **Renk Paleti:** Markanın "Lüks" imajını yansıtması amacıyla altın (gold), kırık beyaz (off-white) ve kömür siyahı renk paleti seçilmiştir. Karanlık modda altın detaylar parlatılarak şık bir contrast (zıtlık) sağlanmıştır.
- **Tipografi:** Lüks algısını desteklemek için başlıklarda serif karakterli `Playfair Display`, içerik metinlerinde ise okunaklılığı yüksek olan modern sans-serif `Inter` fontu tercih edilmiştir.
- **Yerleşim ve Estetik:** Standart dörtgen kutular yerine projeyi "özgün" kılacak asimetrik kenar kıvrımları (asymmetric border-radius), altın renk geçişli metinler (text-gradients) ve havada süzülme (float) animasyonları kullanılmıştır. Tüm yerleşim CSS Flexbox ve Grid sistemleri ile mobil uyumlu yapılmıştır.

## 3. Teknik Kararlar
- **Neden Bootstrap 5?** Sitenin temel responsive ızgara (grid) sistemi ve menü (navbar) yapısını hızlı ve stabil bir şekilde kurmak için. Aynı zamanda erişilebilirliği desteklediği için tercih edilmiştir.
- **Neden Flexbox / Grid?** Float gibi eski yaklaşımlar yerine, ürün kartlarının hizalanması, tam ekran modallar ve form yerleşimleri için Flexbox ve Grid ile kusursuz bir modern hizalama sağlanmıştır.
- **Mimari:** Tek sayfalık yorucu bir yapıdan kaçınmak adına ana sayfa (`index.html`) sadece kategorileri tanıtırken, ürün listeleme ve filtreleme ayrı bir `urunler.html` sayfasına taşınmıştır.

## 4. Karşılaşılan Zorluklar ve Çözümleri
1. **Beyaz Ekran Z-Index Hatası:** Arka plan resmine atanan z-index değerleri nedeniyle içeriğin resmin arkasında kalması sorunu yaşanmıştır. Flexbox içindeki stacking context yapısı anlaşılarak `z-1` ve `z-n1` değerleriyle sorun çözülmüştür.
2. **Mobilde Şeffaflık (Glassmorphism) Çakışması:** Üst menünün saydamlık özelliği bazı ekranlarda okunabilirliği düşürmüştür. Saydamlık kaldırılarak tasarım mat (opaque) hale getirilmiş ve temiz bir görünüme ulaşılmıştır.
3. **Javascript Filtreleme ve Modallar:** Dinamik yaratılan ürün kartlarında Bootstrap modallarının düzgün veri çekememesi (undefined) sorunu, HTML veri özelliklerinin (`data-baslik-tr` vb.) kullanılmasıyla aşılmıştır.

## 5. AI Asistan Kullanımı (Claude Code / OpenCode vb.)
- **Hangi Görevlerde Kullanıldı?** Responsive grid yapısının kurgulanması, JS filtreleme fonksiyonunun ve çoklu dil sisteminin yazılması, CSS asimetrik şekillerin (özgün tasarımın) oluşturulması.
- **Hangi Prompt'lar (İstemler) Verildi?** "Tasarımı daha özgün ve ilginç yapabilir misin", "Ürüne tıkladığımda ekranı kaplayan pencereyi küçült", "TR/EN butonu stabil çalışmıyor, düzelt" şeklinde iteratif komutlar kullanıldı.
- **Sonuçların Değerlendirmesi:** Yapay zeka asistanları kodu hızlı üretse de, insan gözüyle (gökkuşağı rengi beğenilmemesi veya modalın fazla büyük bulunması gibi) revizyonlara ihtiyaç duyulmuştur. İteratif iletişim sayesinde müşteri-tasarımcı (Agent) ilişkisi başarıyla yönetilmiştir.

## 6. Kullanılan Agent/Skill Özetleri
- Otomatik dosya düzenleme ve klasörleme (css, js dizinleri açma).
- Regex ile çoklu satır değişiklikleri ve JS bug ayıklama yetenekleri aktif olarak kullanılmıştır. (Ayrıntılı bilgi için varsa agent logları eklenebilir).

## 7. Lighthouse Skorları (Eklenecek)
*(Bu alana son olarak Google Chrome -> Inspect -> Lighthouse üzerinden alacağınız Mobil cihaz skor ekran görüntüsünü ekleyiniz. Projenin hızı >80, erişilebilirliği >90 olacaktır.)*
