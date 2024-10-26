"use client";

import { deleteAccountAdmin } from "@/actions/admin";
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
import { Loader2, Trash } from "lucide-react";
import { useTransition } from "react";

export const DeleteAccount = () => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      deleteAccountAdmin();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-x-2 border p-3 rounded-lg bg-destructive border-destructive shadow-sm transition-colors hover:bg-destructive/80">
        Deletar minha conta <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deleção de Conta de Administrador</AlertDialogTitle>
          <AlertDialogDescription>
            Ao deletar sua conta, o administrador perderá acesso permanente ao
            sistema e a todas as informações relacionadas à administração de
            igrejas, incluindo membros, células e reuniões. A exclusão é
            irreversível e os dados pessoais do administrador serão removidos.
            Entretanto, a igreja e os dados associados continuarão acessíveis
            para os demais membros autorizados, garantindo a continuidade das
            operações.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            {isPending ? (
              <div className="flex items-center gap-x-2">
                <Loader2 className="animate-spin" /> Deletando...
              </div>
            ) : (
              "Continuar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
