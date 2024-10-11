import { getChurch } from "@/actions/admin";
import { columns } from "@/app/admin/cells/columns";
import { DataTable } from "@/app/admin/cells/data-table";
import { notFound } from "next/navigation";

async function getData() {
  const data = await getChurch();

  if (!data) {
    return notFound();
  }

  const cells = data.cells.map((cell) => ({
    id: cell.id,
    name: cell.name,
    secretary: cell.secretary?.fullName,
    secretaryEmail: cell.secretary?.email,
  }));

  return cells;
}

export const TableCells = async () => {
  const data = await getData();

  return <DataTable columns={columns} data={data!} />;
};
