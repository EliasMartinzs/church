import { getSecretary } from "@/actions/secretary";
import { NewMemberForm } from "@/components/admin/new-member-form";
import { Title } from "@/components/global/title";

type Props = {
  params: { cellId: string };
};

export default async function CreateMemberPage({ params: { cellId } }: Props) {
  const user = await getSecretary();

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin/members" text="Novo membro" />

      <div className="w-full">
        <NewMemberForm cellId={cellId} churchId={user?.churchId!} />
      </div>
    </div>
  );
}
