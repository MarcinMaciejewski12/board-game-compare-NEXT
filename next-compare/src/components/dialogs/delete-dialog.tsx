import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/button";
import { Trash } from "lucide-react";
import { deleteGameFromUserAccount } from "@/app/(directory)/dashboard/actions";

interface DeleteGameDialogProps {
  uniqueBoardId: string;
  userId: string;
  gameName: string;
}

export default function DeleteGameDialog({
  uniqueBoardId,
  userId,
  gameName,
}: DeleteGameDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash className="cursor-pointer text-default" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-default">Delete game</DialogTitle>
          <DialogDescription className="text-white">
            You are deleting the game{" "}
            <strong className="text-default">{gameName}</strong>. Are you sure
            you want to delete this game?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="w-24 h-8"
              type="button"
              variant="dialogCancel"
              nameToDisplay="Close"
            />
          </DialogClose>
          <Button
            onClick={() => deleteGameFromUserAccount(uniqueBoardId, userId)}
            className="w-24 h-8"
            type="submit"
            variant="dialogDelete"
            nameToDisplay="Delete"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
