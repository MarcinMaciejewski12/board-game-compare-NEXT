"use client";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./button";

export default function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className="w-full h-16 bg-black flex items-center justify-between px-8">
      <Link href={isSignedIn ? "/dashboard" : "/"}>
        <h1 className="text-white">Board Game Compare.</h1>
      </Link>
      <div className="flex items-center gap-4">
        <p className="text-white">Pricing</p>
        <p className="text-white">About</p>

        {!isSignedIn && (
          <>
            <Link href={"/login"}>
              <Button
                className="cursor-pointer text-sm rounded-md w-24 border-white border-2 hover:bg-white/20"
                size="sm"
                variant="default"
                nameToDisplay="Log in"
              />
            </Link>
            <Link href={"/register"}>
              <Button
                nameToDisplay="Sign up"
                variant="signup"
                size="sm"
                className="w-24 text-sm text-[#3F3A3A]"
              />
            </Link>
          </>
        )}
        {isSignedIn && (
          <div className="w-24 border border-white text-white rounded-2xl h-8 items-center justify-center flex">
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}
