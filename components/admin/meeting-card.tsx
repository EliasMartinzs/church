import {
  getAllParticipantsConfirmedMeetingByIds,
  MeetingWithParticipants,
} from "@/actions/meetings";
import { cn, getMonthName } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  meeting: MeetingWithParticipants;
};

export const MeetingCard = async ({
  meeting: { endTime, location, title, date, participants, startTime, id },
}: Props) => {
  const participantsConfirmed = await getAllParticipantsConfirmedMeetingByIds(
    participants
  );

  return (
    <Link
      href={`/admin/cell/meeting/${id}`}
      className="max-lg:w-full lg:w-[896px] lg:max-w-4xl bg-accent lg:bg-background p-6 lg:p-8 flex items-center max-lg:justify-between gap-x-6 text-sm lg:gap-x-14 rounded-2xl transition-colors max-lg:overflow-x-auto hover:border border-muted-foreground overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <h5 className="font-semibold text-2xl">
          {getMonthName(date?.getMonth() + 1).slice(0, 3)}
        </h5>
        <h5 className="text-2xl">{date?.getDate()}</h5>
      </div>

      <div className="h-10 w-[1px] bg-muted-foreground" />

      <div className="flex flex-col gap-3 text-muted-foreground">
        <div className="hidden lg:flex items-center gap-x-3">
          <Clock />

          <span>{startTime}</span>
          <span>-</span>
          <span>{endTime}</span>
        </div>

        <div className="lg:hidden flex items-center gap-x-2">
          <Clock className="size-3" />

          <div className="flex flex-col items-center">
            <span>{startTime}</span>
            <span>{endTime}</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-x-3">
          <MapPin /> <span className="">{location}</span>
        </div>
      </div>

      <div className="h-10 w-[1px] bg-muted-foreground" />

      <div className="space-y-3">
        <span className="text-muted-foreground text-xs lg:text-base">
          {title}
        </span>
        <div className="flex items-center">
          {participantsConfirmed
            .filter((_, i) => i < 5)
            .map(({ photoUrl }, index) => (
              <Image
                key={index}
                src={photoUrl as string}
                width={40}
                height={40}
                alt=""
                className={cn(
                  "rounded-full object-cover size-10 border border-muted-foreground",
                  index === 0 ? "" : `-ml-3`
                )}
              />
            ))}
        </div>
      </div>
    </Link>
  );
};
