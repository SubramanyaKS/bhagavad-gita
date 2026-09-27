import json

# 1. Load the original JSON file
for i in range(1,19):
    with open(f'bhagavad_gita_chapter_{i}.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

# 2. Extract chapter, verse, and text for each verse
    extracted_verses = []

    for item in data.get("BhagavadGitaChapter", []):
        cleaned_item = {
            "chapter": item.get("chapter"),
            "verse": item.get("verse"),
            "text": item.get("text"),
            "translated":{
                "kn":"",
                "tcy":""
            }
        }
        extracted_verses.append(cleaned_item)

# 3. Save the newly structured data into a new JSON file
    output_file = f'data/extracted_chapter_{i}.json'
    with open(output_file, 'w', encoding='utf-8') as outfile:
    # ensure_ascii=False is crucial so Sanskrit/Devanagari characters don't get escaped into Unicode codes (\u0927...)
        json.dump(extracted_verses, outfile, ensure_ascii=False, indent=4)

    print(f"Successfully extracted and saved verses to '{output_file}'!")