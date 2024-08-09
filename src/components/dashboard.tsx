"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check, Code, File } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import CodeEditor from "./codeEditor";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 w-[100%] mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between bg-black gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="">
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1 font-semibold bg-black p-2 justify-between gap-2">
      <div className="bg-zinc-900/40 border-2 border-gray-900 w-[50%] max-h-[98vh] flex flex-col rounded-lg overflow-y-scroll">
        <div className="w-[100%] flex p-2 gap-5 bg-zinc-900 h-[4rem] rounded-t-lg ">
          <div className=" text-blue-500 flex items-center justify-start gap-2 p-2 text-sm rounded-lg">
            <File />
            Description
          </div>
          <div className=" text-yellow-500 flex items-center gap-2 p-2 text-sm rounded-lg">
            <Code />
            Submissions
          </div>
          <div className=" text-green-500 flex items-center gap-2 p-2 text-sm rounded-lg">
            <Check />
            Solutions
          </div>
        </div>
        <div className="flex flex-col w-[100%] p-5  gap-9">
          <h1 className="font-semibold text-gray-300 text-4xl">
            Two Sum
          </h1>
          <div className="flex w-[100%] gap-5">
            <div className="bg-green-500/40 text-green-500 p-1 rounded-lg text-sm">
              easy
            </div>
            <div className="bg-zinc-800/50 text-gray-500 p-1 rounded-lg text-sm">
              array
            </div>
          </div>
          <p className="text-gray-300">
            Given an array of integers nums and an integer target, return
            indices of the two numbers such that they add up to target.
            <br />
            <br /> You may assume that each input would have exactly one
            solution, and you may not use the same element twice.
            <br />
            <br /> You can return the answer in any order.
          </p>
          <div className="flex flex-col justify-start items-start font-semibold gap-5 text-gray-300">
            <h1>Example 1</h1>
            <div className="flex flex-col">
              <p className="text-gray-400 font-semibold text-md">
                <span className="font-bold text-gray-300">Input :</span> nums =
                [2,7,11,15], target = 9{" "}
              </p>
              <p className="text-gray-400 font-semibold text-md">
                <span className="font-bold text-gray-300">Output : </span>[0,1]{" "}
              </p>
              <p className="text-gray-400 font-semibold text-md">
                <span className="font-bold text-gray-300">Explanation :</span>{" "}
                Because nums[0] + nums[1] == 9, we return [0, 1].
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start font-semibold gap-5 text-gray-300">
            <h1>Example 2</h1>
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal text-md">
                <span className="font-medium text-gray-300">Input :</span> nums =
                [3,3], target = 6
              </p>
              <p className="text-gray-400 font-normal text-md">
                <span className="font-medium text-gray-300">Output : </span>[0,1]{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start font-semibold gap-5 text-gray-300">
            <h1>Example 3</h1>
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal text-md">
                <span className="font-medium text-gray-300">Input :</span> nums =
                [3,2,4], target = 6{" "}
              </p>
              <p className="text-gray-400 font-normal text-md">
                <span className="font-medium text-gray-300">Output : </span>[1,2]{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900/40 border-2 border-gray-900 w-[50%] max-h-[98vh] flex flex-col rounded-lg overflow-y-scroll">
        <div className="w-[100%] flex items-center justify-between p-2 gap-5 h-[4rem] rounded-t-lg ">
          <div className="bg-black border-2 border-gray-900 p-2 text-sm rounded-xl text-gray-500">
            <p>C++</p>
          </div>
          <div className="flex gap-9">
            <button className="border-green-700 border-2 text-green-300 p-2 rounded-lg text-sm">
              Run
            </button>
            <button className="bg-green-700 text-green-300 p-2 rounded-lg text-sm">
              Submit
            </button>
          </div>
        </div>
        <div className="flex flex-col w-[100%] gap-9 bg-black h-[100%]">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};
