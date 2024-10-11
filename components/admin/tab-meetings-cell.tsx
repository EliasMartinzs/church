import { getMeetingsGroupedByMonth } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingCard } from "./meeting-card";
import { Calendar } from "lucide-react";
import { RedirectButton } from "../global/redirect-button";
import { CiCalendar } from "react-icons/ci";
import { TabHistoricCell } from "./tab-historic-cell";

type Props = {
  cellId: string;
};

export const TabMeetingsCell = async ({ cellId }: Props) => {
  const data = await getMeetingsGroupedByMonth(cellId);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcomming">
        <TabsList>
          <TabsTrigger value="upcomming">Proximos</TabsTrigger>
          <TabsTrigger value="historic">Historico</TabsTrigger>
        </TabsList>
        <TabsContent value="upcomming" className="mt-10 space-y-8">
          <div className="lg:w-1/4">
            <RedirectButton
              href={`/admin/cell/meeting/create/${cellId}`}
              name="Novo encontro"
              icon={CiCalendar}
            />
          </div>
          {data?.length === 0 ? (
            <div className="w-full items-center justify-center text-center flex flex-col gap-y-4 text-muted-foreground mt-32">
              <Calendar className="size-14" />
              <p>Nenhum encontro marcado até o momento!</p>
            </div>
          ) : (
            data?.map(({ month, meetings }, index) => (
              <div
                key={index}
                className="flex items-start justify-center flex-col gap-3"
              >
                <div className="text-4xl font-bold">{month}</div>
                {meetings.map((meeting) => (
                  <MeetingCard meeting={meeting} key={meeting.id} />
                ))}
              </div>
            ))
          )}
        </TabsContent>
        <TabsContent value="historic">
          <TabHistoricCell cellId={cellId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
