from fastapi import APIRouter, HTTPException
from app.services.bhagavath_gita import get_verses,get_all_verses, get_all_chapters_title, get_chapter
import json
router= APIRouter(
    prefix="/api/v1",
    tags=["gita"]
   
)
@router.get("/gita/chapters")
async def get_chapters():
    return await get_all_chapters_title()


@router.get("/gita/chapters/{chapter}")
async def get_bg_chapter(chapter:int,language:str='sanskrit'):
    return await get_chapter(chapter=chapter,language=language)
    

@router.get("/gita/chapters/{chapter}/verses")
async def get_bg_all_verse(chapter:int):
    return await get_all_verses(chapter=chapter)

@router.get("/gita/chapters/{chapter}/verses/{verse}")
async def get_bg_verse(chapter: int, verse: int,language:str='sanskrit'):
    return await get_verses(chapter=chapter,verse=verse,language=language)
