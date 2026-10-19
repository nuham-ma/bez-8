# ☕ BEZ/8 Cafe & Fast Food — Verified Landing Page

A modern, responsive, and high-converting speculative landing page for **BEZ/8 Cafe** (ቤዝ/8 ካፌና ፋስት ፉድ), located in Kolfe Likwanda, Addis Ababa, Ethiopia.

Built with authentic photography extracted from the owner's collages, bilingual Amharic + English support, live operating hours status, WhatsApp one-tap ordering, and zero fabricated data following the **Possible Technology P.L.C.** internship guidelines.

---

## 📍 Verified Business Information

| Field | Verified Detail |
| :--- | :--- |
| **Official Name** | **BEZ/8 Cafe** (*ቤዝ/8 ካፌና ፋስት ፉድ*) |
| **Established Date** | **November 23, 2023** (*ኅዳር 13፣ 2016 ዓ.ም.*) |
| **Physical Address** | **Kolfe Likwanda, 100m past Basha Grocery**, Addis Ababa, Ethiopia (*ኮልፌ ሊኳንዳ፤ ከባሻ ግሮሰሪ 100 ሜትር ገባ ብሎ*) |
| **Google Maps** | [BEZ/8 on Google Maps](https://maps.app.goo.gl/cjoJ9WFy1uAxq9DQ8) (Plus Code: `2PM4+GMJ Addis Ababa`) |
| **Operating Hours** | **Daily: 7:00 AM – 9:30 PM EAT** (*በየቀኑ ከጠዋቱ 1:00 ሰዓት እስከ ምሽቱ 3:30*) |
| **Phone Hotline** | `+251 978 454 772` / `0978454772` |
| **WhatsApp Chat** | `+251 978 454 772` |
| **Email Address** | `Kalabhabt63@gmail.com` |
| **Brand Colors** | Deep Obsidian (`#0F0F11`), Neon Yellow (`#FACC15`), Crimson Red (`#EF4444`), Living Moss Green (`#22C55E`) |

---

## 🍕 Popular Menu Items & Specialties

### 🍽️ Signature Foods
1. **Signature BEZ/8 Pizza (*ልዩ የቤዝ/8 ፒዛ*)**: Fresh handmade dough baked with seasoned ground meat, mozzarella, black olives, sweet peppers, and house herb tomato sauce.
2. **Classic Beef Burger & Fries (*ልዩ የከብት ስጋ በርገር*)**: Grilled beef patty with melted cheese, crisp lettuce, tomato, house sauce, and golden crispy fries.
3. **Savory Stir-Fry Noodles (*ልዩ ስተር-ፍራይ ኑድልስ*)**: Sautéed noodles with fresh vegetables, house aromatics, and savory reduction.
4. **Fresh Garden Salad (*ትኩስ ጋርደን ሰላጣ*)**: Crisp seasonal greens, garden cucumbers, cherry tomatoes, and onions tossed in vinaigrette.

### 🥤 Signature Beverages
1. **Signature Mojito Milk (*ልዩ የሞጂቶ ወተት*)**: BEZ/8's famous house specialty — a refreshingly smooth, creamy mint cooler.
2. **Chilled Iced Mocha (*አይስድ ሞካ*)**: Rich espresso layered with bittersweet chocolate, cold milk, and crushed ice.
3. **Traditional Ethiopian Macchiato (*ባህላዊ ማኪያቶ*)**: Aromatic local espresso topped with velvety steamed milk froth.
4. **Fresh Tropical Juices (*ትኩስ የተፈጥሮ ጁስ*)**: Fresh pressed mango, avocado, papaya, and layered 'spris' fruit juice.

---

## 🎨 Visual Identity & Photography

All photos used in this landing page were extracted from the owner's authentic photo collages using an automated high-resolution Sharp script ([`scripts/process-images.cjs`](scripts/process-images.cjs)):
- **Facade & Entrance**: Building staircase and exterior cafe view.
- **Fresh Pizza**: Real pizza closeup served on table with the cafe's honeycomb wall background.
- **Living Moss Wall**: The crowned neon **"BEZ/8 JUICE & FAST FOOD"** emblem.
- **Honeycomb Lounge**: Modern yellow leather booths and stylish geometric walls.
- **Espresso Bar**: Commercial espresso machine, cups, bicycle decor, and coffee bean mural.
- **Dining Murals**: Pop-art pizza wall mural and circular dining tables with chandeliers.

---

## ⚡ Key Features

- **Dynamic Live Hours Status**: Automatically checks Ethiopian local time (UTC+3) and displays a live glowing badge:
  - 🟢 **አሁን ክፍት ነው (Open Now)** during 7:00 AM – 9:30 PM.
  - 🟡 **አሁን ዝግ ነው (Closed Now)** outside opening hours.
- **Bilingual Amharic + English**: Amharic is the primary default language with an instant, zero-reload switch to English. Preference is persisted in `localStorage`.
- **One-Tap WhatsApp Ordering**: Every menu card includes a button that opens WhatsApp (`wa.me/251978454772`) with a pre-filled dish name.
- **One-Click Address Copy**: Instant feedback when copying the address to clipboard.
- **Interactive Lightbox**: Full-screen modal for photo gallery exploration.
- **Social Sharing Previews**: Complete Open Graph meta tags for link previews on WhatsApp, Telegram, and Facebook.
- **Speculative Attribution**: Transparent disclaimer attributing the demo concept to *Possible Technology P.L.C.* without implying commissioned ownership.

---

## 🚀 How to Run & Build

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (with hot reload)
npm run dev

# 3. Run automated integrity audit (verifies images, translations & links)
npm run verify

# 4. Build optimized production bundle
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## 📄 License & Attribution

- **Demo Concept**: Created by **Possible Technology P.L.C.** as part of the speculative landing-page internship program.
- **Brand & Media**: All trademarks, photos, and brand identity belong to **BEZ/8 Cafe**.
