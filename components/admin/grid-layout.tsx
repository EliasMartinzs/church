"use client";

import { TotalChart } from "../global/total-chart";
import { NewMembersPerMonthChart } from "./new-members-per-month-chart";
import { AttendaceStatusChart } from "./attendance-status-chart";
import { MeetingsChart } from "./meetings-chart";
import { TotalCellsChart } from "./total-cells-chart";
import { TotalPrayerByCellsChart } from "./total-prayer-by-cells-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cell,
  Meeting,
  MeetingResponse,
  Member,
  Secretary,
} from "@prisma/client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { cn, getMonthName } from "@/lib/utils";
import { Clock, MapPin, MoveRight } from "lucide-react";

interface Secretaries extends Secretary {
  cell: Cell | null;
}

interface Members extends Member {
  cell: Cell | null;
}

interface Meetings extends Meeting {
  participants: MeetingResponse[];
}

type Props = {
  statisticChurch: {
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
  allSecretaries: Secretaries[];
  allMembers: Members[];
  allUpcommingMeetings: Meetings[];
};

const meetings = [
  {
    id: "1",
    title: "Reunião de Planejamento",
    description: "Planejamento das atividades do mês.",
    date: new Date("2024-10-23"),
    startTime: "10:00",
    endTime: "11:00",
    location: "Sala de Conferências",
    host: "João Silva",
    status: "PENDING",
    reminder: 30,
    cellId: "cell1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Reunião de Equipe",
    description: null,
    date: new Date("2024-10-24"),
    startTime: "14:00",
    endTime: "15:00",
    location: "Sala 202",
    host: "Maria Oliveira",
    status: "PENDING",
    reminder: 15,
    cellId: "cell2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Reunião de Feedback",
    description: "Reunião para discutir feedbacks dos membros.",
    date: new Date("2024-10-25"),
    startTime: "16:00",
    endTime: "17:00",
    location: "Sala de Reuniões",
    host: "Carlos Pereira",
    status: "PENDING",
    reminder: null,
    cellId: "cell3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Reunião de Treinamento",
    description: "Treinamento sobre novas ferramentas.",
    date: new Date("2024-10-26"),
    startTime: "09:00",
    endTime: "10:30",
    location: "Auditório",
    host: "Ana Souza",
    status: "PENDING",
    reminder: 60,
    cellId: "cell4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Reunião de Encerramento",
    description: null,
    date: new Date("2024-10-27"),
    startTime: "15:00",
    endTime: "16:00",
    location: "Sala 101",
    host: "Pedro Lima",
    status: "PENDING",
    reminder: null,
    cellId: "cell5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const GridLayoutChart = ({
  attendanceStatus,
  statisticChurch,
  meetingsPerDay,
  membersPerMonth,
  cellsWithMemberCount,
  prayersByCells,
  allSecretaries,
  allMembers,
  allUpcommingMeetings,
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <Tabs defaultValue="charts" className="lg:hidden">
        <TabsList>
          <TabsTrigger value="charts">Dados</TabsTrigger>
          <TabsTrigger value="activity">Atalhos</TabsTrigger>
        </TabsList>
        <TabsContent value="charts">
          <div className="grid grid-cols-1 gap-3">
            <TotalCellsChart data={cellsWithMemberCount!} />
            <TotalChart
              data={[
                {
                  members: statisticChurch?.totalMembers!,
                  fill: "hsl(var(--chart-1))",
                },
              ]}
              title="Membros e Secretários"
              description="Quantidade total de membros e secretários da sua igreja"
              noLenghtMessage="Nenhum membro ou secretário criado até o momento"
            />
            <TotalPrayerByCellsChart data={prayersByCells!} />

            <NewMembersPerMonthChart data={membersPerMonth} />

            <AttendaceStatusChart data={attendanceStatus} />
            <MeetingsChart data={meetingsPerDay} />
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col gap-5 card p-6">
              <div className="space-y-4">
                <Link href="/admin/cells" className="font-bold">
                  Secretários
                </Link>

                <div className="w-full flex items-center gap-x-3 overflow-x-auto hidden-scrollbar">
                  {allSecretaries.map((secretary) => (
                    <div
                      className="flex-shrink-0 size-12 relative"
                      key={secretary.id}
                    >
                      <Image
                        src={secretary?.photoUrl || "/noAvatar.png"}
                        alt={secretary?.fullName!}
                        fill
                        className="object-cover rounded-full size-12"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Link href="/admin/members" className="font-bold">
                  Membros
                </Link>

                <div className="w-full flex items-center gap-x-3 overflow-x-auto hidden-scrollbar">
                  {allMembers.map((secretary) => (
                    <div
                      className="flex-shrink-0 size-12 relative"
                      key={secretary.id}
                    >
                      <Image
                        src={secretary?.photoUrl || "/noAvatar.png"}
                        alt={secretary?.fullName!}
                        fill
                        className="object-cover rounded-full size-12"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 card p-6">
              <div className="w-full flex items-center justify-between">
                <p>Próximas Reuniões</p>
                <span>
                  <MoveRight className="size-5" />
                </span>
              </div>

              <div className="w-full flex items-center gap-x-3 overflow-x-auto hidden-scrollbar">
                {allUpcommingMeetings.map((meeting) => (
                  <CardMeeting meeting={meeting} key={meeting.id} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="max-lg:hidden col-span-2 grid grid-cols-2 gap-3">
        <TotalCellsChart data={cellsWithMemberCount!} />
        <TotalChart
          data={[
            {
              members: statisticChurch?.totalMembers!,
              fill: "hsl(var(--chart-2))",
            },
          ]}
          title="Membros e Secretários"
          description="Quantidade total de membros e secretários da sua igreja"
          noLenghtMessage="Nenhum membro criado até o momento"
        />
        <TotalPrayerByCellsChart data={prayersByCells!} />

        <NewMembersPerMonthChart data={membersPerMonth} />

        <AttendaceStatusChart data={attendanceStatus} />
        <MeetingsChart data={meetingsPerDay} />
      </div>

      <div className="col-span-1 max-lg:hidden">
        <div className="card flex flex-col gap-y-8 p-6">
          <div className="space-y-4">
            <Link href="/admin/cells" className="font-bold">
              Secretários
            </Link>

            <div className="w-full flex items-center gap-x-3 overflow-x-auto hidden-scrollbar">
              {allSecretaries.map((secretary) => (
                <div
                  className="flex-shrink-0 size-12 relative"
                  key={secretary.id}
                >
                  <Image
                    src={secretary?.photoUrl || "/noAvatar.png"}
                    alt={secretary?.fullName!}
                    fill
                    className="object-cover rounded-full size-12"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator className="opacity-25" />

          <div className="space-y-4">
            <Link href="/admin/members" className="font-bold">
              Membros
            </Link>

            <div className="w-full flex items-center gap-x-3 overflow-x-auto hidden-scrollbar">
              {allMembers.map((secretary) => (
                <div
                  className="flex-shrink-0 size-12 relative"
                  key={secretary.id}
                >
                  <Image
                    src={secretary?.photoUrl || "/noAvatar.png"}
                    alt={secretary?.fullName!}
                    fill
                    className="object-cover rounded-full size-12"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator className="opacity-25" />

          <div className="space-y-4">
            <div className="w-full flex items-center justify-between">
              <p>Próximas Reuniões</p>
              <span>
                <MoveRight className="size-5" />
              </span>
            </div>

            <div className="w-full flex items-center gap-x-3 overflow-x-auto hidden-scrollbar">
              {allUpcommingMeetings.map((meeting) => (
                <CardMeeting meeting={meeting} key={meeting.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardMeeting: React.FC<{ meeting: Meeting }> = ({ meeting }) => {
  return (
    <div className="w-[95%] p-6 flex flex-shrink-0 items-center justify-between gap-x-6 text-sm transition-transform duration-300 ease-in-out overflow-hidden relative group border rounded-2xl text-muted-foreground">
      <div className="flex flex-col items-center">
        <h5 className="font-semibold text-2xl">
          {getMonthName(meeting?.date?.getMonth() + 1).slice(0, 3)}
        </h5>
        <h5 className="text-2xl">{meeting?.date?.getDate()}</h5>
      </div>

      <div className="h-10 w-[1px] bg-muted-foreground" />

      <div className="flex flex-col max-lg:items-center justify-center gap-3 text-muted-foreground">
        <div className="hidden lg:flex items-center gap-x-3">
          <Clock />
          <span>{meeting?.startTime}</span>
          <span>-</span>
          <span>{meeting?.endTime}</span>
        </div>

        <div className="lg:hidden flex items-center gap-x-2">
          <Clock className="size-3" />
          <div className="flex flex-col items-center">
            <span>{meeting?.startTime}</span>
            <span>{meeting?.endTime}</span>
          </div>
        </div>
      </div>

      <div className="h-10 w-[1px] bg-muted-foreground" />

      <div className="flex items-center gap-x-3">
        <MapPin /> <span className="">{meeting?.location}</span>
      </div>

      <div className="absolute inset-0 bg-accent lg:bg-background p-6 rounded-2xl transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0">
        <div className="w-full h-full flex flex-1 items-center justify-center gap-x-10">
          <Link
            href={`/admin/cell/meeting/${meeting.id}`}
            className={cn(
              "hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            )}
          >
            Detalhes do encontro
          </Link>
        </div>
      </div>
    </div>
  );
};
