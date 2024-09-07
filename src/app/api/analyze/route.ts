import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.KEY ?? 'YOUR_DEFAULT_API_KEY');

// Get the model you're working with (Gemini 1.5 flash)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const { code, quesiton, testCases, solution } = await req.json();

    const prompt = `I'm providing you my code "Code", "Question", "Test cases" and solution 'Solution', what i want is if my code is incorrect or incomplete guide me what to do ahead, give me time and space complexity only if my code is correct & complete, dont give me implementation of code as it would not be benefitial for me to just copy paste code, and also give bullet points for better readability:
    
Code:
${code}

Question:
${quesiton}

Test Cases:
${JSON.stringify(testCases)}

Expected Solution:
${solution}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ analysis: text }, { status: 200 });
  } catch (error) {
    console.error("Error generating analysis:", error);
    return NextResponse.json(
      { error: "Error generating analysis" },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: "edge",
};
