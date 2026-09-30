# 🚛 FleetFlow — Global Logistics & Fleet Telematics Platform (SaaS)

> **Production-grade, Multi-Page B2B Logistics Management System built with React, Tailwind CSS, Lucide Icons, and Recharts.**

---

## 📌 Muammo va Yechim (The Real-World Problem & Solution)

### ❌ An’anaviy logistikadagi muammolar:
1. **Tartibsizlik va Ma’lumotlar yo‘qolishi:** Kompaniyalar yuklar va buyurtmalarni Excel yoki Telegram guruhlarida yuritadi.
2. **Kuzatuvning yo‘qligi (Blind Transit):** Yuk qayerdaligi, qachon yetib borishi va bojxona to‘xtalishlari haqida real vaqtda xabardor bo‘linmaydi.
3. **Moliya va Invoyslar kechikishi:** Qog‘oz hisob-fakturalar haftalab kechikib, naqd pul aylanmasini to‘xtatib qo‘yadi.
4. **Rol chalkashliklari:** Dispetcher, haydovchi va mijozlar o‘rtasida yagona tizim yo‘q.

###  FleetFlow yechimi:
* **Yagona boshqaruv markazi (Control Tower):** Barcha xalqaro va ichki reyslar, haydovchilar va avtopark bitta tizimda.
* **Jonli GPS Telemetriya Xaritasi:** Mashina tezligi, yoqilg‘i/batareya sarfi, yuk bo‘lmasidagi harorat (-4°C gacha bo‘lgan sovutgich telemetriyasi) va ETA hisob-kitobi.
* **1-Click Tijorat Invoyslari:** Soliq hisoblangan avtomatik PDF invoys generatsiyasi va to‘lov monitoringi.
* **Ko‘p rolli tizim (RBAC Demo):** Admin, Dispetcher va Mijoz kabinetlari o‘rtasida tezkor almashish.

---

## 🚀 Sahifalar va Funksiyalar (10+ Sahifa va Modullar)

1. **Marketing Landing Page (`/`):**
   * Zamonaviy Hero, Interaktiv jonli yuk qidiruvi (`FF-98214`, `FF-98216`), narx rejalari (Pricing tiers) va statistik ko‘rsatkichlar.
2. **Autentifikatsiya & 1-Click Role Access (`/login`):**
   * Portfolioni ko‘rayotgan mutaxassislar uchun parolsiz 1 bosishda Admin, Dispetcher yoki Mijoz sifatida kirish tugmalari.
3. **Executive Dashboard (`/app/dashboard`):**
   * Oylik daromad va yuk yetkazish grafigi (Recharts AreaChart), yuk turlari taqsimoti (PieChart), KPI kartalari va so‘nggi buyurtmalar jadvali.
4. **Yuklar va Manifestlar (`/app/shipments`):**
   * Ko‘p bosqichli qidiruv, statuslar bo‘yicha filtrlar (*In Transit*, *Delivered*, *Customs Hold*), ma’lumotlarni **CSV formatida yuklab olish**.
5. **Yangi Buyurtma Yaratish (Multi-Step Form Wizard) (`/app/shipments/new`):**
   * 1-qadam: Jo‘natuvchi va qabul qiluvchi manzillari.
   * 2-qadam: Yuk parametrlari (og‘irlik, hajm, xavflilik darajasi, refrijerator harorati).
   * 3-qadam: Avtomobil va haydovchi tanlash, dinamik tarif hisoblash formulasi.
   * 4-qadam: Tasdiqlash va avtomatik Tracking ID (`FF-XXXXX`) generatsiyasi.
6. **Jonli GPS Telemetriya Xaritasi (`/app/tracking`):**
   * Yevroosiyo multimodal transport yo‘lagining interaktiv SVG xaritasi, harakatdagi mashinalar, bosim/tezlik/harorat datchiklari ma’lumotlari.
7. **Avtopark va Haydovchilar (`/app/fleet`):**
   * Mashinalar texnik holati, dvigatel diagnostikasi, haydovchilar reytingi (4.95★) va litsenziyalari.
8. **Moliya va Invoyslar (`/app/invoices`):**
   * B2B hisob-fakturalar, qarzdorliklar, bosmaga tayyor rasmiy PDF invoys ko‘rinishi (`window.print()`).
9. **Biznes Analitika & BI (`/app/analytics`):**
   * Yo‘nalishlar samaradorligi, o‘z vaqtida yetkazish SLA foizi (98.4%) va elektr yuk mashinalari hisobiga CO₂ kamayishi tahlili.
10. **Tizim Sozlamalari va Audit Log (`/app/settings`):**
    * Kompaniya profili, API kalitlari va tizimdagi barcha o‘zgarishlarning xavfsiz Audit Log tarixi.

---

## 🛠 Texnologik Stek

* **Frontend:** React 19, Vite 8
* **Styling:** Tailwind CSS (To'liq Dark Mode & Light Mode qo'llab-quvvatlovi bilan)
* **Theme System:** HTML class-based CSS toggle, LocalStorage persistence, bir zumda almashinish (Sun / Moon)
* **Routing:** React Router DOM (v7)
* **Icons:** Lucide React
* **Charts & Analytics:** Recharts
* **State Management:** React Context API + LocalStorage persistence

---

## 💻 Loyihani ishga tushirish (Local Run)

Terminalda quyidagi buyruqni bering:

```bash
# Loyihani rivojlantirish rejimida ishga tushirish:
npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching.
