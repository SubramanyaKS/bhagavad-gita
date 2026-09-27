class ChapterNotFoundError(Exception):
    def __init__(self, chapter_id: int):
        self.chapter_id = chapter_id
        super().__init__(f"Chapter {chapter_id} not found")


class VerseNotFoundError(Exception):
    def __init__(self, chapter_id: int, verse_id: int):
        self.chapter_id = chapter_id
        self.verse_id = verse_id
        super().__init__(
            f"Verse {verse_id} not found in chapter {chapter_id}"
        )


class LanguageNotSupportedError(Exception):
    def __init__(self, language: str):
        self.language = language
        super().__init__(f"Language '{language}' is not supported")