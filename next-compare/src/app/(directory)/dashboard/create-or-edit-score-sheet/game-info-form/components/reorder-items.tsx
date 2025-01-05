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
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [popoverPalette, setPopoverPalette] = useState({ top: 0, left: 0 });
  const [openPaletteIndex, setOpenPaletteIndex] = useState<number | null>(null);
  const { color, setColor, reorderValues, setReorderValues, horizontalView } =
    useScoreSheetMultiContext();

  // TODO: create turnoff palette modal functionality.
  // useEffect(() => {
  //   const handleClickOutSide = (e: MouseEvent) => {
  //     if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
  //       console.log("Kliknięcie poza portalem:", portalRef.current);
  //     } else {
  //       console.log(
  //         "Kliknięcie w portalu lub niezwiązane elementy:",
  //         portalRef.current,
  //       );
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutSide);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutSide);
  //   };
  // }, [portalRef]);

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
    if (openPaletteIndex === index) {
      setOpenPaletteIndex(null);
    } else {
      const currentRef = paletteRef.current[index];
      if (currentRef) {
        const paletteRect = currentRef.getBoundingClientRect();
        setPopoverPalette({
          top: paletteRect.bottom + window.scrollY,
          left: paletteRect.left + window.scrollX,
        });
        setColor(reorderValues[index].color);
        setOpenPaletteIndex(index);
      }
    }
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    if (openPaletteIndex !== null) {
      // console.log("handle color changes", portalRef.current);
      setReorderValues((prevState) =>
        prevState.map((item, idx) =>
          idx === openPaletteIndex ? { ...item, color } : item,
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
      dragListener={!(openPaletteIndex === index)}
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

          <div
            className="flex gap-3 items-center"
            id={String(reorder.id)}
            ref={(el) => {
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
      {createPortal(
        <div
          className={cn(
            "rounded-[9px] shadow-colorPicker",
            openPaletteIndex === index ? "block" : "hidden",
          )}
          style={{
            position: "absolute",
            top: popoverPalette.top,
            left: popoverPalette.left,
          }}
          ref={portalRef}
        >
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>,
        document.body,
      )}
    </Reorder.Item>
  ));
}
