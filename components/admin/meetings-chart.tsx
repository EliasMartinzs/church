"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const description = "An interactive bar chart";

const chartConfig = {
  meetings: {
    label: "Encontros",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type Props = {
  data: {
    date: string;
    meetingsCount: number;
  }[];
};

export const MeetingsChart = ({ data }: Props) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("meetings");
  const [chartData, setChartData] = React.useState(data);

  const total = React.useMemo(
    () => ({
      meetings: chartData.reduce((acc, curr) => acc + curr.meetingsCount, 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b mx-5 sm:flex-row text-center">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Gráfico dos encontros</CardTitle>
          <CardDescription>
            Exibindo o total de reuniões dos últimos dias
          </CardDescription>
        </div>

        {data.length === 0 ? (
          <></>
        ) : (
          <div className="flex">
            {["meetings"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </CardHeader>

      {data.length === 0 ? (
        <div className="w-full py-6 text-center text-muted-foreground font-medium flex flex-col items-center justify-center gap-y-4">
          <p>Nenhum encontro criado até o momento</p>
        </div>
      ) : (
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const [day, month, year] = value.split("/").map(Number);
                  const date = new Date(year, month - 1, day);
                  return date.toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "numeric",
                    timeZone: "America/Sao_Paulo",
                  });
                }}
              />
              <Bar
                dataKey="meetingsCount"
                fill={chartConfig.meetings.color}
                name={chartConfig.meetings.label}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="meetingsCount"
                    labelFormatter={(value) => {
                      const [day, month, year] = value.split("/").map(Number);
                      const date = new Date(year, month - 1, day);
                      return date.toLocaleDateString("pt-BR", {
                        month: "short",
                        day: "numeric",
                        timeZone: "America/Sao_Paulo",
                      });
                    }}
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};
