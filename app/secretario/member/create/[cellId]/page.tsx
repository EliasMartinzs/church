import { getSecretary } from "@/actions/secretary";
import { NewMemberForm } from "@/components/admin/new-member-form";
import { Title } from "@/components/global/title";

type Props = {
  params: { cellId: string };
};

export default async function CreateMemberPage({ params: { cellId } }: Props) {
  const user = await getSecretary();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/secretario/members" text="Novo membro" />

        <NewMemberForm
          href="/secretario/members"
          cellId={cellId}
          churchId={user?.churchId!}
        />
      </div>
    </div>
  );
}
