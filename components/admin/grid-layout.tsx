"use client";

import { getAdmin } from "@/actions/admin";
import { Prisma } from "@prisma/client";
import React from "react";
import { TotalMembersChart } from "./total-members-chart";
import { NewMembersPerMonthChart } from "./new-members-per-month-chart";
import { AttendaceStatusChart } from "./attendance-status-chart";
import { MeetingsChart } from "./meetings-chart";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ptBR } from "date-fns/locale";

type Props = {
  members: {
    id: string;
    totalMembers: number;
    totalCells: number;
    totalMeetings: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  membersPerMonth: { month: string; newMembers: number }[];
  membersPerDay: {
    date: string;
    meetingsCount: number;
  }[];
  attendanceStatus: {
    attendanceStatus: string;
    count: number;
    fill: string;
  }[];
};

export const GridLayoutChart = ({
  attendanceStatus,
  members,
  membersPerDay,
  membersPerMonth,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <TotalMembersChart
          data={[
            {
              members: members?.totalMembers!,
              fill: "hsl(var(--chart-1))",
            },
          ]}
        />

        <NewMembersPerMonthChart data={membersPerMonth} />

        <AttendaceStatusChart data={attendanceStatus} />

        <Card className="grid place-items-center">
          <Calendar mode="single" locale={ptBR} />
        </Card>
      </div>

      <MeetingsChart data={membersPerDay} />
    </div>
  );
};
