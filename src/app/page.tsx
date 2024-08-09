import { SidebarDemo } from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-[100%]">
      <SidebarDemo/>
    </main>
  );
}
