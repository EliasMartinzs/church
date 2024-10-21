"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteMember } from "@/actions/admin";
import { revalidatePath } from "next/cache";

type Props = {
  memberId: string;
  role: string;
};

export const DeleteMember = ({ memberId, role }: Props) => {
  const [isPending, startTransition] = useTransition();
  const isSecretary = role === "Secretario";

  const router = useRouter();
  const handleDelete = () => {
    startTransition(async () => {
      deleteMember(memberId, role);
      router.push("/admin/members");
      toast(`${role} deletado com sucesso`);
      revalidatePath("/admin/members");
    });
  };

  const title = isSecretary
    ? "Excluir Secretário Permanentemente"
    : "Excluir Membro Permanentemente";

  const description = isSecretary
    ? "Atenção: Ao excluir este secretário, todos os membros da célula a que ele pertence também serão deletados, assim como todas as informações relacionadas a ele, incluindo reuniões. Essa ação não pode ser desfeita. Tem certeza de que deseja continuar?"
    : "Atenção: Ao excluir este membro, todas as informações relacionadas a ele, incluindo reuniões, serão permanentemente removidas do sistema. Essa ação não pode ser desfeita. Tem certeza de que deseja continuar?";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="border py-1 px-3 rounded-3xl text-foreground border-muted-foreground">
        {isSecretary ? "Deletar secretario" : "Deletar membro"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>
            {isPending ? (
              <div className="flex gap-x-3">
                <Loader2 className="size-4" /> Deletando...
              </div>
            ) : (
              "Deletar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
