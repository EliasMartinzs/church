"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A multiple bar chart";

type FormattedData = { month: string; newMembers: number };

type Props = {
  data: FormattedData[];
};

const chartConfig = {
  newMembers: {
    label: "Novos Membros",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function NewMembersPerMonthChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Novos Membros por Mês</CardTitle>
        <CardDescription className="text-center">
          Acompanhe o crescimento da sua comunidade ao longo dos meses.
        </CardDescription>
      </CardHeader>

      {data.length === 0 ? (
        <div className="w-full py-6 text-center text-muted-foreground font-medium flex flex-col items-center justify-center gap-y-4">
          <p>Nenhum membro criado até o momento</p>
        </div>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="newMembers"
                fill="var(--color-newMembers)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
