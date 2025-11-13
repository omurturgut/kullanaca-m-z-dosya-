# Posthumane Website - Optimized Structure

Bu proje, orijinal tek dosyalı HTML dosyasını optimize edilmiş, modüler bir yapıya dönüştürülmüş halidir.

## 📁 Dosya Yapısı

```
/
├── index.html                  # Ana HTML dosyası (temiz, optimize edilmiş)
├── css/
│   └── style.css              # Tüm CSS stilleri (mobil optimize)
├── js/
│   └── script.js              # Tüm JavaScript kodları
├── images/                     # Lokal görseller için klasör
├── IMAGES_TO_DOWNLOAD.md      # İndirilmesi gereken görsellerin listesi
└── README.md                   # Bu dosya
```

## ✨ Yapılan Optimizasyonlar

### 1. **Dosya Ayrımı**
- ✅ HTML, CSS ve JavaScript ayrı dosyalara ayrıldı
- ✅ 8,519 satırlık tek dosya → 3 modüler dosyaya bölündü
- ✅ Daha kolay bakım ve geliştirme

### 2. **CSS Optimizasyonları** (126 KB)
- ✅ Tüm stiller `css/style.css` dosyasına taşındı
- ✅ Ek mobil responsive iyileştirmeler eklendi
- ✅ Touch target optimizasyonları (minimum 44px)
- ✅ Landscape mode desteği
- ✅ Accessibility iyileştirmeleri
- ✅ Print styles eklendi
- ✅ High contrast mode desteği
- ✅ Reduced motion desteği
- ✅ `svh` viewport units kullanımı (modern mobile browsers)

### 3. **JavaScript Optimizasyonları** (81 KB)
- ✅ Tüm scriptler `js/script.js` dosyasına taşındı
- ✅ Performance optimizasyonları korundu
- ✅ Lazy loading implementasyonu
- ✅ RAF (RequestAnimationFrame) kullanımı
- ✅ Passive event listeners

### 4. **HTML Optimizasyonları** (183 KB)
- ✅ Temiz, okunabilir yapı
- ✅ External CSS ve JS linkleri
- ✅ SEO optimizasyonları korundu
- ✅ Meta taglar tam
- ✅ Semantic HTML

### 5. **Mobil Responsive İyileştirmeler**
- ✅ **Touch Targets**: Tüm butonlar minimum 44x44px
- ✅ **Font Scaling**: clamp() kullanımıyla dinamik font boyutları
- ✅ **Viewport Units**: `svh` kullanımı ile mobil tarayıcılarda daha iyi görünüm
- ✅ **Flexible Layouts**: Grid ve Flexbox ile responsive düzen
- ✅ **Landscape Mode**: Yatay ekran desteği
- ✅ **Breakpoints**:
  - 📱 Mobile: < 480px
  - 📱 Tablet: 481px - 768px
  - 💻 Desktop: 769px - 1024px
  - 🖥️ Large Desktop: > 1024px

### 6. **Erişilebilirlik (Accessibility)**
- ✅ Focus states iyileştirildi
- ✅ Skip to content linki eklendi
- ✅ ARIA labels korundu
- ✅ Keyboard navigation desteği
- ✅ Screen reader friendly

## 🚀 Kurulum ve Kullanım

### 1. Görselleri İndirin
`IMAGES_TO_DOWNLOAD.md` dosyasındaki talimatları takip ederek 9 adet görseli indirin ve `images/` klasörüne yerleştirin.

### 2. Lokal Sunucu Başlatın
```bash
# Python ile
python -m http.server 8000

# Node.js ile (http-server)
npx http-server

# VS Code Live Server extension kullanabilirsiniz
```

### 3. Tarayıcıda Açın
```
http://localhost:8000
```

## 📱 Mobil Test

Website mobil cihazlarda test edilmelidir:

1. **Chrome DevTools**:
   - F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Farklı cihaz boyutlarını test edin

2. **Gerçek Cihazlar**:
   - iPhone (Safari)
   - Android (Chrome)
   - Tablet

3. **Test Edilmesi Gerekenler**:
   - ✅ Touch interaction (buttons, links, navigation)
   - ✅ Scroll behavior
   - ✅ Image loading
   - ✅ Font readability
   - ✅ Layout stability
   - ✅ Landscape/Portrait mode

## 🎨 Özelleştirme

### Renk Değiştirme
Ana renk: `#7dd3c0` (teal/turkuaz)
```css
/* css/style.css içinde arayın ve değiştirin */
--primary-color: #7dd3c0;
```

### Font Değiştirme
```css
/* css/style.css */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

### Animasyon Hızı
```css
/* css/style.css içinde transition-duration değerlerini ayarlayın */
transition: all 0.3s ease;
```

## 📊 Dosya Boyutları

- **HTML**: 183 KB (orijinal: 309 KB)
- **CSS**: 126 KB (ayrı dosya)
- **JS**: 81 KB (ayrı dosya)
- **Toplam**: ~390 KB (görseller hariç)

## 🔧 Geliştirme Notları

### Image Path Update
Görselleri indirdikten sonra, URL'leri güncelleyin:

```html
<!-- Eski -->
<img src="https://i.ibb.co/YBSFK4FQ/posthumane-logo-geometric.png">

<!-- Yeni -->
<img src="images/posthumane-logo.png">
```

### Performance Tips
1. Görselleri optimize edin (TinyPNG, ImageOptim)
2. WebP formatı kullanın (modern browsers için)
3. Lazy loading aktif (zaten mevcut)
4. CDN kullanın (production için)

## 🐛 Bilinen Sorunlar

- YouTube thumbnailleri hala external linklerden çekiliyor (isteğe bağlı local yapılabilir)
- Bazı arka plan görselleri büyük boyutlu (optimize edilebilir)

## 📝 Changelog

### v1.0.0 (2025-11-13)
- ✅ HTML, CSS, JavaScript ayrıldı
- ✅ Mobil responsive iyileştirmeler eklendi
- ✅ Accessibility improvements
- ✅ Print styles eklendi
- ✅ Image download listesi oluşturuldu

## 🤝 Katkıda Bulunma

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 İletişim

- Website: https://posthumane.com
- Email: info@posthumane.com

## 📄 Lisans

Bu proje Posthumane'e aittir.

---

**Made with ❤️ by Claude Code Assistant**
