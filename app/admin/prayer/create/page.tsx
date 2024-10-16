import { getChurch } from "@/actions/admin";
import { NewPrayerForm } from "@/components/global/new-prayer-form";

async function getData() {
  const church = await getChurch();

  const members = church?.members?.map((member) => ({
    id: member.id,
    fullName: member.fullName,
  }));

  return members;
}

export default async function PayerCreatePage() {
  const data = await getData();

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <NewPrayerForm members={data} />
    </div>
  );
}
