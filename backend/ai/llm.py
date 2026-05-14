from google import genai
import dotenv
import os

dotenv.load_dotenv()
api_key = os.getenv("GENAI_API_KEY")
model = os.getenv("GENAI_MODEL")

client = genai.Client(api_key=api_key)

def askToLLM(prompt):
    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=genai.types.GenerateContentConfig(
            temperature=0.7
        )
    )
    return response.text
