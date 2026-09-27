from fastapi import Request
from fastapi.responses import JSONResponse

from .exceptions import (
    ChapterNotFoundError,
    VerseNotFoundError,
    LanguageNotSupportedError,
)


async def chapter_not_found_handler(
    request: Request,
    exc: ChapterNotFoundError
):
    return JSONResponse(
        status_code=404,
        content={
            "error": "CHAPTER_NOT_FOUND",
            "message": str(exc)
        }
    )


async def verse_not_found_handler(
    request: Request,
    exc: VerseNotFoundError
):
    return JSONResponse(
        status_code=404,
        content={
            "error": "VERSE_NOT_FOUND",
            "message": str(exc)
        }
    )


async def language_not_supported_handler(
    request: Request,
    exc: LanguageNotSupportedError
):
    return JSONResponse(
        status_code=400,
        content={
            "error": "LANGUAGE_NOT_SUPPORTED",
            "message": str(exc)
        }
    )