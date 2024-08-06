import { BadgeInfo, Warehouse } from "lucide-react";
import Link from "next/link";

export default function DefaultSidebar() {
  return (
    <div className="w-full items-center justify-around py-6 flex flex-col h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <Link href={"/dashboard/games-list"}>
            <Warehouse color="white" />
          </Link>
          <Link href={"/favourite"}>
            <BadgeInfo color="white" />
          </Link>
          <Link href={"/calendar"}></Link>
        </div>
      </div>
    </div>
  );
}
