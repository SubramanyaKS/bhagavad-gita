# Bhagavad Gita (श्रीमद्भगवद्गीता)

A full-stack, contemplation-focused digital sanctuary for exploring the **Bhagavad Gita**. Built with a **FastAPI** backend and a **Next.js 16** (App Router) frontend, featuring multilingual script transliteration, structured learning pathways, and **Gemini AI** guidance strictly grounded in the sacred text.

---

## Highlights & Features

- **📖 Complete Sacred Text Exploration**
  - Read all 18 chapters and 700 verses with smooth sequential navigation and bounded verse controls.
  - Thematic chapter categorization (*Karma, Knowledge, Devotion, Meditation, Dharma, Self*).
- **🌐 Real-Time Multilingual Script Switcher**
  - Instant client-side transliteration across 6 scripts: **Devanagari (संस्कृतम्)**, **IAST (Romanized English)**, **Kannada (ಕನ್ನಡ)**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**, and **Malayalam (മലയാളം)**.
  - Persistent script preference synchronized via `localStorage` and React 19 external store.
  - Optional side-by-side comparison with original Sanskrit Devanagari.
- **🔊 Script-Aligned Audio Recitation (TTS)**
  - Web Speech API recitation dynamically matched to the active script voice (`sa-IN`, `kn-IN`, `te-IN`, `ta-IN`, `ml-IN`).
  - Interactive play/stop states with audio indicator pill.
- **🎓 Learn Gita (`/learn`)**
  - **7-Day Foundations (*सप्तदिवसीय यात्रा*)**: Step-by-step journey from Arjuna’s dilemma to freedom and surrender.
  - **The 4 Paths of Yoga (*चतुर्योगमार्गः*)**: In-depth tracks on Karma Yoga, Jnana Yoga, Bhakti Yoga, and Dhyana Yoga.
  - **Life Dilemmas (*जीवनमार्गदर्शनम्*)**: Mastering anger, discovering personal calling (*Svadharma*), and the enlightened mind (*Sthitaprajna*).
  - Interactive lesson reader with key verses, core takeaways, practical daily sadhana, and completion tracking.
- **✨ Ask Gita with Grounded Gemini AI (`/ask`)**
  - Ask life questions regarding fear, purpose, failure, relationships, and peace.
  - **Strict Scriptural Grounding**: Responses are anchored exclusively in the 700 verses of the Gita, citing specific chapters, shlokas, and daily sadhana practices.
  - **Zero Key Leakage**: Gemini API calls and keys remain strictly secured on the Python backend server.
  - **Offline Thematic Knowledge Base**: 12 curated life themes available instantly even without an AI key.
- **☀️ Dynamic Verse of the Day**
  - Calendar-based daily rotation of celebrated Gita verses with translation, theme context, and audio chanting.
