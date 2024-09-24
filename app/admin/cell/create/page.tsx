import { getSecretariesFromChurch } from "@/actions/church";
import { NewCellForm } from "@/components/admin/new-cell-form";
import { DivWrapper } from "@/components/global/div-wrapper";
import { Title } from "@/components/global/title";

async function getData() {
  try {
    const data = await getSecretariesFromChurch();

    if (!data) {
      return { data: null, message: "Nenhum secretario criado até o momento" };
    }

    return { data: data, message: null };
  } catch (error) {}
}

export default async function CreateCell() {
  const data = await getData();

  return (
    <DivWrapper>
      <Title href="/admin/cells" text="Nova célula" />

      <div className="w-full">
        <NewCellForm
          churchId={data?.data?.churchId as string}
          secretaries={data?.data?.secretaries!}
        />
      </div>
    </DivWrapper>
  );
}
