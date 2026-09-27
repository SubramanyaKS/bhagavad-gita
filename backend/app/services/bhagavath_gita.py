import json
from fastapi import HTTPException
from app.utils.language import language_map
from app.exceptions.exceptions import ChapterNotFoundError
from app.utils.fetch_json import get_chapter_json

async def get_all_chapters_title():
    try:
        data = get_chapter_json()       
        return data
    
    except FileNotFoundError:
        raise HTTPException(status_code=404,detail=f"Chapters not found")

async def get_chapter(chapter:int,language:str):
    try:
        chapter_data=get_chapter_json()
        chapter_data= chapter_data[chapter-1]
        with open(f'data/transliterate/bg_chapter_{chapter}.json','r',encoding='utf-8') as file:
            data = json.load(file)
        result=[]

        for item in data:
            sloka =item["sanskrit"]["devanagari"]
            if language in language_map:
                 sloka= item["scripts"][language_map[language]]
            res= {
        "id": item["id"],
        "chapter": item["chapter"],
        "sloka": sloka,
        "verse": item["verse"]
    }
            result.append(res)
             
        title = chapter_data["name"]["sanskrit"]
        if language in language_map:
                title= chapter_data["name"][language_map[language]]
        final_data = {"chapter":chapter_data["chapter"],"name":title,"verse_count":chapter_data["verse_count"],"verses":result}

        return {"success":True,"data":final_data}
    except FileNotFoundError:
        raise ChapterNotFoundError(chapter)

async def get_all_verses(chapter:int):
    try:
        chapter_data = get_chapter_json()
        # chapter_data= chapter_data[chapter-1] 
        with open(f'data/transliterate/bg_chapter_{chapter}.json','r',encoding='utf-8') as file:
            data = json.load(file)
         
        return {"success":True,"data":data}
         
    except FileNotFoundError:
        raise ChapterNotFoundError(chapter)
          
          

async def get_verses(chapter:int,verse:int,language:str):
    try:
        chapter_data = get_chapter_json()
        chapter_data= chapter_data[chapter-1] 
        with open(f'data/transliterate/bg_chapter_{chapter}.json','r',encoding='utf-8') as file:
            data = json.load(file)

        for item in data:
            if language in language_map:
                 text = item["scripts"][language_map[language]]
            else:
                text = item["sanskrit"]["devanagari"]
            if item["verse"] == verse:
                    res= {
                "id": item["id"],
                "chapter": item["chapter"],
                "sloka": item["sanskrit"]["devanagari"],
                "verse": item["verse"],
                "scripts":{
                     "kn":item["scripts"]["kn"],
                     "te":item["scripts"]["te"],
                     "ml":item["scripts"]["ml"],
                     "ta":item["scripts"]["ta"]
                }
                }
        name={
             "sa":chapter_data["name"]["sanskrit"],
             "kn":chapter_data["name"]["kn"],
             "te":chapter_data["name"]["te"],
             "ml":chapter_data["name"]["ml"],
             "ta":chapter_data["name"]["ta"]
             }
         
        final_data = {"chapter":chapter_data["chapter"],"name":name,"verses":res}
        
        return {"success":True,"data":final_data}

    except FileNotFoundError:
            raise ChapterNotFoundError(chapter)
