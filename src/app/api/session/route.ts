import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cookie from "cookie";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = crypto.randomUUID();

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiry
      },
    });

    const response = NextResponse.json({ token });
    response.cookies.set("sessionToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
