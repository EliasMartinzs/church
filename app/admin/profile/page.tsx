import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Title } from "@/components/global/title";
import { getAdmin } from "@/actions/admin";
import { EditProfile } from "@/components/admin/edit-profile";
import { EditChurch } from "@/components/admin/edit-church";
import { Church } from "@prisma/client";
import { DeleteAccount } from "@/components/admin/delete-account";

export default async function Profile() {
  const user = await getAdmin();

  return (
    <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8 card">
      <Title text="Configurações" />
      <div>
        <Tabs defaultValue="profile" className="">
          <TabsList>
            <TabsTrigger value="profile">Meu perfil</TabsTrigger>
            <TabsTrigger value="church">Minha Igreja</TabsTrigger>
            <TabsTrigger value="danger">Perigo</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <EditProfile user={user} />
          </TabsContent>
          <TabsContent value="church">
            <EditChurch church={user?.church as Church} />
          </TabsContent>
          <TabsContent value="danger">
            <div className="space-y-4 mt-4">
              <h4 className="font-bold text-2xl">Deletar minha conta</h4>

              <DeleteAccount />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
