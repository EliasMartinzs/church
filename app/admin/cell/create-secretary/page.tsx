import { getUser } from "@/actions/users";
import { NewSecretaryForm } from "@/components/admin/new-secretary-form";
import { DivWrapper } from "@/components/global/div-wrapper";
import { Title } from "@/components/global/title";

async function getData() {
  const data = await getUser();

  if (!data) return;

  return data?.churchId;
}

export default async function CreateSecretary() {
  const churchId = await getData();

  return (
    <DivWrapper>
      <Title href="/admin/cells" text="Novo Secretario" />

      <div className="w-full">
        <NewSecretaryForm churchId={churchId as string} />
      </div>
    </DivWrapper>
  );
}
