import { getSecretary } from "@/actions/secretary";
import { Member } from "@/app/admin/members/columns";
import { columns } from "@/app/secretario/members/columns";
import { DataTable } from "@/app/secretario/members/data-table";

async function getData() {
  const data = await getSecretary();

  const members: Member[] = data?.cell?.members.map((member) => ({
    id: member.id,
    name: member.fullName,
    memberEmail: member.email,
    cellName: data?.cell?.name,
  })) as Member[];

  return members;
}

export const TableMembers = async () => {
  const members = await getData();
  return <DataTable columns={columns} data={members} />;
};
