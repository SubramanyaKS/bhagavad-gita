from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

text = "धर्मक्षेत्रे कुरुक्षेत्रे"

result = transliterate(
    text,
    sanscript.DEVANAGARI,
    sanscript.ISO_VEDIC
)

print(result)