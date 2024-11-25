export type LabelType = {
  id: number;
  name: string | number;
  color?: string;
};

export const labels: LabelType[] = [
  {
    id: 1,
    name: "Eurogame",
    color: "bg-amber-500",
  },
  {
    id: 2,
    name: "Deck Building",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Ameritrashe",
    color: "bg-red-500",
  },
  {
    id: 4,
    name: "Party Game",
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Cooperative",
    color: "bg-purple-500",
  },
  {
    id: 6,
    name: "Wargame",
    color: "bg-gray-500",
  },
  {
    id: 7,
    name: "Narrative Game",
    color: "bg-yellow-500",
  },
  {
    id: 8,
    name: "Deduction Game",
    color: "bg-indigo-500",
  },
  {
    id: 9,
    name: "Abstract Game",
    color: "bg-pink-500",
  },
  {
    id: 10,
    name: "Asymmetrical Game",
    color: "bg-teal-500",
  },
  {
    id: 11,
    name: "Roll & Write",
    color: "bg-orange-500",
  },
  {
    id: 12,
    name: "Economic Game",
    color: "bg-lime-500",
  },
  {
    id: 13,
    name: "Legacy Game",
    color: "bg-rose-500",
  },
  {
    id: 14,
    name: "Worker Placement",
    color: "bg-cyan-500",
  },
];

const difficultyLevelsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const difficultyLevels: { id: number; name: number }[] =
  difficultyLevelsArray.map((level) => ({ id: level, name: level }));

export const playTime: { id: number; name: string }[] = [
  {
    id: 1,
    name: "15",
  },
  {
    id: 2,
    name: "30",
  },
  {
    id: 3,
    name: "45",
  },
  {
    id: 4,
    name: "60",
  },
  {
    id: 5,
    name: "90",
  },
  {
    id: 6,
    name: "120",
  },
  {
    id: 7,
    name: "180",
  },
  {
    id: 8,
    name: "240",
  },
];
