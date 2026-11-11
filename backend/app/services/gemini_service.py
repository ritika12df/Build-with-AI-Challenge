
import os
from dotenv import load_dotenv
from google import genai

# Load environment variables from backend/.env
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError(
        "GEMINI_API_KEY is missing. Please check your backend .env file."
    )

# Connect to Gemini
client = genai.Client(api_key=API_KEY)

MODEL_NAME = "gemini-3.5-flash-lite"


def generate_ai_response(prompt: str) -> str:
    """
    Send a prompt to Gemini and return its response.
    """

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response.")

    return response.text


def generate_test_scenarios(website_data: dict) -> str:
    """
    Generate website testing scenarios using Gemini AI.
    """

    prompt = f"""
    You are an experienced software testing assistant.

    Analyze the following website information:

    {website_data}

    Generate 5 practical test scenarios for this website.

    Include:
    1. Test scenario name
    2. What should be tested
    3. Expected result

    Focus on links, buttons, forms, navigation,
    and basic website functionality.

    Do not claim that any test has actually been executed.
    Only suggest test scenarios.
    """

    return generate_ai_response(prompt)

