"use client";
import { Button } from "@/components/button";
import { Burger } from "@/components/burger";
import { useState } from "react";
import { Navigation } from "./navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedOut, SignOutButton, useAuth, useUser } from "@clerk/nextjs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathaname = usePathname();
  function isNavigationOpen(isOpen: boolean) {
    setIsOpen(isOpen);
  }
  return (
    <>
      <Navigation isOpen={isOpen} />
      <header
        className={`h-20 flex items-center ${isOpen || !!user ? "justify-end" : "justify-between"} z-10 inset-0 fixed top-0`}
      >
        {!!user
          ? null
          : !isOpen && (
              <Link href={"/login"}>
                {pathaname === "/login" ||
                  ("/register" && (
                    <Button
                      className="opacity-0 text-default sm:opacity-100"
                      size="loginSize"
                      variant="default"
                      nameToDisplay="LogIn"
                    />
                  ))}
              </Link>
            )}
        {!isSignedIn && <Burger navigationIsOpenHandler={isNavigationOpen} />}
        {isSignedIn && <LoggedUserHeader />}
      </header>
    </>
  );
}

function LoggedUserHeader() {
  return (
    <div className="w-full h-full flex justify-between items-center top-0 z-10 px-8">
      <h1 className="text-default tracking-wider text-xl">
        <Link href={"/dashboard"}>BoardGameCompare.</Link>
      </h1>
      <div className="border cursor-pointer border-black rounded-full w-24 h-10 flex items-center justify-center">
        <SignOutButton />
      </div>
    </div>
  );
}
