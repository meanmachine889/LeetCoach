import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      select: {
        id: true,
        name: true,
        difficulty: true,
      },
    })
    return new Response(JSON.stringify(questions), { status: 200 })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch questions' }), { status: 500 })
  }
}
