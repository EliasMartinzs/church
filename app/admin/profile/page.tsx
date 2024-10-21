import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Title } from "@/components/global/title";
import { getAdmin } from "@/actions/admin";
import { EditProfile } from "@/components/admin/edit-profile";
import { EditChurch } from "@/components/admin/edit-church";
import { Church } from "@prisma/client";

export default async function Profile() {
  const user = await getAdmin();

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8">
      <Title text="Configurações" />
      <div>
        <Tabs defaultValue="profile" className="">
          <TabsList>
            <TabsTrigger value="profile">Meu perfil</TabsTrigger>
            <TabsTrigger value="church">Minha Igreja</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <EditProfile user={user} />
          </TabsContent>
          <TabsContent value="church">
            <EditChurch church={user?.church as Church} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
