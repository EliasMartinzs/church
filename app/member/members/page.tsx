import { Title } from "@/components/global/title";
import { TableMembers } from "@/components/members/table-members";

export default function MembersPage() {
  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <Title href="/admin" text="Home" />

      <div className="space-y-4">
        <h4 className="text-2xl font-bold">Membros companheiros</h4>

        <TableMembers />
      </div>
    </div>
  );
}
