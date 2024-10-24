import { getMemberById, getSecretaryById } from "@/actions/admin";
import { DeleteMember } from "@/components/admin/delete-member";
import NotFound from "@/components/global/not-found";
import { Title } from "@/components/global/title";
import { Separator } from "@/components/ui/separator";
import { formatDateToBr } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { CircleAlert } from "lucide-react";
import Image from "next/image";

type Secretary = Prisma.PromiseReturnType<typeof getSecretaryById>;
type Member = Prisma.PromiseReturnType<typeof getMemberById>;

type Props = {
  params: { id: string };
};

const role = {
  SECRETARY: "Secretario",
  MEMBER: "Membro",
};

export default async function MemberPage({ params: { id } }: Props) {
  try {
    const user = await clerkClient().users.getUser(id);

    if (!user || !user.id) {
      throw new Error("Usuário não encontrado");
    }

    let member: Secretary | Member | undefined;

    if (user.publicMetadata.role === "SECRETARY") {
      member = await getSecretaryById(id);
    } else if (user.publicMetadata.role === "MEMBER") {
      member = await getMemberById(id);
    }

    if (!member) {
      throw new Error("Membro ou Secretário não encontrado");
    }

    return (
      <div className="flex flex-1 h-full flex-col lg:bg-accent rounded-2xl lg:p-8 gap-y-8 overflow-y-auto">
        <Title href="/admin/members" text="Membros" />

        <div className="w-full flex flex-col items-center justify-center lg:items-start gap-y-8">
          <div className="flex items-center justify-center flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-72 h-72 relative rounded-lg">
              <Image
                src={member?.photoUrl ?? "/noAvatar.png"}
                alt={member?.fullName ?? ""}
                fill
                className="w-72 h-72 object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-y-8">
              <h4 className="text-2xl lg:text-4xl font-semibold">
                {member?.fullName}
              </h4>

              <div className="space-y-1">
                <h6 className="font-medium">Contato</h6>
                <p className="text-muted-foreground">{member?.email}</p>
                <p className="text-muted-foreground">{member?.phone}</p>
                <p className="text-muted-foreground">
                  {formatDateToBr(member?.birthDate as Date)}
                </p>

                <p className="text-muted-foreground">
                  Criado em: {formatDateToBr(member?.createdAt as Date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-x-2 text-lg">
            <p className="font-semibold">Igreja:</p>
            <p>{member?.church?.name}</p>
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <p className="font-semibold">Célula:</p>
            <p>{member?.cell?.name}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-xl font-semibold">Zona de perigo</h4>

          <div className="border border-red-500 rounded-xl p-4 space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold">Deletar esse membro</p>
                <p className="text-muted-foreground font-light">
                  Depois de excluir um membro, não há como voltar atrás. Por
                  favor, tenha certeza.
                </p>
              </div>
            </div>

            <DeleteMember
              memberId={member?.id as string}
              role={role[member?.role]}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <NotFound>
        <div className="flex flex-col items-center justify-center gap-y-8">
          <CircleAlert className="size-14" />

          <div className="flex items-center justify-center gap-x-5 text-lg">
            <p>404</p>
            <div className="w-[1px] h-10 bg-foreground"></div>
            <p>Nenhum membro encontrado</p>
          </div>
        </div>
      </NotFound>
    );
  }
}
