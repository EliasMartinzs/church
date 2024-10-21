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

export const description = "Um gráfico de pizza com texto";

const chartConfig = {
  visitors: {
    label: "Requisições",
  },
  pending: {
    label: "Pendente",
    color: "hsl(var(--chart-1))",
  },
  answered: {
    label: "Respondido",
    color: "hsl(var(--chart-2))",
  },
  ignored: {
    label: "Ignorado",
    color: "hsl(var(--chart-3))",
  },
  inProgress: {
    label: "Em Andamento",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type Props = {
  statusCount: {
    PENDING: number;
    ANSWERED: number;
    IGNORED: number;
    IN_PROGRESS: number;
  };
  percetageIncrease: string;
};

export const StatusCountChart = ({ statusCount, percetageIncrease }: Props) => {
  const chartData = React.useMemo(
    () => [
      {
        status: "Pendente",
        count: statusCount.PENDING,
        fill: "var(--color-pending)",
      },
      {
        status: "Respondido",
        count: statusCount.ANSWERED,
        fill: "var(--color-answered)",
      },
      {
        status: "Ignorado",
        count: statusCount.IGNORED,
        fill: "var(--color-ignored)",
      },
      {
        status: "Em Andamento",
        count: statusCount.IN_PROGRESS,
        fill: "var(--color-in-progress)",
      },
    ],
    [statusCount]
  );

  const totalRequests = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle> Requisições de Oração</CardTitle>
      </CardHeader>
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
              data={chartData}
              dataKey="count"
              nameKey="status"
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
                          {totalRequests.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Orações
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Aumento de {percetageIncrease}% este mês{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando requisições totais dos últimos anos
        </div>
      </CardFooter>
    </Card>
  );
};
