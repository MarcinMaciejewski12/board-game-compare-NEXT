"use client";
import { Button } from "@/components/button";
import { Burger } from "@/components/burger";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function isNavigationOpen(isOpen: boolean) {
    setIsOpen(isOpen);
  }
  const clickHandler =
    `h-14 z-10 flex items-center justify-${!isOpen ? "between" : "end"} px-8`;

  return (
    <header className={clickHandler}>
      {!isOpen && (
        <Button className='hidden md:block' size="loginSize" variant="default" nameToDisplay="LogIn" />
      )}
      <Burger navigationIsOpenHandler={isNavigationOpen} />
    </header>
  );
}
