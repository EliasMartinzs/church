"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  attendanceRate: {
    label: "Participação",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  data: {
    id: string;
    fullName: string | null;
    attendanceRate: string;
  }[];
};

export const AttendenceRateMemberChart = ({ data }: Props) => {
  return (
    <Card className="lg:bg-background">
      <CardHeader>
        <CardTitle>Taxa de Presença</CardTitle>
        <CardDescription>
          Taxa de presença dos membros da célula
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="lg:max-h-96 lg:w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="fullName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="attendanceRate"
              fill="var(--color-attendanceRate)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendência de presença <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Exibindo a taxa de presença de todos os membros
        </div>
      </CardFooter>
    </Card>
  );
};
