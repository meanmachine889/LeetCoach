"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Homepage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/check', {
          method: 'GET',
          credentials: 'include', 
        });

        if (response.ok) {
          const { username } = await response.json();
          router.push(`/dashboard/${username}`);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 h-screen w-screen items-center justify-center bg-black">
        <Loader2 className="animate-spin text-zinc-500" size={48} />
        <p className="text-2xl text-gray-400">please wait...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center lg:h-screen bg-gradient-to-b from-zinc-50 to-zinc-300 px-4 py-8">
      <main className="text-center mb-8">
        <h1 className="text-7xl font-bold text-zinc-900">LeetCoach</h1>
        <p className="text-lg text-zinc-600 mt-2">Sharpen your coding skills</p>
        <div className="mt-4 flex items-center gap-9 justify-center">
          <button
            onClick={() => router.push("/signin")}
            className="px-6 w-fit self-center bg-zinc-400 text-zinc-900 rounded-xl py-3 flex justify-center gap-1 items-center hover:bg-zinc-700 hover:text-zinc-300 hover:scale-105 transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-6 w-fit self-center border-2 border-zinc-900 text-zinc-900 rounded-xl py-3 flex justify-center gap-1 items-center hover:bg-zinc-700 hover:text-zinc-300 hover:scale-105 transition-all"
          >
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
