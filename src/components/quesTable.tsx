"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";

type Question = {
  id: number;
  name: string;
  difficulty: string;
};

const QuesTable = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        setError("Failed to load questions. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-300" size={48} />
      </div>
    );
  }

  return (
    <div className="w-[100%] h-[100%] p-5 flex bg-[#0f0f0f]">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table className="min-w-full border-gray-700">
          <TableHeader>
            <TableRow className="hover:bg-zinc-900">
              <TableHead className="text-gray-400 text-lg font-medium">
                Question
              </TableHead>
              <TableHead className="text-center text-gray-400 text-lg font-medium">
                Difficulty
              </TableHead>
              <TableHead className="text-center text-gray-400 text-lg font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow
                key={question.id}
                className="border-y-2 border-zinc-900"
              >
                <TableCell className="font-medium text-lg text-gray-300">
                  {question.name}
                </TableCell>
                <TableCell
                  className={`text-center font-semibold ${
                    question.difficulty === "Easy"
                      ? "text-green-500 font-medium text-lg"
                      : question.difficulty === "Medium"
                      ? "text-yellow-500 font-medium text-lg"
                      : question.difficulty === "Hard"
                      ? "text-red-500 font-medium text-lg"
                      : ""
                  }`}
                >
                  {question.difficulty}
                </TableCell>
                <TableCell className="text-center">
                  <button className="p-2 rounded-lg hover:bg-black transition-all">
                    <Link
                      className="flex items-center gap-3 text-gray-300"
                      href={`/question/${question.id}`}
                    >
                      <ArrowUpRight />
                    </Link>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default QuesTable;
