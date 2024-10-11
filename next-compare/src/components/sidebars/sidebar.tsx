import { BadgeInfo, Home, List, Settings } from "lucide-react";

import NavLink from "@/components/sidebars/lib/nav-active";
import { currentUser } from "@clerk/nextjs/server";

export default async function Sidebar() {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <div className="hidden sm:block w-full items-center justify-around py-6 flex-col h-full">
          <div className="h-full items-center flex flex-col justify-between">
            <div className="flex flex-col items-center gap-6">
              <NavLink href={"/dashboard"}>
                <Home color="white" />
              </NavLink>
              <NavLink href={"/games-list"}>
                <List color={"white"} />
              </NavLink>
            </div>
            <NavLink href={"/calendar"}>
              <Settings color={"white"} />
            </NavLink>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
