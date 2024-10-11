import { TableMembers } from "@/components/admin/table-members";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { LiaUser } from "react-icons/lia";

export default function MembersPage() {
  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin" text="Home" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={LiaUser}
          name="Novo membro"
          href="/admin/member/create/undefined"
        />
      </div>

      <TableMembers />
    </div>
  );
}
