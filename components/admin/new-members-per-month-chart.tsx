"use client";

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

export const description = "A multiple bar chart";

type FormattedData = { month: string; newMembers: number };

type Props = {
  data: FormattedData[];
};

const chartConfig = {
  newMembers: {
    label: "Novos Membros",
  },
} satisfies ChartConfig;

export function NewMembersPerMonthChart({ data }: Props) {
  return (
    <Card>
      <CardHeader className="text-start">
        <CardTitle>Novos Membros por Mês</CardTitle>
        <CardDescription>
          Acompanhe o crescimento da sua comunidade ao longo dos meses.
        </CardDescription>
      </CardHeader>

      {data.length === 0 ? (
        <div className="w-full p-6">
          <p>Nenhum membro criado até o momento</p>
        </div>
      ) : (
        <CardContent>
          <ChartContainer
            className="lg:max-h-96 lg:w-full"
            config={chartConfig}
          >
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
              <Bar dataKey="newMembers" fill="hsl(var(--chart-4))" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
