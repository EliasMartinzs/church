import { getAllPrayerRequestsByStatus } from "@/actions/global";
import { PrayerRequestCard } from "@/components/global/prayer-requests-card";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { PiHandsPrayingFill } from "react-icons/pi";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default async function PrayersPage() {
  const { all, inProgress, pending, answered } =
    await getAllPrayerRequestsByStatus();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <Title href="/admin" text="Oração" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={PiHandsPrayingFill}
          name="Nova oração"
          href="/admin/prayer/create"
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
                : "grid grid-cols-2 lg:grid-cols-4 gap-2"
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
                  profile="admin"
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
                : "grid grid-cols-2 lg:grid-cols-4 gap-2"
            )}
          >
            {inProgress.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração em progresso até o momento!
              </div>
            ) : (
              inProgress.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                  profile="admin"
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
                : "grid grid-cols-2 lg:grid-cols-4 gap-2"
            )}
          >
            {pending.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração pendente até o momento!
              </div>
            ) : (
              pending.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                  profile="admin"
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
                : "grid grid-cols-2 lg:grid-cols-4 gap-2"
            )}
          >
            {answered.length === 0 ? (
              <div className="w-full text-center text-muted-foreground text-xl">
                Nenhuma oração respondida até o momento!
              </div>
            ) : (
              answered.map((prayer, index) => (
                <PrayerRequestCard
                  key={prayer.id}
                  prayer={prayer}
                  index={index}
                  profile="admin"
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
