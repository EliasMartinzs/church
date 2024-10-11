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
import { deleteMeeting } from "@/actions/meetings";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteMember } from "@/actions/admin";
import { revalidatePath } from "next/cache";

type Props = {
  memberId: string;
};

export const DeleteMember = ({ memberId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    startTransition(async () => {
      deleteMember(memberId);
      router.push("/admin/members");
      toast("Membro deletado com sucesso");
      revalidatePath("/admin/members");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="border py-1 px-3 rounded-3xl text-foreground border-muted-foreground">
        Deletar membro
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirmação de Exclusão do Membro?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir este membro? Esta ação é
            permanente e não poderá ser desfeita. Todos os dados associados a
            este encontro serão removidos permanentemente.
          </AlertDialogDescription>
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
