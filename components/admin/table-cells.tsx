import { getChurch } from "@/actions/church";
import { columns } from "@/app/admin/cells/columns";
import { DataTable } from "@/app/admin/cells/data-table";

async function getData() {
  const church = await getChurch();

  const data = church?.cells.map((c) => ({
    id: c.id as string,
    name: c.name as string,
    photoUrl: c.photoUrl as string,
    secretary: c.secretary?.profile?.fullName as string,
    secretaryEmail: c.secretary?.email as string,
  }));

  return data;
}

export const TableCells = async () => {
  const data = await getData();

  return <DataTable columns={columns} data={data!} />;
};
