import { getMember } from "@/actions/member";
import { columns, Member } from "@/app/member/members/columns";
import { DataTable } from "@/app/member/members/data-table";

async function getData() {
  const data = await getMember();

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
