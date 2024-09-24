import { TableCells } from "@/components/admin/table-cells";
import { DivWrapper } from "@/components/global/div-wrapper";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { LiaUsersSolid } from "react-icons/lia";

export default function Cells() {
  return (
    <DivWrapper className="mt-5 ">
      <Title href="/admin" text="Células" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={LiaUsersSolid}
          name="Novo secretario"
          href="/admin/cell/create-secretary"
        />

        <RedirectButton
          icon={LiaUsersSolid}
          name="Nova célula"
          href="/admin/cell/create"
        />
      </div>

      <TableCells />
    </DivWrapper>
  );
}
