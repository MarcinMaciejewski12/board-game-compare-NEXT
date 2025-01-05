"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavActiveProps {
  href: string;
  children: React.ReactNode;
  suffixRouteName?: string;
}

export default function NavLink({
  href,
  children,
  suffixRouteName,
}: NavActiveProps) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link href={href}>
      <div className={isActive ? "text-defaultButton" : "text-white"}>
        {children}
        {suffixRouteName && suffixRouteName}
      </div>
    </Link>
  );
}
