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
import { deleteCell } from "@/actions/admin";

type Props = {
  cellId: string;
};

export const DeleteCell = ({ cellId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    startTransition(async () => {
      deleteCell(cellId);
      toast("Célula deletada com sucesso");
      router.push("/admin/cells");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="border w-full p-1 rounded-3xl text-foreground border-muted-foreground">
        Deletar célula
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmação de Exclusão da Célula</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir esta Célula? Esta ação é
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
