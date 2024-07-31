import { CalendarDays, Heart, List, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-full items-center justify-around py-6 flex flex-col h-full">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <List color={"white"} />
          <Heart color={"white"} />
          <CalendarDays color={"white"} />
        </div>
        <Settings color={"white"} />
      </div>
    </div>
  );
}
