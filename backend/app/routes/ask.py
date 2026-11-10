from fastapi import APIRouter, Header
from pydantic import BaseModel, Field
from typing import Optional
from app.services.gemini import ask_gemini_gita, is_gemini_configured

router = APIRouter(
    prefix="/api/v1/gita",
    tags=["ask-ai"],
)


class AskQuestionRequest(BaseModel):
    query: str = Field(..., description="The seeker's life question or dilemma")


@router.get("/ask/status")
async def get_ask_ai_status():
    """
    Checks if Gemini AI is configured on the backend server.
    """
    return {
        "configured": is_gemini_configured()
    }


@router.post("/ask")
async def ask_gita_ai(
    request: AskQuestionRequest,
    x_gemini_api_key: Optional[str] = Header(None, alias="x-gemini-api-key")
):
    """
    Receives a life question and queries Gemini AI using the grounded Bhagavad Gita prompt.
    The API key is securely retrieved from the server environment, or optionally overridden via header.
    """
    result = await ask_gemini_gita(
        query=request.query,
        client_override_key=x_gemini_api_key or ""
    )
    return result
