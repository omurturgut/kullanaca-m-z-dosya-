# 📖 Çocuk Kitabı Stüdyosu

Tarayıcıda çalışan, kurulum gerektirmeyen bir **çocuk kitabı otomasyon aracı**.
Tek dosya (`index.html`) — açman yeterli.

## Akış

1. **Metin** — Kitap adı, yazar ve sayfa sayfa metin. Her sayfaya görsel yüklenebilir.
2. **Boyut** — Kare 20×20, A5, A4 (dikey/yatay) + matbaa için taşma payı (bleed).
3. **Yaş kategorisi** — 0–3 / 3–6 / 6–9 / 9–12. Font boyutu, satır aralığı ve
   sayfa başına önerilen kelime sayısını otomatik ayarlar.
4. **Şablon** — 6 yerleşim düzeni (üstte görsel, yan yana, üstüne yazı, sadece metin…)
   × 6 renk teması. Önizleme anında güncellenir.
5. **Önizleme & PDF** — Yaprak yaprak önizleme, kapak ekleme, ardından
   **basıma hazır PDF** dışa aktarımı.

## Kullanım

`index.html` dosyasını bir tarayıcıda aç. Hepsi bu.
Tüm veriler (metin + görseller) yalnızca senin tarayıcında `localStorage` içinde
saklanır — sunucuya hiçbir şey gitmez. Otomatik kaydedilir.

### PDF / baskı ipuçları
- PDF butonuna basınca yazdırma penceresi açılır → **Hedef: "PDF olarak kaydet"**.
- **Kenar boşluğu: Yok / None**, **Arka plan grafikleri: Açık** olmalı.
- Sayfa boyutu seçilen boyuta (+bleed) göre otomatik ayarlanır.
- En iyi baskı için görseller **300 DPI** olsun (20×20 cm ≈ 2400×2400 px).

## Yol haritası (sonraki adımlar)
- [ ] Görselleri AI ile otomatik üretme (görsel-üretim API'si ile)
- [ ] Sayfa başına farklı şablon seçimi
- [ ] Gerçek vektörel PDF + kesim işaretleri (crop marks)
- [ ] Projeyi dosya olarak dışa/içe aktarma (yedekleme)
- [ ] Çoklu dil / sağdan sola metin desteği
