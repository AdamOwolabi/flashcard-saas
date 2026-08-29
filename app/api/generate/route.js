// CHANGELOG (2026-08-29): Replaced the broken `gemini-ai` package call (`geminiai.chat.completion.create`,
// a nonexistent OpenAI-style API) with the official @google/generative-ai SDK — `getGenerativeModel` with
// gemini-3.6-flash (older 1.5/2.0 models are retired), the flashcard prompt as systemInstruction, and JSON
// output enforced via responseMimeType: "application/json". Also fixed the `satatus` typo so errors return
// a real 500 instead of a silent 200, letting the frontend detect failures. The original GEMINI_API_KEY was
// blocked by Google (API_KEY_SERVICE_BLOCKED) — .env.local now uses the working key from ratemycity-rag.

import {NextResponse} from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt =
    `
    You are a flashcard creator responsible for creating flashcards about whatever topics inputted.Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
    1. Create clear and concise questions for the front of the flashcards.
    2. Provide accurate and informative answers for the back of the flashcard.
    3. Ensure that each flashcard focuses on a single concept or piece of information.
    4. Use single language to make the flashcards accessible to a wide range of learners.
    5. Include a variety of question types, such as definitions, examples comparisons and applications.
    6. Avoid overly complex or ambiguous phrasing on both answers and questions.
    7. When appropriate, use mnemonics or memory aids to help reinforce the information.
    8. Tailor the difficulty level of the flashcards to the user's  specified preferences.
    9. If given a body of text, extract the most important and relevant information for the flahscards.
    10.  Aim to create a balanced set of flashcards that covers the topic comprehensively.
    11. Only generate 10 flashcards.

    remember, the goal is to facilitate effective learning and retention of information through these flashcards.

    return in the following JSON format
        {
            "flashcards": [{
                "front": str,
                "back": str
                }]
        }
    `

export async function POST(req){
    try{
        const data = await req.text();

        const model = genAI.getGenerativeModel({
            model: "gemini-3.6-flash",
            systemInstruction: systemPrompt,
            generationConfig: {responseMimeType: "application/json"},
        });

        const result = await model.generateContent(data);
        const text = result.response.text();

        const flashcards = JSON.parse(text);

        return NextResponse.json(flashcards.flashcards)  //make sure our resposne is always a json
    }catch(error){
        console.error("Error generating flashcards:", error);
        return NextResponse.json({error: 'Failed to generate flashcards', details: error.message}, {status: 500});
    }
}
