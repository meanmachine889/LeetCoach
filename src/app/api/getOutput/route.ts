import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { qid } = await req.json();

    if (!qid) {
      return new Response(
        JSON.stringify({ error: "Question ID is required" }),
        { status: 400 }
      );
    }

    // Find output by questionId, not id
    const output = await prisma.output.findMany({
      where: { questionId: parseInt(qid) }, // assuming questionId is stored in Output
    });

    if (!output) {
      return new Response(JSON.stringify({ error: "Output not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(output), { status: 200 });
  } catch (error) {
    console.error("Error fetching output:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching the output" }),
      { status: 500 }
    );
  }
}
