import { getCellMembersWithAttendanceRate } from "@/actions/global";
import { getSecretary } from "@/actions/secretary";
import { AttendenceRateMemberChart } from "@/components/global/attendence-rate-member-chart";
import { RedirectButton } from "@/components/global/redirect-button";
import { Title } from "@/components/global/title";
import { TableMembers } from "@/components/secretary/table-members";
import { LiaUser } from "react-icons/lia";

export default async function MembersPage() {
  const user = await getSecretary();

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin" text="Home" />

      <div className="flex flex-col gap-3 lg:flex-row">
        <RedirectButton
          icon={LiaUser}
          name="Novo membro"
          href={`/secretario/member/create/${user?.cell?.id!}`}
        />
      </div>

      <h4 className="text-2xl font-bold">Meus Membros</h4>

      <TableMembers />
    </div>
  );
}
