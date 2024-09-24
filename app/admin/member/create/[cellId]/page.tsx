import { getChurch } from "@/actions/church";
import { MemberForm } from "@/components/admin/member-form";
import { DivWrapper } from "@/components/global/div-wrapper";
import { Title } from "@/components/global/title";

async function getData() {
  const church = await getChurch();

  return church;
}

type Props = {
  params: { cellId: string };
};

export default async function MemberCreate({ params: { cellId } }: Props) {
  const church = await getData();
  const findedCell = church?.cells.find((c) => c.id === cellId);

  return (
    <DivWrapper>
      <Title
        text={`Novo Membro ${findedCell ? `para a ${findedCell.name}` : ""}`}
      />

      <MemberForm
        cells={church?.cells!}
        churchId={church?.id as string}
        cellId={cellId}
      />
    </DivWrapper>
  );
}
