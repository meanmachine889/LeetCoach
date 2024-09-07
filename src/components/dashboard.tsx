"use client";

import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import { Check, Code, Code2, File, Lightbulb, Sparkle } from "lucide-react";
import CodeEditor from "./codeEditor";
import { question } from "@/types/type";
import { TestCase } from "@prisma/client";

const Dashboard = ({
  onRunCode,
  output,
  wrong,
  questionData,
}: {
  onRunCode: (code: string) => void;
  output: string;
  wrong: boolean;
  questionData: question;
}) => {
  const [code, setCode] = useState(questionData.codeFrame || "");
  const [analysis, setAnalysis] = useState<string>("");
  const [hints, setHints] = useState<string>("");
  const [solutionVisible, setSolutionVisible] = useState<boolean>(false);

  const handleSolution = () => {
    setAnalysis("");
    setHints("");
    setSolutionVisible(true);
  };

  const handleAnalyzeCode = async () => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          question: questionData.question,
          testCases: questionData.testcases,
          solution: questionData.solution,
        }),
      });

      const data = await response.json();
      setHints("");
      setAnalysis(data.analysis);
      setSolutionVisible(false);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setAnalysis("Failed to analyze code.");
    }
  };

  const handleGetHints = async () => {
    try {
      const response = await fetch("/api/hints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          testCases: questionData.testcases,
          solution: questionData.solution,
        }),
      });

      const data = await response.json();
      setAnalysis("");
      setSolutionVisible(false);
      setHints(data.hints);
    } catch (error) {
      console.error("Error getting hints:", error);
      setHints("Failed to get hints.");
    }
  };

  return (
    <div className="flex flex-1 font-semibold bg-black p-4 gap-4 w-full max-h-screen">
      {/* Left panel */}
      <div className="border border-zinc-900 w-1/2  flex flex-col rounded-lg shadow-xl">
        {/* Header */}
        <div className="w-full flex p-3 gap-4 bg-[#0f0f0f] h-16 rounded-t-lg border-b-2 border-gray-800">
          <div className="text-blue-500 flex items-center gap-2 p-2 text-sm rounded-lg">
            <File />
            Description
          </div>
          <div className="text-yellow-500 flex items-center gap-2 p-2 text-sm rounded-lg">
            <Code />
            Submissions
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 overflow-y-scroll bg-[#0f0f0f]">
          <h1 className="text-3xl text-gray-300">{questionData.name}</h1>
          <div className="text-sm text-gray-400">
            <div className="bg-green-600/20 text-green-400 p-2 font-medium rounded-lg inline-block">
              {questionData.difficulty}
            </div>
          </div>
          <p className="text-gray-400">{questionData.question}</p>
          
          {/* Test Cases */}
          <div className="space-y-4">
            {questionData.testcases.map((testcase: TestCase, index) => (
              <div
                key={index}
                className="p-4 bg-zinc-900 rounded-lg shadow-sm"
              >
                <h2 className="text-lg text-gray-300">Example {index + 1}</h2>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Input:</span> {testcase.input}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Output:</span> {testcase.output}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Code interaction panel */}
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-6">
            <div className="flex justify-around w-full mb-6">
              <button
                className="bg-zinc-800 hover:bg-zinc-600 border-2 border-zinc-800 text-gray-300 font-medium px-5 py-3 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
                onClick={handleAnalyzeCode}
              >
                Analysis <Sparkle className="h-5 w-5 text-yellow-400" />
              </button>
              <button
                className="bg-zinc-800 hover:bg-zinc-600 border-2 border-zinc-800 text-gray-300 font-medium px-5 py-3 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
                onClick={handleGetHints}
              >
                Hints <Lightbulb className="h-5 w-5 text-yellow-300" />
              </button>
              <button
                className="bg-zinc-800 hover:bg-zinc-600 border-2 border-zinc-800 text-gray-300 font-medium px-5 py-3 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105"
                onClick={handleSolution}
              >
                Solution <Code2 className="h-5 w-5 text-green-400" />
              </button>
            </div>

            <div className="w-full p-4 bg-[#0f0f0f] border border-zinc-700 rounded-lg overflow-hidden h-[80%]">
              <div className="text-gray-300 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                {analysis && (
                  <div>
                    <div className="border-b border-zinc-700 pb-2 mb-2">
                      <h2 className="text-lg font-semibold text-gray-300">Analysis:</h2>
                    </div>
                    <ReactMarkdown className="prose prose-zinc text-gray-400">
                      {analysis}
                    </ReactMarkdown>
                  </div>
                )}
                {hints && (
                  <div>
                    <div className="border-b border-zinc-700 pb-2 mb-2">
                      <h2 className="text-lg font-semibold text-gray-300">Hint:</h2>
                    </div>
                    <ReactMarkdown className="prose prose-zinc text-gray-400">
                      {hints}
                    </ReactMarkdown>
                  </div>
                )}
                {solutionVisible && (
                  <div>
                    <div className="border-b border-zinc-700 pb-2 mb-2">
                      <h2 className="text-lg font-semibold text-gray-300">Solution:</h2>
                    </div>
                    <ReactMarkdown className="prose prose-zinc text-gray-400">
                      {questionData.solution}
                    </ReactMarkdown>
                  </div>
                )}
                {!analysis && !hints && !solutionVisible && (
                  <p className="text-gray-500">Output will be displayed here...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="bg-[#0f0f0f] border border-gray-900 w-1/2 max-h-full flex flex-col rounded-lg shadow-xl overflow-y-scroll">
        <div className="w-full flex items-center justify-between p-3 bg-zinc-900 rounded-t-lg">
          <div className="bg-black border-2 border-gray-900 px-4 py-2 text-sm text-gray-400 rounded-lg">
            <p>C++</p>
          </div>
          <div className="flex gap-4">
            <button
              className="border-green-700 border-2 text-green-300 px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
              onClick={() => onRunCode(code)}
            >
              Run
            </button>
            <button
              className="bg-green-700 text-green-300 px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
              onClick={() => onRunCode(code)}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="p-3 flex flex-col gap-4 h-full">
          <CodeEditor code={code} setCode={setCode} />
          
          {/* Output */}
          <div className="bg-zinc-900 rounded-lg p-4 shadow-lg h-[20%]">
            <div className="flex justify-between items-center border-b-2 border-gray-600 pb-2">
              <h1 className="text-lg text-gray-400">Output:</h1>
              {output && (
                <span
                  className={`text-sm font-semibold ${
                    wrong ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {wrong ? "Error" : "Compiled successfully"}
                </span>
              )}
            </div>
            <ReactMarkdown className="prose pt-2 prose-zinc text-gray-400">
              {output ? output : "Run the code to see output"}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
