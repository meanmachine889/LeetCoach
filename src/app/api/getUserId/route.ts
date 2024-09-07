import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: 'No session token' }, { status: 401 });
  }

  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
  }

  return NextResponse.json({ userId : session.userId }, { status: 200 });
}
