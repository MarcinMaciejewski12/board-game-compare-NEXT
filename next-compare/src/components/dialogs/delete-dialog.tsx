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
import { toast } from "../hooks/use-toast";

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
  const gameDelete = async () => {
    try {
      const res = await deleteGameFromUserAccount(uniqueBoardId, userId);

      if (res.status) {
        toast({
          title: res.message,
          className: "bg-white",
        });
      }
    } catch (e) {
      console.error(e);
      throw new Error("Failed to delete game");
    }
  };

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
            onClick={gameDelete}
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
