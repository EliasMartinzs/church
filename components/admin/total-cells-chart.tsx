"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { TrendingUp } from "lucide-react";

export const description = "An interactive bar chart";

const chartConfig = {
  totalMembers: {
    label: "Total de Membros",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "#fff",
  },
} satisfies ChartConfig;

type Props = {
  data: {
    cellName: string;
    totalMembers: number;
  }[];
};

export const TotalCellsChart = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader className="items-center text-center border-b border-muted-foreground mx-5">
        <CardTitle>Total de Membros por Célula</CardTitle>
        <CardDescription>Total de Membros por Célula</CardDescription>
      </CardHeader>
      {data.length === 0 ? (
        <div className="w-full py-6 text-center text-muted-foreground font-medium flex flex-col items-center justify-center gap-y-4">
          <p>Nenhum membro criado até o momento</p>
        </div>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="cellName"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="totalMembers" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="totalMembers"
                layout="vertical"
                fill="var(--color-desktop)"
                radius={4}
              >
                <LabelList
                  dataKey="cellName"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="totalMembers"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};
