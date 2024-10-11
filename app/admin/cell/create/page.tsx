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
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin/cells" text="Nova célula" />

      <div className="w-full">
        <NewCellForm
          churchId={data.churchId as string}
          secretaries={data.secretaries!}
        />
      </div>
    </div>
  );
}
