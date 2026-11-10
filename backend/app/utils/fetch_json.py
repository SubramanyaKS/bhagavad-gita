from pathlib import Path
import json

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

def get_chapter_json():
    chapters_path = DATA_DIR / "transliterate" / "chapters.json"
    with open(chapters_path, "r", encoding="utf-8") as file:
        return json.load(file)

def get_chapter_verses_json(chapter: int):
    verses_path = DATA_DIR / "transliterate" / f"bg_chapter_{chapter}.json"
    if not verses_path.exists():
        raise FileNotFoundError(f"Verses file not found for chapter {chapter}")
    with open(verses_path, "r", encoding="utf-8") as file:
        return json.load(file)

                 