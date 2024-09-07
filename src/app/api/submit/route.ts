import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { code, questionId, userId, result } = await req.json();

    if(!code){
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }
    if(!questionId){
        return NextResponse.json({ error: 'No questionId provided' }, { status: 400 });
    }
    if(!userId){
        return NextResponse.json({ error: 'No userId provided' }, { status: 400 });
    }
    if(!result){
        return NextResponse.json({ error: 'No result provided' }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: {
        code,
        questionId: parseInt(questionId),
        userId: parseInt(userId),       
        result,
      },
    });

    return NextResponse.json({ success: true, submission }, { status: 200 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
