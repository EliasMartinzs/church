import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { CiCalendar } from "react-icons/ci";

import {
  getMeetingsGroupedByMonth,
  getTodayMeetings,
} from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { getSecretary } from "@/actions/secretary";
import { MeetingCard } from "@/components/global/meeting-card";
import { TabHistoricCell } from "@/components/admin/tab-historic-cell";
import { getCellMembersWithAttendanceRate } from "@/actions/global";
import { AttendenceRateMemberChart } from "@/components/global/attendence-rate-member-chart";

export default async function MeetingsPage() {
  const user = await getSecretary();

  const cellId = user?.cell?.id!;

  const [meetingsMonth, meetingsToday, dataChart] = await Promise.all([
    getMeetingsGroupedByMonth(cellId),
    getTodayMeetings(cellId),
    getCellMembersWithAttendanceRate(user?.cell?.id!),
  ]);

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title text="Encontros" href="/secretario" />

      <AttendenceRateMemberChart data={dataChart!} />

      <div className="space-y-6">
        <Tabs defaultValue="upcomming">
          <TabsList>
            <TabsTrigger value="upcomming">Proximos</TabsTrigger>
            <TabsTrigger value="historic">Historico</TabsTrigger>
          </TabsList>
          <TabsContent value="upcomming" className="mt-10 space-y-8">
            <div className="lg:w-1/4">
              <RedirectButton
                href={`/secretario/meeting/create/${user?.cell?.id!}`}
                name="Novo encontro"
                icon={CiCalendar}
              />
            </div>

            <div className="flex items-start justify-center flex-col gap-3">
              {meetingsToday.length !== 0 && (
                <div className="text-2xl font-bold">Encontros de Hoje</div>
              )}
              <div className="max-lg:w-full flex flex-col lg:grid lg:grid-cols-2 gap-3">
                {meetingsToday.map((meeting) => {
                  return (
                    <MeetingCard
                      href="/secretario/meeting/"
                      meeting={meeting}
                      key={meeting.id}
                    />
                  );
                })}
              </div>
            </div>

            {meetingsMonth?.length === 0 ? (
              <div className="w-full items-center justify-center text-center flex flex-col gap-y-4 text-muted-foreground mt-32">
                <Calendar className="size-14" />
                <p>Nenhum encontro marcado até o momento!</p>
              </div>
            ) : (
              meetingsMonth?.map(({ month, meetings }, index) => (
                <div
                  key={index}
                  className="flex items-start justify-center flex-col gap-3"
                >
                  <div className="text-2xl font-bold capitalize">{month}</div>
                  <div className="max-lg:w-full flex flex-col lg:grid lg:grid-cols-2 gap-3">
                    {meetings.map((meeting) => (
                      <MeetingCard
                        href="/secretario/meeting/"
                        meeting={meeting}
                        key={meeting.id}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="historic">
            <TabHistoricCell cellId={user?.cell?.id!} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
