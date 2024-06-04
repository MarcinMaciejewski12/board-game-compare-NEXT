"use client";
import { Button } from "@/components/button";
import { Burger } from "@/components/burger";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenHandler = `z-10  h-14 flex items-center ${isOpen ? "justify-end" : "justify-between"} px-8`;
  function isNavigationOpen(isOpen: boolean) {
    setIsOpen(isOpen);
  }
  return (
    <header className={isOpenHandler}>
      {!isOpen && (
        <Button
          className="opacity-0 text-default sm:opacity-100 z-10"
          size="loginSize"
          variant="default"
          nameToDisplay="LogIn"
        />
      )}
      <Burger navigationIsOpenHandler={isNavigationOpen} />
    </header>
  );
}
