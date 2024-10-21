import {
  getAllPrayerRequestsByStatus,
  getPrayerRequestIncreasePercentage,
  getPrayerRequestStatusByCell,
} from "@/actions/global";
import { PrayerRequestCard } from "@/components/global/prayer-requests-card";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { PiHandsPrayingFill } from "react-icons/pi";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getSecretary } from "@/actions/secretary";
import { StatusCountChart } from "@/components/global/status-count-";

export default async function PrayersPage() {
  const secretary = await getSecretary();

  const [prayerStatus, countStatusRequest, percetageIncrease] =
    await Promise.all([
      getAllPrayerRequestsByStatus(),
      getPrayerRequestStatusByCell(secretary?.cell?.id!),
      getPrayerRequestIncreasePercentage(secretary?.cell?.id!),
    ]);

  const { all, answered, inProgress, pending } = prayerStatus;

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin" text="Oração" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={PiHandsPrayingFill}
          name="Nova oração"
          href="/secretario/prayer/create"
        />
      </div>

      <div>
        <StatusCountChart
          statusCount={countStatusRequest}
          percetageIncrease={percetageIncrease}
        />
      </div>

      <Tabs defaultValue="all" className="w-full space-y-8">
        <TabsList className="max-lg:w-full justify-evenly lg:bg-background">
          <TabsTrigger className="lg:data-[state=active]:bg-accent" value="all">
            Todos
          </TabsTrigger>
          <TabsTrigger
            className="lg:data-[state=active]:bg-accent"
            value="inProgress"
          >
            Em progresso
          </TabsTrigger>
          <TabsTrigger
            className="lg:data-[state=active]:bg-accent"
            value="pending"
          >
            Pendente
          </TabsTrigger>
          <TabsTrigger
            className="lg:data-[state=active]:bg-accent"
            value="answered"
          >
            Respondidas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div
            className={cn(
              all.length === 0
                ? "flex"
                : "grid grid-cols-1 lg:grid-cols-4 gap-2"
            )}
          >
            {all.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração criada até o momento!
              </div>
            ) : (
              all.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="inProgress">
          <div
            className={cn(
              inProgress.length === 0
                ? "flex"
                : "grid grid-cols-1 lg:grid-cols-4 gap-2"
            )}
          >
            {inProgress.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração criada até o momento!
              </div>
            ) : (
              inProgress.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div
            className={cn(
              pending.length === 0
                ? "flex"
                : "grid grid-cols-1 lg:grid-cols-4 gap-2"
            )}
          >
            {pending.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração criada até o momento!
              </div>
            ) : (
              pending.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                />
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="answered">
          <div
            className={cn(
              answered.length === 0
                ? "flex"
                : "grid grid-cols-1 lg:grid-cols-4 gap-2"
            )}
          >
            {answered.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração criada até o momento!
              </div>
            ) : (
              answered.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
