-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "codeFrame" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testcase" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "testcase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testcase" ADD CONSTRAINT "testcase_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
