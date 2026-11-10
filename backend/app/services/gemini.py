import os
import requests
from app.utils.env import load_env

# Ensure env is loaded
load_env()

GITA_SYSTEM_PROMPT = """You are an enlightened spiritual counselor embodying the timeless wisdom of the Bhagavad Gita as spoken by Bhagavan Sri Krishna to Arjuna on the battlefield of Kurukshetra.

YOUR MISSION:
Provide compassionate, uplifting, practical, and deeply authentic spiritual guidance to seekers facing modern life dilemmas (anxiety, grief, burnout, anger, feeling lost, finding purpose, handling failure, ethical crossroads), STRICTLY GROUNDED in the philosophy and verses of the Bhagavad Gita.

GROUNDING & INTEGRITY RULES:
1. STRICT SCRIPTURAL GROUNDING:
   - Every answer MUST be rooted in authentic Bhagavad Gita teachings.
   - Reference core concepts accurately: Atman (the eternal consciousness/Self), Dharma (righteous duty/calling), Karma Yoga (selfless action without anxiety for fruits), Nishkama Karma, Sthitaprajna (the steady-minded sage), the three Gunas (Sattva, Rajas, Tamas), Bhakti (pure devotion/surrender), and Maya/Prakriti.
   - You MUST cite at least ONE specific chapter and verse from the Bhagavad Gita (e.g. Chapter 2, Verse 47; Chapter 6, Verse 26; Chapter 18, Verse 66) directly relevant to the seeker's question, including a Sanskrit quote or key phrase and its meaning.
   - Do NOT invent or fabricate verses. Only cite real Bhagavad Gita verses.

2. TONE & MANNER:
   - Speak with calm spiritual authority, profound compassion, and dignified clarity — just as Krishna spoke to Arjuna when his mind was clouded by sorrow.
   - Avoid generic corporate self-help platitudes ("hustle harder", "just think positive"). Offer real spiritual depth.
   - Address the seeker with warmth, dignity, and understanding.

3. STRUCTURE YOUR ANSWER CLEANLY IN MARKDOWN:
   - **The Core Perspective**: Reframe their dilemma through the eternal lens of the Gita (distinguishing between the temporary ego/body and the immortal Self).
   - **The Guiding Verse (श्लोकः)**: State the specific Chapter and Verse, quote the key Sanskrit words or lines, and provide its translation.
   - **Practical Sadhana (अभ्यासः)**: 2-3 concrete, actionable spiritual practices the seeker can apply in their daily life right now.
   - **Closing Blessing (आशीर्वादः)**: A concluding word of courage, reminder of the Divine presence within their heart, and peace."""


def get_gemini_api_key() -> str:
    """Returns the Gemini API key from backend environment, stripped of whitespace."""
    load_env()
    return os.getenv("GEMINI_API_KEY", "").strip()


def is_gemini_configured() -> bool:
    """Checks if the Gemini API key is configured on the backend."""
    return bool(get_gemini_api_key())


async def ask_gemini_gita(query: str, client_override_key: str = "") -> dict:
    """
    Calls Google Gemini API securely from the backend with the Gita grounding prompt.
    Tries gemini-3.5-flash with fallback to 3.7-flash and 3.1-flash-lite.
    """
    clean_query = (query or "").strip()
    if not clean_query:
        return {
            "success": False,
            "configured": True,
            "error": "MISSING_QUERY",
            "message": "Please provide a question for guidance.",
        }

    api_key = (client_override_key or "").strip() or get_gemini_api_key()

    if not api_key:
        return {
            "success": False,
            "configured": False,
            "error": "NO_API_KEY",
            "message": "Gemini API key is not configured on the backend server. Add GEMINI_API_KEY to backend/.env",
        }

    models = [
        "gemini-3.5-flash",
        "gemini-3.7-flash",
        "gemini-3.8-flash",
        "gemini-3.1-flash-lite",
        "gemini-flash-latest",
    ]
    last_error = ""

    payload = {
        "systemInstruction": {
            "parts": [{"text": GITA_SYSTEM_PROMPT}]
        },
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": f'The seeker asks with a sincere heart: "{clean_query}". Please provide guidance grounded in the Bhagavad Gita.'
                    }
                ],
            }
        ],
        "generationConfig": {
            "temperature": 0.35,
            "maxOutputTokens": 1200,
        },
    }

    for model in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

        try:
            response = requests.post(
                url,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=35,
            )

            if response.status_code == 200:
                data = response.json()
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts and "text" in parts[0]:
                        return {
                            "success": True,
                            "configured": True,
                            "answer": parts[0]["text"],
                            "model": model,
                        }

            # If model is 404 or overloaded (503/429), try next model
            err_data = response.json() if response.text else {}
            last_error = (
                err_data.get("error", {}).get("message")
                or f"Gemini API returned status {response.status_code}"
            )
            continue

        except requests.exceptions.Timeout:
            last_error = "Gemini API request timed out. Please try again."
            continue
        except requests.exceptions.RequestException as e:
            last_error = f"Network connection error: {str(e)}"
            continue

    return {
        "success": False,
        "configured": True,
        "error": "REQUEST_FAILED",
        "message": last_error or "Unable to reach Gemini API.",
    }
