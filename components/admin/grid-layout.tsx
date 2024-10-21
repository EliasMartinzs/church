"use client";

import { TotalMembersChart } from "./total-members-chart";
import { NewMembersPerMonthChart } from "./new-members-per-month-chart";
import { AttendaceStatusChart } from "./attendance-status-chart";
import { MeetingsChart } from "./meetings-chart";
import { TotalCellsChart } from "./total-cells-chart";
import { TotalPrayerByCellsChart } from "./total-prayer-by-cells-chart";

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
  meetingsPerDay: {
    date: string;
    meetingsCount: number;
  }[];
  attendanceStatus: {
    attendanceStatus: string;
    count: number;
    fill: string;
  }[];
  cellsWithMemberCount:
    | {
        cellName: string;
        totalMembers: number;
      }[]
    | undefined;
  prayersByCells:
    | {
        cellName: string | undefined;
        totalPrayer: number;
      }[]
    | undefined;
};

export const GridLayoutChart = ({
  attendanceStatus,
  members,
  meetingsPerDay,
  membersPerMonth,
  cellsWithMemberCount,
  prayersByCells,
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <TotalCellsChart data={cellsWithMemberCount!} />
      <TotalMembersChart
        data={[
          {
            members: members?.totalMembers!,
            fill: "hsl(var(--chart-1))",
          },
        ]}
      />
      <TotalPrayerByCellsChart data={prayersByCells!} />

      <NewMembersPerMonthChart data={membersPerMonth} />

      <AttendaceStatusChart data={attendanceStatus} />
      <MeetingsChart data={meetingsPerDay} />
    </div>
  );
};
