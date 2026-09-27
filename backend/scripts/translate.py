from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
import json

# Process chapters 17 and 18
for i in range(1, 19):

    # 1. Load the original JSON file
    with open(
        f'data/source/bhagavad_gita_chapter_{i}.json',
        'r',
        encoding='utf-8'
    ) as file:
        data = json.load(file)

    # 2. Extract chapter, verse, and transliterations
    extracted_verses = []

    for item in data.get("BhagavadGitaChapter", []):

        text = item.get("text", "")

        cleaned_item = {
            "id":f"bg-{item.get("chapter")}-{item.get("verse")}",
            "chapter": item.get("chapter"),
            "verse": item.get("verse"),
            "sanskrit": {
                "devanagari":text
            },
            "transliteration": {
    "iast": transliterate(
                                    text,
                                    sanscript.DEVANAGARI,
                                    sanscript.ISO_VEDIC
                ),
  },
            "scripts": {
                # Sanskrit → Kannada script
                "kn": transliterate(
                    text,
                    sanscript.DEVANAGARI,
                    sanscript.KANNADA
                ),

                # Sanskrit → Telugu script
                "te": transliterate(
                    text,
                    sanscript.DEVANAGARI,
                    sanscript.TELUGU
                ),
                 "ta": transliterate(
                                    text,
                                    sanscript.DEVANAGARI,
                                    sanscript.TAMIL
                                ),
                 "ml": transliterate(
                                    text,
                                    sanscript.DEVANAGARI,
                                    sanscript.MALAYALAM
                                ),

                # Tulu transliteration - add later
                "tcy": ""
            }
        }

        extracted_verses.append(cleaned_item)

    # 3. Save the newly structured data
    output_file = f'data/transliterate/bg_chapter_{i}.json'

    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(
            extracted_verses,
            outfile,
            ensure_ascii=False,
            indent=4
        )

    print(
        f"Successfully extracted and saved verses to '{output_file}'!"
    )