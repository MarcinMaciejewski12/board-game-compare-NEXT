"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BurgerProps {
  navigationIsOpenHandler: (arg: boolean) => void;
  cls?: string;
}

const topBlock = {
  visible: { rotate: 0, y: 0 },
  hidden: { rotate: 45, y: 7 },
};

const bottomBlock = {
  visible: { rotate: 0, y: 0 },
  hidden: { rotate: -45, y: -7 },
};

const middleBlock = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export function Burger({
  navigationIsOpenHandler,
  cls,
}: Readonly<BurgerProps>) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    navigationIsOpenHandler(newOpenState);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex z-10 flex-col justify-between h-4 cursor-pointer",
        cls,
      )}
    >
      <motion.div
        variants={topBlock}
        animate={open ? "hidden" : "visible"}
        className="w-8 bg-black h-0.5"
      />
      <motion.div
        className="w-8 bg-black h-0.5"
        variants={middleBlock}
        animate={open ? "hidden" : "visible"}
      />
      <motion.div
        variants={bottomBlock}
        animate={open ? "hidden" : "visible"}
        className="w-8 bg-black h-0.5"
      />
    </button>
  );
}
