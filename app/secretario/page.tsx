import { getSecretary } from "@/actions/secretary";
import { TotalChart } from "@/components/global/total-chart";
import { CustomCalendar } from "@/components/global/custom-calendar";
import { NotificationUser } from "@/components/global/notification-user";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateToBr } from "@/lib/utils";

export default async function Secretario() {
  const secretary = await getSecretary();

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl lg:p-8 gap-y-8">
      <NotificationUser
        href="/secretario/profile"
        isCompleted={!secretary?.isCompleted}
        profile="secretario"
      />

      <CustomCalendar />

      <div className="space-y-8">
        <div className="w-full flex flex-col max-lg:items-center max-lg:justify-center lg:flex-row lg:items-start gap-4">
          <Image
            src={secretary?.cell?.photoUrl || "/cell.png"}
            alt={secretary?.cell?.name!}
            width={208}
            height={208}
            className="object-center object-cover w-52 h-52 rounded-lg"
          />
          <div className="space-y-4">
            <h3 className="max-lg:text-center font-bold text-2xl capitalize">
              {secretary?.cell?.name}
            </h3>
            <h4 className="line-clamp-3 hover:line-clamp-none capitalize">
              {secretary?.cell?.description}
            </h4>

            <div className="space-y-4">
              <h4 className="capitalize">{secretary?.fullName}</h4>
              <div className="flex items-center gap-x-2">
                <p>criada em:</p>
                <p>{formatDateToBr(secretary?.createdAt as Date)}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <Card>
            <CardContent className="flex flex-col justify-center items-center text-center h-full space-y-4">
              <Image
                src={secretary?.church?.photoUrl || "/noChurch.png"}
                alt="church"
                width={96}
                height={96}
                className="object-cover w-[96px] h-[96px] rounded-2xl"
              />
              <div className="relative flex flex-col items-center justify-center gap-y-4">
                <h1 className="font-bold text-3xl capitalize line-clamp-2 hover:line-clamp-none">
                  {secretary?.church?.name}
                </h1>
                <h4 className="font-medium text-xl capitalize line-clamp-1">
                  {secretary?.church?.admin?.fullName}
                </h4>
              </div>
            </CardContent>
          </Card>
          <TotalChart
            data={[
              {
                members: secretary?.cell?.members.length!,
                fill: "hsl(var(--chart-1))",
              },
            ]}
            title="Total de Membros da Célula"
            noLenghtMessage="Nenhum membro criado até o momento"
          />

          <TotalChart
            data={[
              {
                members: secretary?.cell?.meetings?.length!,
                fill: "hsl(var(--chart-1))",
              },
            ]}
            title="Total de Encontros Realizados"
            noLenghtMessage="Nenhum encontro criado até o momento"
          />
          <TotalChart
            data={[
              {
                members: secretary?.cell?.prayerRequests?.length!,
                fill: "hsl(var(--chart-1))",
              },
            ]}
            title="Total de Orações Realizadas"
            noLenghtMessage="Nenhuma orações criada até o momento"
          />
        </div>
      </div>
    </div>
  );
}
