# Bhagavath Gita

A full-stack web application for exploring the Bhagavad Gita with chapter-wise verses, multilingual support, and a modern reading experience.

This project combines a FastAPI backend with a Next.js frontend to deliver a clean, accessible interface for reading and navigating sacred verses in a structured and user-friendly format.

## Overview

The application is designed to provide:

- Chapter-wise access to Bhagavad Gita content
- Verse lookup by chapter and verse number
- Multilingual rendering for select translated/script-based content
- A modern frontend experience for reading, exploring, and navigating the text
- A lightweight API layer for serving structured data to the client

## Architecture

The repository is organized into two main parts:

- `backend/` — FastAPI application and data serving logic
- `frontend/` — Next.js client for the web experience
- `data/` — source material and transliteration datasets used by the API

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- Uvicorn

### Data
- JSON-based chapter and transliteration datasets

## Project Structure

```text
bhagavathgita/
├── backend/
│   ├── app/
│   │   ├── exceptions/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── data/
│   ├── requirements.txt
│   ├── run.py
│   └── test.py
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
├── data/
│   ├── source/
│   └── transliterate/
├── README.md
└── ...
```

## Features

- Browse Bhagavad Gita chapters and verse collections
- Fetch a specific chapter or verse via API
- Serve content in available language/script variants
- Present a modern editorial-style UX on the frontend
- Expose REST endpoints for easy integration and extension

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Python 3.10+
- Node.js 18+
- npm

### 1) Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

The backend runs on:

- http://localhost:8000

FastAPI documentation is available at:

- http://localhost:8000/docs

### 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

- http://localhost:3000

## API Endpoints

The backend exposes the following REST routes under the `/api/v1` prefix:

- `GET /api/v1/gita/chapters` — list available chapters
- `GET /api/v1/gita/chapters/{chapter}` — get a specific chapter with verse data
- `GET /api/v1/gita/chapters/{chapter}/verses` — fetch all verses of a chapter
- `GET /api/v1/gita/chapters/{chapter}/verses/{verse}` — fetch a specific verse

Example:

```bash
curl http://localhost:8000/api/v1/gita/chapters/1
curl http://localhost:8000/api/v1/gita/chapters/1/verses/1
```

## Data Model

The project uses structured JSON content located under:

- `data/source/` for chapter source data
- `data/transliterate/` for transliterated and script-based verse content

This structure makes the project easy to extend with additional chapters, translations, or script variants.

## Development Notes

- The frontend is built with a component-driven Next.js app router structure.
- The backend is organized around routes, services, and utility modules for separation of concerns.
- The codebase is designed to be extendable for additional languages, search features, and reading enhancements.

## Contributing

Contributions are welcome. If you’d like to improve the application, you can:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a clear summary

## Project Purpose

This project exists to make the teachings of the Bhagavad Gita more accessible through a modern digital experience while preserving the spiritual and educational value of the text.

---

Built with care for readability, usability, and spiritual exploration.
