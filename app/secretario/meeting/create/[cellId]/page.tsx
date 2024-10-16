import { NewMeetingForm } from "@/components/admin/new-meeting-form";
import { redirect } from "next/navigation";

type Props = {
  params: { cellId: string };
};

export default async function CreateMeetingPage({ params: { cellId } }: Props) {
  if (!cellId) {
    redirect("/secretario");
  }

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <div className="w-full">
        <NewMeetingForm cellId={cellId} />
      </div>
    </div>
  );
}
