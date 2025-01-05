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
  id: string | undefined;
}

export default function ReorderItem({ id }: ReorderValuesProps) {
  const paletteRef = useRef<(HTMLDivElement | null)[]>([]);
  const [popoverPalette, setPopoverPalette] = useState({ top: 0, left: 0 });
  const {
    openIndex,
    setOpenIndex,
    color,
    setColor,
    reorderValues,
    setReorderValues,
    horizontalView,
  } = useScoreSheetMultiContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        paletteRef.current.every(
          (el) => el && !el.contains(event.target as Node),
        )
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIndex]);

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
      const currentRef = paletteRef.current[index];
      if (currentRef) {
        const paletteRect = currentRef.getBoundingClientRect();
        setPopoverPalette({
          top: paletteRect.bottom + window.scrollY,
          left: paletteRect.left + window.scrollX,
        });
        setColor(reorderValues[index].color);
        setOpenIndex(index);
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
            <div
              className="flex gap-3 items-center"
              id={String(reorder.id)}
              ref={(el: HTMLDivElement | null) => {
                paletteRef.current[index] = el;
              }}
            >
              <Palette
                className="cursor-pointer"
                onClick={() => {
                  handleToggle(index);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {createPortal(
        <div
          className={cn(
            "rounded-[9px] shadow-colorPicker z-50",
            openIndex === index ? "block" : "hidden",
          )}
          style={{
            position: "absolute",
            top: popoverPalette.top,
            left: popoverPalette.left,
          }}
        >
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>,
        document.body,
      )}
    </Reorder.Item>
  ));
}
