"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Icons for arrows

// Function to get the number of days in the current month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Function to get month name
const getMonthName = (monthIndex: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
};

type Submission = {
  id: number;
  code: string;
  result: string;
  question: {
    name: string;
  };
  createdAt: string;
};

type MonthSquaresProps = {
  submissions: Submission[];
};

const MonthSquares = ({ submissions }: MonthSquaresProps) => {
  const [days, setDays] = useState<number>(30); // Number of days in the current month
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Get submission days and count for the current month
  const submissionCountByDay = submissions.reduce((acc, submission) => {
    const submissionDate = new Date(submission.createdAt);
    if (
      submissionDate.getMonth() === currentMonth &&
      submissionDate.getFullYear() === currentYear
    ) {
      const day = submissionDate.getDate();
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] += 1;
    }
    return acc;
  }, {} as Record<number, number>);

  // Update the number of days when the month or year changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    setDays(daysInMonth);
  }, [currentMonth, currentYear]);

  // Function to go to the previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to go to the next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 bg-zinc-900 rounded-xl p-6 text-white">
      {/* Month navigation */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-xl text-gray-500 font-medium">
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        <div className="flex justify-center items-center">
          <div className="bg-[#0f0f0f] flex items-center justify-center p-2 rounded-lg">
            <ArrowLeft
              className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-all"
              onClick={handlePrevMonth}
            />
          </div>
          <div className="bg-[#0f0f0f] flex items-center justify-center p-2 rounded-lg ml-2">
            <ArrowRight
              className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-all"
              onClick={handleNextMonth}
            />
          </div>
        </div>
      </div>

      {/* Squares for each day */}
      <div className="flex flex-wrap gap-1 p-1 rounded-lg w-[100%] justify-start">
        {Array.from({ length: days }, (_, index) => {
          const dayNumber = index + 1;
          const submissionCount = submissionCountByDay[dayNumber] || 0;

          return (
            <div
              key={index}
              className={`w-8 h-8 rounded-sm transition-all ${
                submissionCount > 0 ? "bg-green-500 hover:bg-green-600" : "bg-zinc-700 hover:bg-gray-500"
              } `}
              title={`${
                submissionCount > 0
                  ? `${submissionCount} submission${
                      submissionCount > 1 ? "s" : ""
                    }`
                  : "No submissions"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MonthSquares;