- **🌗 Contemplative Dark / Light Theme**
  - Custom charcoal-umber sacred dark palette with zero-flicker anti-FOUC script.

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript 5
- **Icons & Audio**: Web Speech API (`SpeechSynthesisUtterance`)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Server**: [Uvicorn](https://www.uvicorn.org/)
- **Language**: Python 3.10+
- **AI Integration**: Google Gemini API (`gemini-3.5-flash`, `gemini-3.7-flash`, `gemini-3.1-flash-lite`)
- **Transliteration Engine**: `indic-transliteration`

---

## Project Structure

```text
bhagavathgita/
├── backend/
│   ├── app/
│   │   ├── exceptions/          # Custom exceptions & HTTP handlers
│   │   ├── routes/
│   │   │   ├── gita.py          # Chapter & verse REST endpoints
│   │   │   ├── ask.py           # Gemini AI ask endpoint
│   │   │   └── health.py        # System health checks
│   │   ├── services/
│   │   │   ├── bhagavath_gita.py # Data loader & script resolver
│   │   │   └── gemini.py        # Grounded Gemini AI client & fallback
│   │   ├── utils/
│   │   │   ├── env.py           # Server .env loader
│   │   │   ├── fetch_json.py    # Path-independent dataset loader
│   │   │   └── language.py      # Language normalization & mapping
│   │   └── main.py              # FastAPI app with CORS & middleware
│   ├── data/
│   │   ├── source/              # Original Sanskrit, commentaries & translations
│   │   └── transliterate/       # Multi-script chapter datasets (JSON)
│   ├── .env.example             # Backend environment template
│   ├── requirements.txt         # Python dependencies
│   └── run.py                   # Uvicorn launcher
├── frontend/
│   ├── app/
│   │   ├── ask/                 # "Ask Gita" Q&A and Gemini AI interface
│   │   ├── component/           # Reusable UI & reader components
│   │   │   ├── ChapterVersesList.tsx
│   │   │   ├── VerseReader.tsx
│   │   │   ├── ScriptSelector.tsx
│   │   │   ├── SpeechButton.tsx
│   │   │   ├── LessonModal.tsx
│   │   │   ├── VerseofDay.tsx
│   │   │   └── Navbar.tsx
│   │   ├── explore/             # 18 chapters & verse reader pages
│   │   │   └── chapter/[chapter]/verse/[verse]/page.tsx
│   │   ├── learn/               # Guided pathways & learning curriculum
│   │   ├── utils/               # Types, script definitions & TTS helpers
│   │   ├── globals.css          # Theme variables & dark mode overrides
│   │   └── layout.tsx           # Root layout with theme anti-FOUC script
│   ├── .env.example             # Frontend environment template
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- **Python**: 3.10 or higher
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

---

### 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS / Linux:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Set up Gemini AI key for /ask
# Copy .env.example to .env and paste your key from https://aistudio.google.com/app/apikey
cp .env.example .env

# Start the backend server
python run.py
```

The backend server runs on:
- API: `http://localhost:8000`
- Interactive Swagger Docs: `http://localhost:8000/docs`

---

### 2. Frontend Setup

```bash
cd frontend

# Install npm packages
npm install

# Run the development server
npm run dev
```

The web application runs on:
- Web App: `http://localhost:3000`

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API key for grounded AI guidance on `/ask` | *(Optional, free key at Google AI Studio)* |

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_GITA_API_URL` | Base URL pointing to the FastAPI backend | `http://localhost:8000` |

---

## API Documentation

All routes are versioned under the `/api/v1` prefix.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health status |
| `GET` | `/api/v1/gita/chapters` | List all 18 chapters with summary metadata |
| `GET` | `/api/v1/gita/chapters/{chapter}` | Fetch chapter details and localized titles |
| `GET` | `/api/v1/gita/chapters/{chapter}/verses` | Fetch all verses of a chapter in all scripts |
| `GET` | `/api/v1/gita/chapters/{chapter}/verses/{verse}` | Fetch specific verse with IAST, Devanagari & regional scripts |
| `POST` | `/api/v1/gita/ask` | Ask a life question; returns Gemini guidance grounded in Gita shlokas |
| `GET` | `/api/v1/gita/ask/status` | Check if Gemini AI is configured on the server |

### Example API Requests

#### Fetch Verse 47 of Chapter 2
```bash
curl http://localhost:8000/api/v1/gita/chapters/2/verses/47
```

#### Ask a Life Question to Grounded AI
```bash
curl -X POST http://localhost:8000/api/v1/gita/ask \
  -H "Content-Type: application/json" \
  -d '{"query": "I feel anxious about future failure. How should I view this?"}'
```

---

## Supported Scripts

| Script | Native Name | Code | TTS Voice |
| :--- | :--- | :--- | :--- |
| **Devanagari** | संस्कृतम् | `sa` | `sa-IN` / `hi-IN` |
| **IAST** | Romanized English | `iast` | `sa-IN` |
| **Kannada** | ಕನ್ನಡ | `kn` | `kn-IN` |
| **Telugu** | తెలుగు | `te` | `te-IN` |
| **Tamil** | தமிழ் | `ta` | `ta-IN` |
| **Malayalam** | മലയാളം | `ml` | `ml-IN` |

---

## Verification & Quality

- **Linting**: Verified with ESLint (0 errors, 0 warnings across all components).
- **Type Safety**: Strictly typed TypeScript with React 19 and Next.js 16 App Router.
- **Production Build**: Verified with `next build` (optimized static routes + dynamic SSR endpoints).
- **Backend Tests**: Automated verification of chapter bounds, verse lookup, language normalization, and Gemini fallback.

---

## License & Purpose

This project is created to make the timeless wisdom of the **Bhagavad Gita** accessible to modern seekers, combining reverence for sacred scripture with modern software engineering.

Built with devotion, mindfulness, and care. ॐ तत्सत्
