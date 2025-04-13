import { QUESTIONS_PROMPT } from "@/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

  const { jobPosition, jobDescription, duration, type } = await req.json()

  const FINAL_PROMPT = QUESTIONS_PROMPT
    .replace('{{jobTitle}}', jobPosition)
    .replace('{{jobDescription}}', jobDescription)
    .replace('{{duration}}', duration)
    .replace('{{type}}', type) +
    "\n\nIMPORTANT: Return a valid JSON object that can be parsed with JSON.parse(). Ensure all property names are in double quotes and there are no trailing commas.";

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    })

    console.log("openai part completed");
    
    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
      messages: [
        { role: "user", content: FINAL_PROMPT }
      ],
      response_format:'json_object'
    })

    console.log("API Response", completion);

    return NextResponse.json(completion.choices[0].message)

  } catch (error) {
    console.log("API Error:", error.message || error);
    return NextResponse.json(error)
  }

}