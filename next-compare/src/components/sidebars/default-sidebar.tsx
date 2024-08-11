import { BadgeInfo } from "lucide-react";
import { Home } from "lucide-react";
import NavLink from "@/components/sidebars/lib/nav-active";

export default function DefaultSidebar() {
  return (
    <div className="w-full items-center justify-around py-6 flex flex-col h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-center items-center flex-col gap-6">
          <NavLink href={"/"}>
            <Home color="white" />
          </NavLink>
          <NavLink href={"/info"}>
            <BadgeInfo color="white" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
