import { getNewMembersPerMonthByCell, getSecretary } from "@/actions/secretary";
import { NewMembersPerMonthChart } from "@/components/admin/new-members-per-month-chart";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { TableMembers } from "@/components/secretary/table-members";
import { LiaUser } from "react-icons/lia";

export default async function MembersPage() {
  const [secretary, newMembersPerMonth] = await Promise.all([
    getSecretary(),
    getNewMembersPerMonthByCell(),
  ]);

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <Title href="/admin" text="Home" />

      <NewMembersPerMonthChart data={newMembersPerMonth} key="members" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={LiaUser}
          name="Novo membro"
          href={`/secretario/member/create/${secretary?.cell?.id!}`}
        />
      </div>

      <div className="card lg:p-8 space-y-4">
        <h4 className="text-2xl font-bold">Meus Membros</h4>

        <TableMembers />
      </div>
    </div>
  );
}
