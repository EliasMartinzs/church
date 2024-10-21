import {
  getAllParticipantsConfirmedMeetingByIds,
  getMeetingById,
} from "@/actions/meetings";
import { ParticipantCard } from "@/components/admin/participant-card";
import NotFound from "@/components/global/not-found";
import { Title } from "@/components/global/title";
import { MeetingResponse } from "@prisma/client";
import { Clock, MapPin, Trash2, Users, X } from "lucide-react";

import { DeleteMeeting } from "@/components/admin/delete-meeting";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

type Props = {
  params: { meetingId: string };
};

export default async function Meeting({ params: { meetingId } }: Props) {
  const data = await getMeetingById(meetingId as string);
  const participants = await getAllParticipantsConfirmedMeetingByIds(
    data?.participants as MeetingResponse[]
  );

  if (!data) {
    return <NotFound>Tente novamente</NotFound>;
  }

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-6">
      <Title href="/admin/cells" text="" />

      <h1 className="text-3xl font-bold">{data?.title}</h1>

      <p className="capitalize leading-7 text-lg font-light">
        {data.description}
      </p>

      <div className="flex gap-x-2 text-lg">
        <p className="font-medium">Anfitriao:</p>{" "}
        <p className="capitalize text-muted-foreground"> {data.host}</p>
      </div>
      <div className="flex gap-x-2 text-lg">
        <p className="font-medium">Local:</p>
        <p className="flex items-center gap-x-1 text-muted-foreground">
          <MapPin /> {data.location}
        </p>
      </div>
      <div className="flex gap-x-2 text-lg">
        <p className="font-medium">Horario:</p>
        <p className="flex items-center gap-x-1 text-muted-foreground">
          <Clock /> {data.startTime} - {data.endTime}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <h6 className="text-xl font-semibold">Participantes confirmados</h6>

        <div
          className={cn(
            "flex flex-col lg:grid grid-cols-4 gap-2",
            participants.length === 0 && "w-full lg:grid-cols-1"
          )}
        >
          {participants.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-5 text-muted-foreground mt-10">
              <Users className="size-20" />
              <p className="text-lg">
                Nenhum participante confimado até o momento!
              </p>
            </div>
          ) : (
            participants.map((participant) => (
              <ParticipantCard participant={participant} key={participant.id} />
            ))
          )}
        </div>
      </div>

      <Separator className="my-10" />

      <div className="w-full lg:w-1/4 border border-red-500 text-red-500 rounded-3xl p-4 flex flex-col gap-y-3">
        <p className="text-lg font-light">Zona de perigo</p>

        <DeleteMeeting
          meetingId={meetingId}
          trigger={
            <AlertDialogTrigger className="border w-full p-1 rounded-3xl text-foreground border-muted-foreground">
              Deletar encontro
            </AlertDialogTrigger>
          }
        />
      </div>
    </div>
  );
}
