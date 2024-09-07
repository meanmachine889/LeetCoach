import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.KEY ?? 'YOUR_DEFAULT_API_KEY');

// Get the model you're working with (Gemini 1.5 flash)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const { code, testCases, solution } = await req.json();

    const prompt = `Provide some hints for improving the following code to match the expected solution. The code should pass all test cases:

Code:
${code}

Test Cases:
${JSON.stringify(testCases)}

Expected Solution:
${solution}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ hints: text }, { status: 200 });
  } catch (error) {
    console.error('Error generating hints:', error);
    return NextResponse.json({ error: 'Error generating hints' }, { status: 500 });
  }
}

export const config = {
  runtime: 'edge',
};
