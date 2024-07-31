"use client";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full h-defaultHeaderHeight flex items-center">
      <div className="h-full w-defaultSidebarWidth" />
      <div className="flex items-center justify-between w-full mr-[20px]">
        <h1 className="text-white text-xl tracking-wider font-medium">
          <Link href={"/dashboard"}>BoardGameCompare.</Link>
        </h1>
        {isSignedIn && (
          <div className="w-24 border border-white text-white rounded-2xl h-8 flex items-center justify-center ">
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}
