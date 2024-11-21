import {NextResponse} from "next/server";
import Gemini from "gemini-ai";

const geminiai = new Gemini(process.env.GEMINI_API_KEY);


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

            remember, the goal is to facilitate effective learning and retention of information through these flashcards.

            return in the following JSON format
                {   
                    "flashcards": [{
                        "front": str,
                        "back": str
                        }]
                }
            `

        try{
            const data = await req.text();
            const completion = await geminiai.createChat.completion.create(
                {
                    messages:[
                        {role: 'system', content: systemPrompt},
                        {role: "user", content: data},
                ],
               model: "Gemini 1.5 Flash",
               response_format:{type:'json_object'}
            })
    
            //parse the api request 
            const flashcards = JSON.parse(completion.choices[0].message.content)
    
            return NextResponse.json(flashcards.flashcard)  //make sure our resposne is always a json 
        }catch(error){
            return NextResponse.json({error: 'Failed to generate flashcards', deetails: error.message}, {satatus: 500});
        }
       
    }

    
// const gemini = new Gemini(GEMINI_API_KEY);
