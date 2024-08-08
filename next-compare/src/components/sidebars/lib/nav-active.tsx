"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavActiveProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavActiveProps) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link href={href}>
      <div
        className={
          isActive ? "bg-gray-200 bg-opacity-30 rounded px-3 py-1.5 " : ""
        }
      >
        {children}
      </div>
    </Link>
  );
}
