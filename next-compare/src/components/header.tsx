"use client";
import { Button } from "@/components/button";
import { Burger } from "@/components/burger";
import { useState } from "react";
import { Navigation } from "./navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathaname = usePathname();
  const { user } = useUser();
  function isNavigationOpen(isOpen: boolean) {
    setIsOpen(isOpen);
  }
  console.log(!!user);
  return (
    <>
      <Navigation isOpen={isOpen} />
      <header
        className={`h-14 flex items-center ${isOpen || !!user ? "justify-end" : "justify-between"} z-10 inset-0 fixed px-8 top-0 `}
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
        <Burger navigationIsOpenHandler={isNavigationOpen} />
      </header>
    </>
  );
}
