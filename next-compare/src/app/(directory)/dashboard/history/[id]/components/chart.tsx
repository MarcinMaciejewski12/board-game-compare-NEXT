import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const colorPalette = [
  "#FFF", // Original color
  "#8FAF92", // Light green
  "#4F6F52", // Dark green
  "#AFCFB2", // Pale green
  "#3F5F42", // Deep green
  "#B0C4B1", // Soft green
  "#5A7F61", // Medium green
  "#7FAF81", // Fresh green
];

interface ChartProps {
  scoreBoardData: { name: string; totalScore: number }[];
}

export default function Chart({ scoreBoardData }: ChartProps) {
  const aggregatedScores = new Map<string, number>();

  scoreBoardData?.forEach(
    ({ name, totalScore }: { name: string; totalScore: number }) => {
      if (aggregatedScores.has(name)) {
        aggregatedScores.set(name, aggregatedScores.get(name)! + totalScore);
      } else {
        aggregatedScores.set(name, totalScore);
      }
    },
  );

  const finalScoreBoardData = Array.from(
    aggregatedScores,
    ([name, totalScore]) => ({
      name,
      totalScore,
    }),
  );

  const chartConfig: ChartConfig = finalScoreBoardData.reduce(
    (config, player, index) => {
      if (index < 7) {
        // Ensure not more than 7 players
        config[player.name] = {
          label: player.name,
          color: colorPalette[index % colorPalette.length], // Cycle through colors if more than available
        };
      }
      return config;
    },
    {} as ChartConfig,
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={finalScoreBoardData}>
        <CartesianGrid />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={"totalScore"} fill={"#4F6F52"} radius={4} />
      </BarChart>
    </ChartContainer>
  );
}