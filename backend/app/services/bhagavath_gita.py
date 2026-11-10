from fastapi import HTTPException
from app.exceptions.exceptions import ChapterNotFoundError, VerseNotFoundError
from app.utils.fetch_json import get_chapter_json, get_chapter_verses_json
from app.utils.language import normalize_language

async def get_all_chapters_title():
    try:
        return get_chapter_json()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chapters not found")

async def get_chapter(chapter: int, language: str = "sanskrit"):
    lang_code = normalize_language(language)

    try:
        chapter_list = get_chapter_json()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chapters not found")

    if chapter < 1 or chapter > len(chapter_list):
        raise ChapterNotFoundError(chapter)

    chapter_data = chapter_list[chapter - 1]

    try:
        data = get_chapter_verses_json(chapter)
    except FileNotFoundError:
        raise ChapterNotFoundError(chapter)

    result = []
    for item in data:
        sloka = item["sanskrit"]["devanagari"]
        if lang_code != "sa" and lang_code in item.get("scripts", {}) and item["scripts"][lang_code]:
            sloka = item["scripts"][lang_code]

        res = {
            "id": item["id"],
            "chapter": item["chapter"],
            "sloka": sloka,
            "verse": item["verse"],
        }
        result.append(res)

    title = chapter_data["name"].get("sanskrit")
    if lang_code != "sa" and lang_code in chapter_data.get("name", {}) and chapter_data["name"][lang_code]:
        title = chapter_data["name"][lang_code]
    elif not title:
        title = chapter_data["name"].get("english", f"Chapter {chapter}")

    final_data = {
        "chapter": chapter_data["chapter"],
        "name": title,
        "verse_count": chapter_data.get("verse_count", len(result)),
        "verses": result,
    }

    return {"success": True, "data": final_data}

async def get_all_verses(chapter: int):
    try:
        chapter_list = get_chapter_json()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chapters not found")

    if chapter < 1 or chapter > len(chapter_list):
        raise ChapterNotFoundError(chapter)

    try:
        data = get_chapter_verses_json(chapter)
    except FileNotFoundError:
        raise ChapterNotFoundError(chapter)

    return {"success": True, "data": data}

async def get_verses(chapter: int, verse: int, language: str = "sanskrit"):
    lang_code = normalize_language(language)

    try:
        chapter_list = get_chapter_json()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Chapters not found")

    if chapter < 1 or chapter > len(chapter_list):
        raise ChapterNotFoundError(chapter)

    chapter_data = chapter_list[chapter - 1]

    try:
        data = get_chapter_verses_json(chapter)
    except FileNotFoundError:
        raise ChapterNotFoundError(chapter)

    matched = None
    for item in data:
        if item["verse"] == verse:
            matched = item
            break

    if matched is None:
        raise VerseNotFoundError(chapter, verse)

    if lang_code != "sa" and lang_code in matched.get("scripts", {}) and matched["scripts"][lang_code]:
        sloka_text = matched["scripts"][lang_code]
    else:
        sloka_text = matched["sanskrit"]["devanagari"]

    res = {
        "id": matched["id"],
        "chapter": matched["chapter"],
        "verse": matched["verse"],
        "sloka": sloka_text,
        "sanskrit": matched.get("sanskrit", {}),
        "transliteration": matched.get("transliteration", {}),
        "scripts": {
            "kn": matched.get("scripts", {}).get("kn"),
            "te": matched.get("scripts", {}).get("te"),
            "ml": matched.get("scripts", {}).get("ml"),
            "ta": matched.get("scripts", {}).get("ta"),
            "hi": matched.get("scripts", {}).get("hi"),
        },
    }

    name = {
        "sa": chapter_data["name"].get("sanskrit"),
        "iast": chapter_data["name"].get("iast"),
        "en": chapter_data["name"].get("english"),
        "kn": chapter_data["name"].get("kn"),
        "te": chapter_data["name"].get("te"),
        "ml": chapter_data["name"].get("ml"),
        "ta": chapter_data["name"].get("ta"),
        "hi": chapter_data["name"].get("hi"),
    }

    final_data = {
        "chapter": chapter_data["chapter"],
        "verse_count": chapter_data.get("verse_count", len(data)),
        "name": name,
        "verses": res,
    }

    return {"success": True, "data": final_data}
