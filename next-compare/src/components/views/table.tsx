import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";

interface TableProps<T> {
  data: T[];
  isDashboard?: boolean;
}

export default function Table<T>({ data, isDashboard = false }: TableProps<T>) {
  return (
    <div className="w-full h-full bg-red-200">
      <div className="w-full flex justify-between items-center bg-blue-500">
        <Input
          variant="searchbar"
          // onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search games"
        />

        {isDashboard && (
          <Link href={"/dashboard/create-or-edit-score-sheet"}>
            <Button
              nameToDisplay="Add score board"
              variant="default"
              size="default"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
