import { getCellById } from "@/actions/admin";
import { MenuProfile } from "@/components/global/menu-profile";
import { Title } from "@/components/global/title";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabMeetingsCell } from "@/components/admin/tab-meetings-cell";
import { TabConfigCell } from "@/components/admin/tab-config-cell";
import { TabMembersCell } from "@/components/admin/tab-members-cell";

async function getData(cellId: string) {
  const data = await getCellById(cellId);

  if (!data) {
    return notFound();
  }

  return data;
}

type Props = {
  params: { cellId: string };
};

export default async function Cell({ params: { cellId } }: Props) {
  const data = await getData(cellId);

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title href="/admin/cells" text={data?.name} />

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Sobre</TabsTrigger>
          <TabsTrigger value="meetings">Encontros</TabsTrigger>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="settings">Configuracoes</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-10">
          <div className="space-y-6 lg:flex gap-x-5">
            <Image
              src={data?.photoUrl as string}
              alt={data?.name}
              className="object-cover object-center rounded-2xl w-[150px] h-[150px]"
              width={150}
              height={150}
            />
            <div className="space-y-3 flex flex-col items-start justify-start">
              <p className="font-medium">Secretario(a):</p>
              <MenuProfile
                email={data?.secretary?.email as string}
                fullname={data?.secretary?.fullName as string}
                photoUrl={data?.secretary?.photoUrl as string}
              />
            </div>
          </div>

          <p className="text-muted-foreground leading-7 max-lg:line-clamp-4 hover:line-clamp-none mt-5">
            {data?.description}
          </p>
        </TabsContent>
        <TabsContent value="meetings">
          <TabMeetingsCell cellId={data.id as string} />
        </TabsContent>
        <TabsContent value="members">
          <TabMembersCell members={data?.members} cellId={cellId} />
        </TabsContent>
        <TabsContent value="settings">
          <TabConfigCell cellId={cellId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
