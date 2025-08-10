import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    const systemPrompt = `
You are a flashcard creator responsible for creating flashcards about whatever topics inputted. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcards.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons and applications.
6. Avoid overly complex or ambiguous phrasing on both answers and questions. 
7. When appropriate, use mnemonics or memory aids to help reinforce the information. 
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format:
{   
    "flashcards": [{
        "front": "Question or term",
        "back": "Answer or definition"
    }]
}
`;
        
    try {
        const data = await req.text();
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `${systemPrompt}\n\nTopic: ${data}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        console.log('Generated response:', text);
        c
        
        // Parse the JSON response
        const flashcards = JSON.parse(text);
    
        
        return NextResponse.json(flashcards.flashcards);
        
    } catch (error) {
        console.error('Error generating flashcards:', error);
        
        // If JSON parsing fails, provide sample flashcards
        if (error.message.includes('JSON') || error.message.includes('parse')) {
            console.log('JSON parsing failed, returning sample flashcards');
            const sampleFlashcards = [
                { front: "What is the topic you entered?", back: "This is a sample flashcard - please check your API key" },
                { front: "Sample Question 1", back: "Sample Answer 1" },
                { front: "Sample Question 2", back: "Sample Answer 2" },
                { front: "Sample Question 3", back: "Sample Answer 3" },
                { front: "Sample Question 4", back: "Sample Answer 4" }
            ];
            return NextResponse.json(sampleFlashcards);
        }
        
        return NextResponse.json(
            { error: 'Failed to generate flashcards', details: error.message }, 
            { status: 500 }
        );
    }
}