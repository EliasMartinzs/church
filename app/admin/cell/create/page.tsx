import { getChurch } from "@/actions/admin";
import { NewCellForm } from "@/components/admin/new-cell-form";
import { Title } from "@/components/global/title";

async function getData() {
  const data = await getChurch();

  if (!data) {
    return { data: null, message: "Nenhum secretario criado até o momento" };
  }

  const secretaries = data.secretaries
    .filter((sec) => sec.cell === null)
    .map((sec) => ({
      id: sec.id,
      name: sec.fullName,
    }));

  return {
    churchId: data.id,
    secretaries: secretaries,
  };
}

export default async function CreateCell() {
  const data = await getData();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/admin/cells" text="Nova célula" />

        <NewCellForm
          churchId={data.churchId as string}
          secretaries={data.secretaries!}
        />
      </div>
    </div>
  );
}
