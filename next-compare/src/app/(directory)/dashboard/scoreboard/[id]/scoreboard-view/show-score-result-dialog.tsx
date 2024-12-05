import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/button";
import React from "react";
import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3 } from "lucide-react";

const animationVariants = {
  hidden: {
    opacity: 1,
    // y: -1000,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const animateVariants2 = {
  start: {},
  end: {},
};
const animationItems = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
export default function ShowScoreResult() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          nameToDisplay="Show total points"
          variant="default"
          size="default"
        />
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] h-[70vh] bg-white">
        <motion.div
          variants={animationVariants}
          initial="hidden"
          animate="show"
          className="w-full h-full flex relative flex-col items-center justify-center"
        >
          <motion.div variants={animationItems} className="absolute">
            <Dice1 className="w-28 h-28" />
          </motion.div>
          <motion.div variants={animationItems} className="absolute">
            <Dice2 className="w-28 h-28" />
          </motion.div>
          <motion.div variants={animationItems} className="absolute">
            <Dice3 className="w-28 h-28" />
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
{
  /*<Crown />*/
}
{
  /**/
}
{
  /*<Dice2 />*/
}
{
  /*<Dice3 />*/
}
{
  /*<Dice4 />*/
}
