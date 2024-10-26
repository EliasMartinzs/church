import { getSecretary } from "@/actions/secretary";
import { NewPrayerForm } from "@/components/global/new-prayer-form";
import { Title } from "@/components/global/title";

export default async function PayerCreatePage() {
  const secretario = await getSecretary();

  const members = secretario?.cell?.members.map((member) => ({
    label: member.fullName!,
    value: member.id,
  }));

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/admin/prayers" text="Orações" />

        <NewPrayerForm
          members={members}
          redirect="/secretario/prayers"
          churchId={secretario?.churchId!}
          cellId={secretario?.cell?.id!}
        />
      </div>
    </div>
  );
}
