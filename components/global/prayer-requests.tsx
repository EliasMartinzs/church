import { getAllPrayerRequests } from "@/actions/global";
import { Prisma } from "@prisma/client";

type Props = {
  prayerRequest: Prisma.PromiseReturnType<typeof getAllPrayerRequests>;
};

export const PrayerRequest = ({ prayerRequest }: Props) => {
  return <div>PrayerRequest</div>;
};
