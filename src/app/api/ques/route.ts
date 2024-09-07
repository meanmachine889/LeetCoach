import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { qid } = await request.json();

    if (!qid) {
      return new Response(JSON.stringify({ error: "Question ID is required" }), { status: 400 });
    }

    const question = await prisma.question.findUnique({
      where: { id: parseInt(qid) },
      include: { testcases: true },
    });

    if (!question) {
      return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(question), { status: 200 });
  } catch (error) {
    console.error("Error fetching question:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch question" }), { status: 500 });
  }
}
