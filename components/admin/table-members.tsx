import { getChurch } from "@/actions/admin";
import { columns, Member } from "@/app/admin/members/columns";
import { DataTable } from "@/app/admin/members/data-table";

async function getData() {
  const data = await getChurch();

  const members: Member[] = data?.members.map((member) => ({
    id: member.id,
    name: member.fullName,
    memberEmail: member.email,
    cellName: member.cell?.name,
  })) as Member[];

  return members;
}

export const TableMembers = async () => {
  const members = await getData();
  return <DataTable columns={columns} data={members} />;
};
