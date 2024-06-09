"use client";
import { Button } from "@/components/button";
import { Burger } from "@/components/burger";
import { useState } from "react";
import { Navigation } from "./navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function isNavigationOpen(isOpen: boolean) {
    setIsOpen(isOpen);
  }

  return (
    <>
      <Navigation isOpen={isOpen} />
      <header
        className={`h-14 z-10 flex items-center ${isOpen ? "justify-end" : "justify-between"} px-8 sticky top-0`}
      >
        {!isOpen && (
          <Button
            className="opacity-0 text-default sm:opacity-100"
            size="loginSize"
            variant="default"
            nameToDisplay="LogIn"
          />
        )}
        <Burger navigationIsOpenHandler={isNavigationOpen} />
      </header>
    </>
  );
}
