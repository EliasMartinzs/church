import { NewMeetingForm } from "@/components/admin/new-meeting-form";
import { Title } from "@/components/global/title";
import { redirect } from "next/navigation";

type Props = {
  params: { cellId: string };
};

export default async function CreateMeetingPage({ params: { cellId } }: Props) {
  if (!cellId) {
    redirect("/secretario");
  }

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/secretario/meetings" text="Novo Encontro" />

        <NewMeetingForm href={`/admin/cell/${cellId}`} cellId={cellId} />
      </div>
    </div>
  );
}
