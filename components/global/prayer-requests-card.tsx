import { prayerIcons } from "@/constants";
import {
  Cell,
  Member,
  PrayerRequest,
  PrayerRequest as PrayerRequestPrisma,
} from "@prisma/client";
import { IconType } from "react-icons/lib";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { MdDone } from "react-icons/md";
import { cn, formatDateToBr } from "@/lib/utils";
import { ConfirmPrayerStatusRequest } from "./confirm-status-prayer-request";

interface Prayer extends PrayerRequest {
  cell?: Cell | null;
  member: Member;
}

type Props = {
  prayer: Prayer;
  index: number;
  profile: "admin" | "secretary" | "member";
};

export const PrayerRequestCard = ({ prayer, index, profile }: Props) => {
  const Icon = prayerIcons[prayer.category];

  return (
    <div
      key={prayer.id}
      className={cn(
        "w-full p-4 shadow-3xl rounded-2xl transition-transform duration-300 ease-in-out overflow-hidden relative group card"
      )}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-3">
          <Avatar className="size-8">
            <AvatarImage
              src={prayer?.member?.photoUrl || "/noAvatar.png"}
              alt={prayer?.member?.fullName!}
            />
          </Avatar>
          <p>{prayer.member?.fullName}</p>
        </div>

        <p>{prayer.title}</p>
        <small className="text-muted-foreground">{prayer.description}</small>

        <small>{formatDateToBr(prayer?.createdAt)}</small>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-x-1">
            Respondida:
            {prayer.isAnswered ? (
              <MdDone className="size-6" />
            ) : (
              <X className="size-6" />
            )}
          </p>

          <Icon className="size-6" />
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 flex items-center justify-center card">
        <ConfirmPrayerStatusRequest id={prayer.id} profile={profile} />
      </div>
    </div>
  );
};
