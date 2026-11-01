# 🌾 GraminSeva (ग्रामीण सेवा) / KisanMitra

> **Hyperlocal Rural Digital Service & Agritech Platform powered by Google Gemma AI, ICAR Agricultural Knowledge, and Real-Time Mandi Logistics.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/Languages-Hindi%20%7C%20English%20%7C%20Punjabi%20%7C%20Marathi%20%7C%20Telugu-blue.svg)](#-multilingual-support)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Google%20Gemma%203%20%2F%204%20IT-teal.svg)](#-ai-crop-doctor--gemma-3-integration)
[![Design](https://img.shields.io/badge/Design-Mobile--First%20%26%20Field--Ready-amber.svg)](#-field-optimized-farmer-ux)

---

## 📌 Overview

**GraminSeva** (KisanMitra) is a lightweight, mobile-first web platform engineered specifically for Indian farmers and rural communities. In village environments, farmers often face severe information asymmetry: fluctuating APMC mandi rates, hidden transport costs eating up profits, crop disease outbreaks, difficulty accessing costly agricultural machinery, and delayed emergency medical response (e.g., snakebite anti-venom).

GraminSeva unites four essential rural pillars into a single fast, offline-resilient dashboard:
1. **Live Mandi Rates & Net In-Hand Realization Estimator**
2. **AI Plant Doctor & Pest Advisory (Google Gemma AI + ICAR Corpus)**
3. **Custom Hiring Center (Shared Tractors, Implements & Spray Drones)**
4. **Rural Emergency Logistics (Anti-Venom, Veterinary Doctors & KVKs)**

---

## 🌟 Core Features

### 1. 📊 APMC Mandi Tracker & Net Realization Estimator
- **Live Mandi Comparison**: Live benchmark rates across regional agricultural yards (e.g., Meerut, Hapur, Muradnagar, Azadpur, etc.) with arrival volume in tons/bales and market trend indicators (`+₹40 rise`, `Stable`, `-₹50 drop`).
- **Net-in-Hand Freight Calculator**: Instead of only seeing the gross benchmark price, farmers can enter distance (km) and vehicle haulage rate (₹/km). The calculator computes:
  $$\text{Net Profit} = (\text{Quantity} \times \text{Mandi Rate}) - (\text{Distance} \times \text{Haulage Rate})$$
  and displays the true net earnings realized per quintal.
- **One-Click Mandi Selection**: Tapping *"Calculate Profit at this Mandi"* automatically populates distance and modal rate into the estimator.

### 2. 🔬 AI Crop Doctor (Gemma 3 & ICAR Knowledge Base)
- **Instant Symptom Diagnosis**: Farmers can upload a leaf/pest photo, choose from common crop symptoms, or describe issues in their own words or via microphone dictation.
- **Google Gemma AI Live Consultation**: Sends structured prompts to the Google Generative Language API (`gemma-3-27b-it` with automatic fallback to `gemma-4-26b-a4b-it`).
- **Structured 3-Point Output**: Every diagnosis returns:
  1. **Point 1: Disease Diagnosis** (संभावित रोग व पहचान लक्षण)
  2. **Point 2: ICAR Certified Remedy** (मानक रासायनिक दवा व सटीक मात्रा/खुराक)
  3. **Point 3: Native Organic / Bio Remedy** (देसी जैविक काढ़ा जैसे नीम तेल, छाछ-हींग घोल या दशपर्णी अर्क)
- **Voice Readout (Audio Assistant)**: Integrated Web Speech API reads the complete advisory aloud for illiterate or elderly farmers.

### 3. 🚜 Community Machinery Sharing (Custom Hiring Center)
- **Peer-to-Peer Equipment Hire**: Rent tractors, rotavators, laser land levelers, harvesters, and solar pump sets from verified nearby farmers at standardized hourly/acreage rates.
- **High-Tech Drone Spraying**: Book agricultural drones for precision pesticide and nano-urea spraying.
- **Equipment Booking Modal**: Date pickers, acre selection, cost calculation, and instant confirmation toast.
- **Listing Tool**: Verified farmers can list their idle machinery to earn supplemental income.

### 4. 🚑 Hyperlocal Emergency & Rural Helplines
- **Anti-Venom Centers**: Verified stockists with real-time vial availability counts and direct phone links for critical snakebite emergencies.
- **Veterinary Clinics (पशु चिकित्सा)**: Immediate ambulance and surgeon contacts for cattle, buffalo, and livestock ailments.
- **Krishi Vigyan Kendra (KVK)**: Direct access to soil health card testing and agronomists.
- **Civic Services**: Village Patwari land record assistance and crop insurance (PMFBY) helpdesks.

### 5. ☀️ Field-Optimized Farmer UX
- **Sunlight Mode (धूप मोड)**: One-click high-contrast filter boosting contrast and saturation for crystal-clear readability under harsh, direct outdoor sunlight.
- **Voice-First Navigation**: Microphone search command listens to regional queries (e.g., *"गेहूं का भाव बताओ"* or *"फसल में कीड़ा लगा है"*) and routes to the correct tab.
- **Mobile Bottom Navigation Bar**: Fixed thumb-friendly navigation bar on mobile phones.

---

## 🌐 Multilingual Support

The entire interface—including brand banners, navigation, calculator labels, Mandi cards, status badges, units, and AI advisories—is 100% dynamically translated into **5 major Indian languages**:

| Code | Language | Native Script | Status |
| :---: | :--- | :--- | :---: |
| `hi` | **Hindi** | हिन्दी | Default / Primary |
| `en` | **English** | English | Full Support |
| `pa` | **Punjabi** | ਪੰਜਾਬੀ | Full Support |
| `mr` | **Marathi** | मराठी | Full Support |
| `te` | **Telugu** | తెలుగు | Full Support |

Language switching uses clean `[data-i18n]` bindings and reactive re-rendering without reloading the page.

---

## 📁 Repository Structure

The project follows a clean separation of concerns:

```plaintext
GraminSeva/
├── index.html       # Pure semantic HTML5 structure with i18n data bindings
├── style.css        # Custom styles, high-contrast sunlight mode & animations
├── script.js        # Core logic: Mandi calculator, i18n dictionary, Gemma AI API & modals
├── server.js        # Lightweight local HTTP server for LAN & mobile access
├── .gitignore       # Git ignore rules for node, logs, and sensitive files
└── README.md        # Complete project documentation & setup guide
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 1. Clone or Open the Repository
```bash
git clone https://github.com/your-username/GraminSeva.git
cd GraminSeva
```

### 2. Start the Local Server
Run the built-in zero-dependency server:
```bash
node server.js
```
The server will start listening on port `8080`:
```text
Server running at http://localhost:8080 and accessible on LAN.
```

### 3. Open on Your Devices
- **On Your Computer**: Open [http://localhost:8080](http://localhost:8080) in your browser.
- **On Your Mobile Phone (Same Wi-Fi)**:
  1. Find your computer's local IP address (`ipconfig` on Windows or `ifconfig` on macOS/Linux).
  2. Open your phone's browser and go to:
     ```text
     http://<YOUR_COMPUTER_IP>:8080
     # Example: http://192.168.1.33:8080
     ```

---

## 🔑 Gemma AI Configuration

The Agri-Doctor module connects to the Google Generative Language API endpoint:

```text
POST https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=YOUR_API_KEY
```

### Best Practices for Secrets Management:
1. **Never commit production API keys to public repositories.**
2. In `script.js`, replace the placeholder key:
   ```javascript
   const GEMMA_API_KEY = "YOUR_GEMINI_OR_GEMMA_API_KEY";
   ```
3. Alternatively, for production deployment, proxy requests through a secure backend (e.g. Node.js Express server or Cloud Function) so your API key remains hidden from client-side inspection.

---

## 🛠️ Tech Stack

- **Frontend Core**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: [Tailwind CSS CDN](https://tailwindcss.com/) with customized rural color scales (`farmer`, `soil`)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Typography**: [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)
- **AI Models**: Google Gemma 3 27B IT / Gemma 4 26B IT / Gemini Flash (ICAR knowledge prompt architecture)
- **Browser APIs**: Web Speech Recognition API, SpeechSynthesisUtterance, FileReader API, LocalStorage

---

## 🗺️ Roadmap & Future Enhancements

- [ ] **PWA / Service Worker**: Full offline support with IndexedDB caching of all regional mandi arrivals.
- [ ] **WhatsApp / SMS Gateway**: Automated daily mandi rate alerts sent via Twilio or Gupshup.
- [ ] **Camera Vision Model**: Direct leaf lesion classification using on-device TensorFlow.js / Gemma Vision.
- [ ] **IoT Soil Sensor Sync**: Bluetooth integration with low-cost NPK and soil moisture sensors.
- [ ] **Govt Scheme Tracker**: Automated matching of farmer landholding with PM-Kisan and PMFBY subsidies.

---

## 🤝 Contributing

Contributions make the open-source community a place to learn, inspire, and create! Any contributions to improve GraminSeva are **warmly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Made with ❤️ for Indian Farmers & Rural Communities 🌾**
