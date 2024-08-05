import { CalendarDays, Heart, List, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-full items-center justify-around py-6 flex flex-col h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <Link href={"/dashboard/games-list"}>
            <List color={"white"} />
          </Link>
          <Link href={"/favourite"}>
            <Heart color={"white"} />
          </Link>
          <Link href={"/calendar"}>
            <CalendarDays color={"white"} />
          </Link>
        </div>
        <Link href={"/calendar"}>
          <Settings color={"white"} />
        </Link>
      </div>
    </div>
  );
}
