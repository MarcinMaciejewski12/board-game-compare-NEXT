"use client";
import NavLink from "@/components/sidebars/lib/nav-active";
import { Home, List } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/button";

export default function MobileBottomNavigation() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-around">
      <NavLink href={"/"}>
        <Home color="white" />
      </NavLink>
      {pathname === "/dashboard" && (
        <div className="h-16 items-center flex justify-start">
          <Link href={"/dashboard/create-or-edit-score-sheet"}>
            <Button
              nameToDisplay="Add score board"
              variant="default"
              size="default"
            />
          </Link>
        </div>
      )}
      <NavLink href={"/games-list"}>
        <List color={"white"} />
      </NavLink>
      {/*<NavLink href={"/calendar"}>*/}
      {/*  <Settings color={"white"} />*/}
      {/*</NavLink>*/}
    </div>
  );
}
