import React from "react";

type SubmissionCounts = {
  easy: number;
  medium: number;
  hard: number;
  total: number;
};

type QuesStatProps = {
  submissionCounts: SubmissionCounts;
};

const QuesStat = ({ submissionCounts }: QuesStatProps) => {
  const { easy, medium, hard, total } = submissionCounts;

  return (
    <div className="flex items-center p-2 w-[93%] justify-center bg-zinc-900 rounded-lg">
      <div className="flex w-[100%] h-[100%] items-center gap-[3rem] px-9 py-4 justify-center">
        <div className="bg-green-900/80 border-2 shadow-xl flex-1 h-[100%] border-green-500 rounded-full flex p-9 flex-col items-center justify-center gap-5">
          <p className="text-5xl text-green-500">{easy}</p>
          <p className="text-xl text-gray-300">Easy</p>
        </div>
        <div className="bg-yellow-900/80 border-2 shadow-xl flex-1 h-[100%] border-yellow-500 rounded-full flex p-9 flex-col items-center justify-center gap-5">
          <p className="text-5xl text-yellow-500">{medium}</p>
          <p className="text-xl text-gray-300">Medium</p>
        </div>
        <div className="bg-red-900/80 border-2 shadow-xl flex-1 h-[100%] border-red-500 rounded-full flex p-9 flex-col items-center justify-center gap-5">
          <p className="text-5xl text-red-500">{hard}</p>
          <p className="text-xl text-gray-300">Hard</p>
        </div>
        <div className="bg-blue-900/80 border-2 shadow-xl flex-1 h-[100%] border-blue-500 rounded-full flex p-9 flex-col items-center justify-center gap-5">
          <p className="text-5xl text-blue-500">{total}</p>
          <p className="text-xl text-gray-300">Total</p>
        </div>
      </div>
    </div>
  );
};

export default QuesStat;
