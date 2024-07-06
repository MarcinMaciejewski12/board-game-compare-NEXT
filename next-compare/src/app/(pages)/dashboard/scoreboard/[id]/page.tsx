"use client";
import { useState } from "react";

const MOCKED_TABLE = {
  gameScoreBoard: [
    { fieldName: "War", fieldColor: "red" },
    { fieldName: "Coins", fieldColor: "white" },
    { fieldName: "Wonders", fieldColor: "white" },
    { fieldName: "", fieldColor: "yellow" },
    { fieldName: "", fieldColor: "purple" },
    { fieldName: "", fieldColor: "gold" },
    { fieldName: "", fieldColor: "green" },
    { fieldName: "", fieldColor: "blue" },
  ],
};
export default function Scoreboard() {
  const [score, setScore] = useState<number>();
  return <h1>siemano hermano</h1>;
}
