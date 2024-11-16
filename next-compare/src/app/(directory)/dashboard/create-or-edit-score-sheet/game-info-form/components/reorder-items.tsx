import {
  ReorderValue,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import React, { useEffect, useRef, useState } from "react";
import { Reorder } from "framer-motion";
import { Input } from "@/components/input";
import { Palette, X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface ReorderValuesProps {
  id: string | string[];
  // reorderValues: ReorderValue[];
  // openIndex: number | null;
  // reorderValuesSetter: React.Dispatch<React.SetStateAction<ReorderValue[]>>;
  // openIndexSetter: React.Dispatch<React.SetStateAction<number | null>>;
  popover: React.RefObject<HTMLDivElement>;
  // colorSetter: React.Dispatch<React.SetStateAction<string>>;
  // color: string;
  // horizontalView?: boolean;
}

export default function ReorderItem({ id, popover }: ReorderValuesProps) {
  const {
    openIndex,
    setOpenIndex,
    color,
    setColor,
    reorderValues,
    setReorderValues,
    horizontalView,
  } = useScoreSheetMultiContext();

  const [popoverStyle, setPopoverStyle] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popover.current && !popover.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newPlaceholder = e.target.value;
    setReorderValues((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? { ...item, placeholder: newPlaceholder } : item,
      ),
    );
  };

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setColor(reorderValues[index].color);
      setOpenIndex(index);
      if (popover.current) {
        const rect = popover.current.getBoundingClientRect();
        setPopoverStyle({ top: rect.bottom, left: rect.left });
      }
    }
  };
  const handleColorChange = (color: string) => {
    setColor(color);
    if (openIndex !== null) {
      setReorderValues((prevState) =>
        prevState.map((item, idx) =>
          idx === openIndex ? { ...item, color } : item,
        ),
      );
    }
  };

  const removeReorderItem = (id: number): void => {
    const filterAndRemoveGameField = reorderValues.filter(
      (item) => item.id !== id,
    );
    setReorderValues(filterAndRemoveGameField);
  };

  return reorderValues.map((reorder, index) => (
    <Reorder.Item
      value={reorder}
      key={reorder.id}
      className={cn(horizontalView ? "cursor-ew-resize" : "cursor-ns-resize")}
      dragListener={!(openIndex === index)}
    >
      <div
        style={{ backgroundColor: reorder.color }}
        className="bg-white h-24 w-72 border border-black rounded-lg flex items-center justify-center"
      >
        <Input
          style={{ backgroundColor: reorder.color }}
          className="border-none text-xl"
          placeholder="Field name"
          type="text"
          value={id && reorder.placeholder}
          onChange={(e) => handleInputChange(e, index)}
        />
        <div className="flex flex-col justify-around items-end h-full">
          <X
            className="h-5 w-5 cursor-pointer"
            onClick={() => removeReorderItem(reorder.id)}
          />
          <div className="relative">
            <div className="flex gap-3 items-center">
              <Palette
                className="cursor-pointer"
                onClick={() => {
                  handleToggle(index);
                }}
              />
            </div>
            {openIndex === index && (
              <div
                className="absolute right-0 md:left-0 rounded-[9px] shadow-colorPicker z-50"
                ref={popover}
              >
                {/*TODO: popup is not positioned absolute in horizontal view(need to use portal here)*/}
                <HexColorPicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Reorder.Item>
  ));
}
