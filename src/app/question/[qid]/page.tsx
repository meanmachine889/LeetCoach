"use client";

import Dashboard from "@/components/dashboard";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PrismaClient } from '@prisma/client';
import { Loader2 } from "lucide-react";

const prisma = new PrismaClient();

interface PageProps {
  params: {
      qid: string;
  };
}

export default function Home({ params }: PageProps) {
  const [output, setOutput] = useState("");
  const [err, setErr] = useState(false);
  const [questionData, setQuestionData] = useState<any>(null);
  const [userID, setUserID] = useState<number | null>(null); 

  // Fetch User ID
  async function fetchUserId() {
    try {
      const response = await fetch('/api/getUserId');
      if (!response.ok) throw new Error("Failed to fetch user ID");
      const data = await response.json();
      setUserID(data.userId); 
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  }

  // Fetch Question Data
  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!params.qid) return;

    const fetchQuestionData = async () => {
      try {
        const response = await fetch("/api/ques", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qid: params.qid }),
        });
        const data = await response.json();

        if (response.ok) {
          setQuestionData(data);
        } else {
          setErr(true);
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
        setErr(true);
      }
    };

    fetchQuestionData();
  }, [params.qid]);

  // Handle Run Code
  const handleRunCode = async (code: string) => {
    if (!userID) {
      console.error("User ID is not set");
      return;
    }
  
    try {
      // Step 1: Run the code and get the output
      const compileResponse = await fetch("/api/compile", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const compileResult = await compileResponse.json();
      
      let userOutput = compileResult.output;
      setOutput(userOutput);
  
      if (!compileResponse.ok) {
        console.error("Error during compilation");
        setErr(true);
        return;
      }
  
      // Step 2: Fetch the correct output for the current questionId from the Output table
      let correctOutput = "";
      try {
        const correctOutputResponse = await fetch("/api/getOutput", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qid: params.qid }), // Send questionId to get correct output
        });
        const outputData = await correctOutputResponse.json();

        // Check if the response is valid and the correct output is retrieved
        if (correctOutputResponse.ok && outputData.length > 0) {
          correctOutput = outputData[0].output.replace(/\\n/g, '\n'); // Replaces escaped newlines with actual newlines
        } else {
          console.error("Correct output not found for question");
          setErr(true);
          return;
        }
      } catch (fetchError) {
        console.error("Error fetching correct output:", fetchError);
        setErr(true);
        return;
      }
  
      // Step 3: Compare user output with correct output
      const comparisonResult = userOutput.trim() === correctOutput.trim() ? "Success" : "Unsuccessful";
  
      // Step 4: Submit the result
      try {
        const submitResponse = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            userId: userID,
            result: comparisonResult, // Send "Success" or "Unsuccessful"
            questionId: params.qid,
          }),
        });
  
        if (!submitResponse.ok) {
          console.error("Failed to submit the code");
          setErr(true);
        }
      } catch (submitError) {
        console.error("Error submitting the code:", submitError);
        setErr(true);
      }
  
    } catch (error) {
      setOutput("An unexpected error occurred.");
      setErr(true);
    }
  };
  

  if (!questionData) return <div className="h-screen w-screen flex items-center justify-center">
    <Loader2 className="animate-spin text-gray-300"/>
  </div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-[100%]">
      <Dashboard
        onRunCode={handleRunCode}
        output={output}
        wrong={err}
        questionData={questionData}
      />
    </main>
  );
}
