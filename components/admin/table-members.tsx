import { getChurch } from "@/actions/admin";
import { columns, Member } from "@/app/admin/members/columns";
import { DataTable } from "@/app/admin/members/data-table";

async function getData() {
  const data = await getChurch();

  const members =
    data?.members.map((member) => ({
      id: member.id,
      name: member.fullName,
      memberEmail: member.email,
      cellName: member.cell?.name,
      role: "Membro",
    })) || [];

  const secretaries =
    data?.secretaries.map((secretary) => ({
      id: secretary.id,
      name: secretary.fullName,
      memberEmail: secretary.email,
      cellName: secretary.cell?.name || "Sem célula",
      role: "Secretario",
    })) || [];

  const combinedArray = [...members, ...secretaries];

  return combinedArray;
}

export const TableMembers = async () => {
  const members = await getData();
  return <DataTable columns={columns} data={members} />;
};
