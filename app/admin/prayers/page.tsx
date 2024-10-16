import { getAllPrayerRequests } from "@/actions/global";
import { PrayerRequest } from "@/components/global/prayer-requests";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { PiHandsPrayingFill } from "react-icons/pi";

export default async function PrayersPage() {
  const prayerRequests = await getAllPrayerRequests();

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin" text="Oração" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={PiHandsPrayingFill}
          name="Nova oração"
          href="/admin/prayer/create"
        />
      </div>

      <PrayerRequest prayerRequest={prayerRequests} />
    </div>
  );
}
