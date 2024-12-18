import { getChurch } from "@/actions/admin";
import { NewPrayerForm } from "@/components/global/new-prayer-form";
import { Title } from "@/components/global/title";

async function getData() {
  const church = await getChurch();

  const members = church?.members?.map((member) => ({
    value: member.id,
    label: member.fullName!,
  }));

  const cells = church?.cells.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return {
    members,
    churchId: church?.id,
    cells: cells,
  };
}

export default async function PayerCreatePage() {
  const { members, churchId, cells } = await getData();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/admin/prayers" text="Orações" />

        <NewPrayerForm
          members={members}
          redirect="/admin/prayers"
          churchId={churchId!}
          cells={cells}
        />
      </div>
    </div>
  );
}
