# External Images to Download

Bu dosya, website'de kullanılan ve external linklerden çekilen görsellerin listesini içeriyor.
Tüm görselleri indirip `images/` klasörüne yerleştirmeniz gerekmektedir.

## Kullanım Talimatları

1. Aşağıdaki her bir görseli indirin
2. Görselleri `images/` klasörüne yerleştirin
3. Dosya isimlerini aşağıda belirtildiği şekilde adlandırın

---

## Logo ve Marka Görselleri

### 1. Posthumane Logo (Ana Logo)
- **URL**: `https://i.ibb.co/YBSFK4FQ/posthumane-logo-geometric.png`
- **Kullanım**: Loader, Header, Footer
- **Yeni Dosya İsmi**: `images/posthumane-logo.png`
- **Kullanım Sayısı**: 3 yerde kullanılıyor

### 2. Turkish Airlines Logo
- **URL**: `https://i.ibb.co/tMxZnmNT/pngwing-com.png`
- **Kullanım**: Trust Section - Client Logo
- **Yeni Dosya İsmi**: `images/client-turkish-airlines.png`

### 3. Anadolu Agency Logo
- **URL**: `https://i.ibb.co/4wF2Y2xs/logo-9.webp`
- **Kullanım**: Trust Section - Client Logo
- **Yeni Dosya İsmi**: `images/client-anadolu-agency.webp`

### 4. Istanbul Bilgi University Logo
- **URL**: `https://i.ibb.co/d0BcjnjW/bilgi-logotype-tr.png`
- **Kullanım**: Trust Section - Client Logo
- **Yeni Dosya İsmi**: `images/client-bilgi-university.png`

### 5. ODTÜ METU Logo
- **URL**: `https://i.ibb.co/jZVV9PNF/logo-13.webp`
- **Kullanım**: Trust Section - Client Logo
- **Yeni Dosya İsmi**: `images/client-metu.webp`

---

## Profil Fotoğrafları

### 6. Ömür (Co-Founder) Profil Fotoğrafı
- **URL**: `https://i.ibb.co/204ZfRfZ/7cf81a69-da32-47cd-83ba-a0331b49c454.png`
- **Kullanım**: About Section - Founder Card
- **Yeni Dosya İsmi**: `images/founder-omur.png`

### 7. Emre (Co-Founder) Profil Fotoğrafı
- **URL**: `https://i.ibb.co/KMjQ4zZ/55d4f0e4-a44a-4d90-837b-771a9090918a.png`
- **Kullanım**: About Section - Founder Card
- **Yeni Dosya İsmi**: `images/founder-emre.png`

---

## Arka Plan Görselleri

### 8. Green Landscape (Hero Background)
- **URL**: `https://i.ibb.co/hJ2918VB/u4938782892-Full-green-plain-ground-with-beautiful-white-sky-35e12c56-5db6-4c04-855d-eb1c49863e35.png`
- **Kullanım**: Hero Section & Services Section Background
- **Yeni Dosya İsmi**: `images/bg-green-landscape.png`
- **Kullanım Sayısı**: 2 yerde kullanılıyor

### 9. Valley of Shadows (How It Works Background)
- **URL**: `https://i.ibb.co/vfjcBNR/u4938782892-httpss-mj-run4p1ezs64l-FM-valley-of-shadows-ar-169-04aff505-6243-4a76-ad0a-ff2c0efd5ba7.png`
- **Kullanım**: How It Works Section Background
- **Yeni Dosya İsmi**: `images/bg-valley-shadows.png`

---

## YouTube Video Thumbnails

**NOT**: YouTube thumbnailleri otomatik olarak YouTube'dan çekiliyor.
Bu görselleri manuel olarak indirmenize gerek YOK çünkü YouTube API'si üzerinden dinamik olarak yükleniyor.

YouTube thumbnail URL formatı: `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`

Eğer offline çalışma veya daha hızlı yükleme istiyorsanız, aşağıdaki video ID'lerini kullanarak indirip `images/thumbnails/` klasörüne yerleştirebilirsiniz:

1. G6qVwP4EdKw - Medical Pressure Monitor
2. sZQLqMFsJj8 - Soviet Surreal Horror II
3. -3WF6vhtzqw - Soviet Horror Surrealism
4. 268l-S9PBzk - İstanbul Valiliği
5. q_kpxMBvLaM - Creative Production
6. 9nYB1vwJAlI - Transformation Story
7. SaLdAB9B_f0 - Creator Community Sales
8. lfmiu53kkSc - AI Tools Breakdown
9. LOm4Bk6JhTo - Vogue AI Editorial
10. K53AaBEz2iQ - Veo 3.1 Community
11. xCuY-Kvvi58 - Mythological Horror
12. Y6lwtkzrZYE - Wes Anderson Ad
13. 9FU033g-ioc - Visual Study
14. A3Eo2CFR9pI - Çınar Koleji 30th Anniversary
15. Rlz6dWB9toY - Çınar Koleji Pixar Style
16. 9qyKLSSpQNs - Demsa Bab-ı Ali Istanbul
17. zL1lKx5yZU8 - Vinsight Working AI
18. Jx3WWetX7Qc - Just Two Minutes

---

## Özet

**İndirmeniz Gereken Toplam Görsel**: 9 adet
- Logo ve Markalar: 5 adet
- Profil Fotoğrafları: 2 adet
- Arka Plan Görselleri: 2 adet

**İsteğe Bağlı (YouTube Thumbnails)**: 18 adet

---

## İndirme Sonrası

Tüm görselleri indirdikten sonra, HTML ve CSS dosyalarındaki external URL'leri local path'lere güncelleyin:

- `https://i.ibb.co/YBSFK4FQ/...` → `images/posthumane-logo.png`
- `https://i.ibb.co/tMxZnmNT/...` → `images/client-turkish-airlines.png`
- vb.

Bu işlemi otomatik yapmak için bir search & replace yapabilirsiniz.
