"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  data: { members: number; fill: string }[];
};

const chartConfig = {
  members: {
    label: "Total",
  },
};

export const TotalMembersChart = ({ data }: Props) => {
  const totalMembers = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.members, 0);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center text-center border-b border-muted-foreground mx-5">
        <CardTitle>Membros e Secretários</CardTitle>
        <CardDescription>
          Quantidade total de membros e secretários da sua igreja
        </CardDescription>
      </CardHeader>
      {data[0].members === 0 ? (
        <div className="w-full py-6 text-center text-muted-foreground font-medium flex flex-col items-center justify-center gap-y-4">
          <p>Nenhum membro criado até o momento</p>
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
                dataKey="members"
                nameKey="name"
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
                            {totalMembers.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
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
