import json
def get_chapter_json():
    with open(f'data/transliterate/chapters.json','r',encoding='utf-8') as file:
                chapter_data = json.load(file)
    return chapter_data
                 