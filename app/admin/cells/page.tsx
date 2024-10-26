import { TableCells } from "@/components/admin/table-cells";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { LiaUsersSolid } from "react-icons/lia";

export default function Cells() {
  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <Title href="/admin" text="Home" />

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
    </div>
  );
}
