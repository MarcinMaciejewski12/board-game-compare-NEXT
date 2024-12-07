import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/button";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3 } from "lucide-react";
import PointsSummary from "@/app/(directory)/dashboard/scoreboard/[id]/scoreboard-view/score-dialog/poinst-summary";

const animationVariants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export default function ShowScoreResult({
  points = [],
}: {
  points: { [p: string]: string }[] | undefined;
}) {
  const [currentStep, setCurrentStep] = useState(4);
  const [open, setOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldAnimate(true);
      // setCurrentStep(0);
    }
    return () => setShouldAnimate(false);
  }, [open]);

  useEffect(() => {
    console.log(currentStep);
    if (currentStep < 4) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentStep, shouldAnimate]);
  return (
    <Dialog onOpenChange={() => setOpen(!open)}>
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
          {/*TODO: can be created in one div*/}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute"
            >
              <Dice1 className="w-28 h-28" />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute"
            >
              <Dice2 className="w-28 h-28" />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute"
            >
              <Dice3 className="w-28 h-28" />
            </motion.div>
          )}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute"
            >
              <PointsSummary points={points} />
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
