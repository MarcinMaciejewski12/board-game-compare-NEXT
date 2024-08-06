"use client";
import Link from "next/link";
import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "./button";
import { LogIn } from "lucide-react";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full h-defaultHeaderHeight flex items-center">
      <div className="h-full w-defaultSidebarWidth" />
      <div className="flex items-center justify-between w-full mr-[20px]">
        <h1 className="text-white text-xl tracking-wider font-medium">
          <Link href={"/dashboard"}>BoardGameCompare.</Link>
        </h1>
        {isSignedIn ? (
          <div className="w-24 border border-white text-white rounded-2xl h-8 flex items-center justify-center ">
            <SignOutButton />
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href={"/login"}>
            <Button className="w-24 border border-white text-white rounded-2xl h-8 flex items-center justify-center shadow-none" nameToDisplay="Log In" />
            </Link>
            
            
            <Link href={"/register"} >
           <Button nameToDisplay="Sign up" className="bg-buttonAndShadowColor shadow-xl h-8 flex items-center justify-center rounded-2xl px-4  text-white hover:bg-buttonAndShadowColor/90" />
           </Link>
    
            
          </div>
        )}
      </div>
    </div>
  );
}
