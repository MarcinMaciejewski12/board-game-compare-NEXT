import { CalendarDays, Heart, Home, List, Settings } from "lucide-react";
import Link from "next/link";
import NavLink from "@/components/sidebars/lib/nav-active";

export default function Sidebar() {
  return (
    <div className="w-full items-center justify-around py-6 flex flex-col h-full">
      <div className="h-full items-center flex flex-col justify-between">
        <div className="flex flex-col items-center gap-6">
          <NavLink href={"/dashboard"}>
            <Home color="white" />
          </NavLink>
          <NavLink href={"/dashboard/games-list"}>
            <List color={"white"} />
          </NavLink>
          <NavLink href={"/calendar"}>
            <CalendarDays color={"white"} />
          </NavLink>
        </div>
        <NavLink href={"/calendar"}>
          <Settings color={"white"} />
        </NavLink>
      </div>
    </div>
  );
}
