from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.exceptions.exceptions import ChapterNotFoundError, LanguageNotSupportedError, VerseNotFoundError
from app.exceptions.handlers import chapter_not_found_handler, language_not_supported_handler, verse_not_found_handler
from app.routes.gita import router as gitarouter
from app.routes.health import router as healthrouter
from app.routes.ask import router as askrouter

app = FastAPI(
    title="Bhagavath Gita API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    ChapterNotFoundError,
    chapter_not_found_handler
)

app.add_exception_handler(
    VerseNotFoundError,
    verse_not_found_handler
)

app.add_exception_handler(
    LanguageNotSupportedError,
    language_not_supported_handler
)

app.include_router(healthrouter)
app.include_router(gitarouter)
app.include_router(askrouter)
