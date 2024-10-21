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
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin/prayers" text="Oracoes" />

      <div className="w-full">
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
