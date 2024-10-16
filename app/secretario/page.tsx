import { getSecretary } from "@/actions/secretary";
import { CustomCalendar } from "@/components/global/custom-calendar";
import { NotificationUser } from "@/components/global/notification-user";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function Secretario() {
  const [secretary] = await Promise.all([getSecretary()]);

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <NotificationUser
        href="/secretario/profile"
        isCompleted={!secretary?.isCompleted}
        profile="secretario"
      />

      <CustomCalendar />

      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row items-center max-lg:justify-center gap-5">
          <div className="w-52 h-52 relative rounded-lg">
            <Image
              src={secretary?.cell?.photoUrl || "/noChurch.png"}
              alt={secretary?.cell?.name as string}
              fill
              className="w-52 h-52 object-cover object-center rounded-lg"
            />
          </div>
          <div className="space-y-2 max-lg:text-center">
            <h1 className="font-bold text-3xl">{secretary?.cell?.name}</h1>
            <h4 className="font-medium text-xl">{secretary?.fullName}</h4>
          </div>
        </div>

        <div className="w-full">{secretary?.cell?.description}</div>

        <Separator />

        <div className="grid grid-cols-2 gap-5">
          <Card
            label="Membros"
            total={secretary?.cell?.members?.length as number}
          />

          <Card
            label="Encontros até o momento"
            total={secretary?.cell?.meetings?.length as number}
          />
        </div>
      </div>
    </div>
  );
}

const Card = ({ total, label }: { total: number; label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-accent lg:bg-background p-6 shadow-3xl rounded-lg text-center">
      <p className="text-2xl font-bold">{label}</p>
      <p className="text-5xl font-black">{total}</p>
    </div>
  );
};
