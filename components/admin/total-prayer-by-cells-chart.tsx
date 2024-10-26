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

export const description = "An interactive bar chart";

const chartConfig = {
  totalPrayer: {
    label: "Oraçoes",
  },
  label: {
    color: "#fff",
  },
} satisfies ChartConfig;

type Props = {
  data: {
    cellName: string | undefined;
    totalPrayer: number;
  }[];
};

export const TotalPrayerByCellsChart = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader className="items-center text-center border-b border-muted-foreground mx-5">
        <CardTitle>Total de oraçoes por Célula</CardTitle>
        <CardDescription>Total de oraçoes por Célula</CardDescription>
      </CardHeader>
      {data.length === 0 ? (
        <div className="w-full py-6 text-center text-muted-foreground font-medium flex flex-col items-center justify-center gap-y-4">
          <p>Nenhuma oração requisitada até o momento</p>
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
              <XAxis dataKey="totalPrayer" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="totalPrayer"
                layout="vertical"
                fill="hsl(var(--chart-3))"
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
                  dataKey="totalPrayer"
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
