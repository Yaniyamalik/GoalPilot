import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // ✅ use PRO or stable model
    });

  const prompt = `
You are an AI PRODUCTIVITY & EXECUTION PLANNER BOT.

When the user asks to generate a plan, follow the exact format below and output the structured plan.
If the user does NOT ask to generate a plan, act like an AI Scheduler — ask them what goal or task they want help planning.

Create a clear execution plan for this goal:
"${message}"

OUTPUT RULES:
- NO bold formatting
- NO paragraphs, NO motivational text at the end
- Use only bullet points
- Include daily breaks (example: Break: 15 mins / Take walks / Water break)
- Stay short, direct, and actionable
- Give spaces and line breaks after each phase title

FORMAT EXACTLY LIKE THIS:

Goal: <goal>

PHASE 1  
- Task:  
- Deadline:  
- Break:  

PHASE 2  
- Task:  
- Deadline:  
- Break:  

PHASE 3  
- Task:  
- Deadline:  
- Break:  

At the end, add:  
"Review Day Tasks:"  
- What to review  
- What to reflect on  

DO NOT add anything else.
`;


    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "AI request failed", details: error },
      { status: 500 }
    );
  }
}
