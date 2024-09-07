"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react"; // Added ArrowUpRight for button icon

type Submission = {
  id: number;
  code: string;
  result: string;
  question: {
    name: string;
  };
  createdAt: string;
  questionId: number;
};

type SubmissionsTableProps = {
  submissions: Submission[];
};

const SubmissionsTable = ({ submissions }: SubmissionsTableProps) => {
  // State for filtering submissions (default is showing all)
  const [filter, setFilter] = useState<'all' | 'success'>('all');

  // Sort submissions by createdAt in descending order (latest first)
  const sortedSubmissions = submissions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter submissions based on the selected filter
  const filteredSubmissions =
    filter === 'success'
      ? sortedSubmissions.filter(submission => submission.result === "Success")
      : sortedSubmissions;

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-3">
      {/* Filter Options */}
      <div className="flex justify-between items-center p-5 bg-zinc-900 rounded-lg shadow-md">
        <h2 className="text-gray-400 font-semibold text-xl">Submissions</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              filter === 'all'
                ? 'bg-blue-600 text-gray-300'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              filter === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Solved
          </button>
        </div>
      </div>

      {/* Submissions List */}
      <div className="w-full h-[100%] overflow-y-scroll scroll-hidden p-4 flex bg-[#0f0f0f] flex-col gap-4 rounded-lg">
        {filteredSubmissions.length === 0 ? (
          <p className="text-gray-300">No submissions found</p>
        ) : (
          filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 rounded-lg bg-zinc-900 shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
            >
              <div>
                <div className="text-gray-300 font-medium text-lg mb-2">
                  {submission.question.name}
                </div>
                <div className="text-gray-300 font-medium text-lg mb-2">
                  <span
                    className={`${
                      submission.result === "Success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {submission.result}
                  </span>
                </div>
                <div className="text-gray-400 mt-2">
                  {new Date(submission.createdAt).toLocaleString()}
                </div>
              </div>
              <a
                href={`http://localhost:3000/question/${submission.questionId}`}
                className="flex items-center self-end gap-2 text-gray-300 hover:text-white bg-gray-800 p-2 rounded-md transition-colors duration-300 hover:bg-gray-700"
              >
                <span>Visit</span>
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubmissionsTable;
