import { getChurch } from "@/actions/church";
import { columns } from "@/app/admin/members/columns";
import { DataTable } from "@/app/admin/members/data-table";

async function getData() {
  const church = await getChurch();

  const data = church?.members
    .filter((m) => m.role !== "ADMIN")
    .map((m) => ({
      id: m.id as string,
      cellName: m.cells?.name as string,
      email: m.email as string,
      name: m.profile?.fullName as string,
      phone: m.email as string,
    }));

  return data;
}

export const TableMembers = async () => {
  const data = await getData();

  return <DataTable columns={columns} data={data!} />;
};
