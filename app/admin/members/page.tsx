import { TableMembers } from "@/components/admin/table-members";
import { DivWrapper } from "@/components/global/div-wrapper";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { HiOutlineUserPlus } from "react-icons/hi2";

export default function Members() {
  return (
    <DivWrapper className="mt-5 ">
      <Title text="Membros" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={HiOutlineUserPlus}
          name="Novo membro"
          href="/admin/member/create/undefined"
        />
      </div>

      <TableMembers />
    </DivWrapper>
  );
}
