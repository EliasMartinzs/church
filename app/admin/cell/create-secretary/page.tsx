import { getAdmin, getChurch } from "@/actions/admin";
import { NewSecretaryForm } from "@/components/admin/new-secretary-form";
import { Title } from "@/components/global/title";

export default async function CreateSecretary() {
  const [data, user] = await Promise.all([getChurch(), getAdmin()]);

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/admin/cells" text="Novo Secretario" />

        <NewSecretaryForm
          churchId={data?.id as string}
          userId={user?.id as string}
        />
      </div>
    </div>
  );
}
