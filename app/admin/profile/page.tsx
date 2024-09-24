import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DivWrapper } from "@/components/global/div-wrapper";
import { Title } from "@/components/global/title";
import { getAdmin } from "@/actions/admin";
import { EditProfile } from "@/components/admin/edit-profile";
import { EditChurch } from "@/components/admin/edit-church";
import { Church } from "@prisma/client";

export default async function Profile() {
  const user = await getAdmin();

  return (
    <DivWrapper>
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
    </DivWrapper>
  );
}
