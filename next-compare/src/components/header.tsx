"use client";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./button";
import NavLink from "./sidebars/lib/nav-active";

export default function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className="w-full sticky z-50 top-0 h-16 bg-black flex items-center justify-between px-8">
      <Link href={isSignedIn ? "/dashboard" : "/"}>
        <h1 className="text-white">Board Game Compare.</h1>
      </Link>
      <div className="flex  items-center gap-4">
        {isSignedIn && (
          <NavLink href={"/games-list"}>
            <p className="cursor-pointer">Community games</p>
          </NavLink>
        )}

        {!isSignedIn && <p className="text-white cursor-pointer">Pricing</p>}
        {!isSignedIn && <p className="text-white cursor-pointer">About</p>}
        {!isSignedIn && (
          <>
            <Link href={"/login"}>
              <Button
                className="cursor-pointer text-sm rounded-md w-24 border-brightBlack border-2 hover:bg-defaultButton/80"
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
                className="w-24 text-sm text-black font-medium  hover:bg-defaultButton/80"
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
