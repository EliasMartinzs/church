import {
  finalizeMeeting,
  getAllParticipantsConfirmedMeetingByIds,
  MeetingWithParticipants,
} from "@/actions/meetings";
import { cn, getMonthName } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdDone } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { ReusableTooltip } from "./reusable-tooltip";

import { DeleteMeeting } from "../admin/delete-meeting";
import { AlertDialogTrigger } from "../ui/alert-dialog";

type Props = {
  meeting: MeetingWithParticipants;
  href: string;
  profile: "admin" | "secretario" | "member";
  text: string;
  action: (formData: FormData) => Promise<void>;
  toastMessage?: string;
};

export const MeetingCard = async ({
  meeting: { endTime, location, title, date, participants, startTime, id },
  href,
  profile,
  text,
  action,
  toastMessage,
}: Props) => {
  const participantsConfirmed = await getAllParticipantsConfirmedMeetingByIds(
    participants
  );

  return (
    <div className="max-lg:w-full lg:w-[896px] lg:max-w-3xl card p-6 lg:p-8 flex items-center max-lg:justify-between gap-x-6 text-sm lg:gap-x-14 rounded-2xl transition-transform duration-300 ease-in-out overflow-hidden relative group">
      <div className="flex flex-col items-center flex-1">
        <h5 className="font-semibold text-2xl">
          {getMonthName(date?.getMonth() + 1).slice(0, 3)}
        </h5>
        <h5 className="text-2xl">{date?.getDate()}</h5>
      </div>

      <div className="h-10 w-[1px] bg-muted-foreground" />

      <div className="flex flex-col max-lg:items-center justify-center gap-3 text-muted-foreground flex-1">
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

      <div className="space-y-3 flex-1">
        <span className="text-muted-foreground text-xs lg:text-base">
          {title}
        </span>
        <div className="flex items-center">
          {participantsConfirmed
            .filter((_, i) => i < 5)
            .map(({ photoUrl }, index) => (
              <Image
                key={index}
                src={photoUrl || "/noAvatar.png"}
                width={32}
                height={32}
                alt=""
                className={`rounded-full object-cover size-8 border border-muted-foreground ${
                  index === 0 ? "" : "-ml-3"
                }`}
              />
            ))}
        </div>
      </div>

      <div className="absolute inset-0 card p-6 rounded-2xl transform -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0">
        <div className="w-full h-full flex flex-1 items-center justify-center gap-x-10">
          <Link
            href={href}
            className={cn(
              "hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
            )}
          >
            Detalhes do encontro
          </Link>

          <form action={action}>
            <input type="hidden" value={id} name="meetingId" />

            <ReusableTooltip
              text={text}
              toastMessage={toastMessage}
              icon={
                <MdDone
                  type="submit"
                  className="size-7 cursor-pointer hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
                />
              }
            />
          </form>

          {profile !== "member" && (
            <DeleteMeeting
              meetingId={id}
              trigger={
                <AlertDialogTrigger>
                  <ReusableTooltip
                    icon={
                      <IoTrashBinOutline className="size-7 cursor-pointer hover:underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors" />
                    }
                    text="Encontro encerrado"
                  />
                </AlertDialogTrigger>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
