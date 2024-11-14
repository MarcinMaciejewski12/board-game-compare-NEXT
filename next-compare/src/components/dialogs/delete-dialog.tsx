import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/button";
import { Trash } from "lucide-react";

interface DeleteGameDialogProps {
  deleteFunction: (
    userId: string,
    gameId: string,
  ) => Promise<{
    status: boolean;
    data: undefined;
    message: string;
  }>;
  uniqueBoardId: string;
  userId: string;
}

export default function DeleteGameDialog({
  deleteFunction,
  uniqueBoardId,
  userId,
}: DeleteGameDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash
          // onClick={() =>
          //   deleteGameFromUserAccount(uniqueBoardId, user?.id ?? "")
          // }
          className="cursor-pointer text-default"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete game</DialogTitle>
          <DialogDescription>
            You are deleting the game <strong>Game Name</strong>. Are you sure
            you want to delete this game?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => deleteFunction(uniqueBoardId, userId)}
            type="submit"
            variant="default"
            nameToDisplay="Delete"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
