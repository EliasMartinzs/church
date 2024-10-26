import { getPrayerRequestByMember } from "@/actions/member";
import { PrayerRequestCard } from "@/components/global/prayer-requests-card";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { cn } from "@/lib/utils";
import { PiHandsPrayingFill } from "react-icons/pi";

export default async function PrayersPage() {
  const prayerRequestByMember = await getPrayerRequestByMember();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <Title href="/member" text="Oração" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={PiHandsPrayingFill}
          name="Requisitar uma oração"
          href="/member/prayer/create"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-2xl">Meus pedidos de orações</h4>

        <div>
          {prayerRequestByMember.length === 0 ? (
            <div className="w-full flex items-center justify-center">
              <p className="text-muted-foreground mt-2">
                Nenhuma oração requisitada até o momento
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {prayerRequestByMember.map((prayer, index) => (
                <PrayerRequestCard
                  prayer={prayer}
                  index={index}
                  key={prayer?.id}
                  profile="member"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
