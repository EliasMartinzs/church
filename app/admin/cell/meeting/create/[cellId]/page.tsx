import { NewMeetingForm } from "@/components/admin/new-meeting-form";
import { Title } from "@/components/global/title";
import { redirect } from "next/navigation";

type Props = {
  params: { cellId: string };
};

export default async function CreateMeetingPage({ params: { cellId } }: Props) {
  if (!cellId) {
    redirect("/admin/cells");
  }

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl lg:p-8 card gap-y-8">
      <Title href="/admin/cells" text="Novo encontro" />

      <div className="w-full">
        <NewMeetingForm href="/secretario/meetings" cellId={cellId} />
      </div>
    </div>
  );
}
