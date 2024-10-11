import { getAdmin, getChurch } from "@/actions/admin";
import { NewSecretaryForm } from "@/components/admin/new-secretary-form";
import { DivWrapper } from "@/components/global/div-wrapper";
import { Title } from "@/components/global/title";

export default async function CreateSecretary() {
  const [data, user] = await Promise.all([getChurch(), getAdmin()]);

  return (
    <DivWrapper>
      <Title href="/admin/cells" text="Novo Secretario" />

      <div className="w-full">
        <NewSecretaryForm
          churchId={data?.id as string}
          userId={user?.id as string}
        />
      </div>
    </DivWrapper>
  );
}
