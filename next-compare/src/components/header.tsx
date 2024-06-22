"use client";
import { Button } from "@/components/button";
import { Burger } from "@/components/burger";
import { useState } from "react";
import { Navigation } from "./navigation";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function isNavigationOpen(isOpen: boolean) {
    setIsOpen(isOpen);
  }

  return (
    <>
      <Navigation isOpen={isOpen} />
      <header
        className={`h-14 flex items-center ${isOpen ? "justify-end" : "justify-between"} z-10 inset-0 fixed px-8 top-0 `}
      >
        {!isOpen && (
          <Link href={"/login"}>
            <Button
              className="opacity-0 text-default sm:opacity-100"
              size="loginSize"
              variant="default"
              nameToDisplay="LogIn"
            />
          </Link>
        )}
        <Burger navigationIsOpenHandler={isNavigationOpen} />
      </header>
    </>
  );
}
