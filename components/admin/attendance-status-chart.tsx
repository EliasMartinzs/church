"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
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
import Link from "next/link";
import { buttonVariants } from "../ui/button";
export const description = "A donut chart with text";

const chartConfig = {
  status: {
    label: "Status",
  },
  attending: {
    label: "Participando",
    color: "hsl(var(--chart-1))",
  },
  not_attending: {
    label: "Não participando",
    color: "hsl(var(--chart-2))",
  },
  maybe: {
    label: "Talvez",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type Props = {
  data: {
    attendanceStatus: string;
    count: number;
    fill: string;
  }[];
};
export const AttendaceStatusChart = ({ data }: Props) => {
  const totalParticipants = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center text-center border-b border-muted-foreground mx-5">
        <CardTitle>Gráfico de Participação em Reuniões</CardTitle>
        <CardDescription>Últimos dados de participação</CardDescription>
      </CardHeader>
      {data?.length === 0 ? (
        <div className="w-full py-6 text-center text-muted-foreground font-medium flex flex-col items-center justify-center gap-y-4">
          <p>Nenhuma partipação confirmada até o momento</p>
        </div>
      ) : (
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="count"
                nameKey="attendanceStatus"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalParticipants.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Participantes
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};
