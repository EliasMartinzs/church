import { getMember } from "@/actions/member";
import { NewPrayerForm } from "@/components/global/new-prayer-form";
import { Title } from "@/components/global/title";

export default async function PayerCreatePage() {
  const member = await getMember();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <div className="w-full lg:max-w-4xl lg:mx-auto lg:p-8 card space-y-4">
        <Title href="/admin/prayers" text="Orações" />

        <NewPrayerForm
          memberId={member?.id}
          redirect="/member/prayers"
          churchId={member?.churchId!}
          cellId={member?.cell?.id!}
        />
      </div>
    </div>
  );
}
