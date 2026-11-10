from app.exceptions.exceptions import LanguageNotSupportedError

language_map = {
    "kannada": "kn",
    "kn": "kn",
    "telugu": "te",
    "te": "te",
    "malayalam": "ml",
    "ml": "ml",
    "tamil": "ta",
    "ta": "ta",
    "hindi": "hi",
    "hi": "hi",
    "sanskrit": "sa",
    "sa": "sa",
    "devanagari": "sa",
}

def normalize_language(language: str | None) -> str:
    if not language:
        return "sa"
    cleaned = language.strip().lower()
    if cleaned not in language_map:
        raise LanguageNotSupportedError(language)
    return language_map[cleaned]
