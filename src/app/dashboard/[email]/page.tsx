"use client";

import MonthSquares from "@/components/calendar";
import QuesStat from "@/components/quesStats";
import QuesTable from "@/components/quesTable";
import SubmissionsTable from "@/components/submissions";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import TargetSetter from "@/components/target";
import Avatar from "boring-avatars";

interface Props {
  params: {
    email: string;
  };
}

const Page: React.FC<Props> = ({ params }: Props) => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`/api/submissions?username=${params.email}`);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        setError("Failed to load submissions. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [params.email]);

  // Count submissions by difficulty
  const submissionCounts = submissions.reduce(
    (
      acc: { easy: number; medium: number; hard: number; total: number },
      submission
    ) => {
      if (
        submission.question.difficulty === "Easy" &&
        submission.result == "Success"
      ) {
        acc.easy += 1;
        acc.total += 1;
      } else if (
        submission.question.difficulty === "Medium" &&
        submission.result == "Success"
      ) {
        acc.medium += 1;
        acc.total += 1;
      } else if (
        submission.question.difficulty === "Hard" &&
        submission.result == "Success"
      ) {
        acc.hard += 1;
        acc.total += 1;
      }
      return acc;
    },
    { easy: 0, medium: 0, hard: 0, total: 0 }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader2 className="animate-spin text-gray-300" size={48} />
      </div>
    );
  }

  return (
    <div className="text-gray-200 flex h-[100vh] w-screen max-w-screen bg-black justify-center items-center p-3">
      <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
        <div className="flex flex-col gap-3 row-span-3 items-center justify-center bg-black rounded-lg shadow-lg">
          <div className="bg-black rounded-xl flex flex-col gap-3">
            <div className="flex gap-3  p-2 rounded-xl w-full items-center">
              <Avatar
                key={params.email}
                name={params.email}
                size={45}
                variant="beam"
                className=""
              />
              <div className="flex flex-col text-2xl text-gray-500">{params.email}&apos;s Dashboard</div>
            </div>
            <MonthSquares submissions={submissions} />
          </div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <SubmissionsTable submissions={submissions} />
          )}
        </div>

        <div className="flex items-center justify-center col-span-2 bg-zinc-900 rounded-lg shadow-lg">
          <QuesStat submissionCounts={submissionCounts} />
        </div>

        {/* <div className="flex items-center p-1 justify-center bg-[#0f0f0f] rounded-lg shadow-lg">
          <MonthSquares submissions={submissions} />
        </div> */}

        <div className="flex items-center justify-center bg-[#0f0f0f] p-2 custom-scrollbar rounded-lg shadow-lg px-2 col-span-2 row-span-2">
          <QuesTable />
        </div>

        {/* <div className="flex items-center p-1 justify-center bg-[#0f0f0f] rounded-lg shadow-lg">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <SubmissionsTable submissions={submissions} />
          )}
        </div> */}
        <div className="flex items-center justify-center bg-zinc-900 rounded-lg shadow-lg"></div>
      </div>
    </div>
  );
};

export default Page;
