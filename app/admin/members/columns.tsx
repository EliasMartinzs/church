"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReusableDialog } from "@/components/global/reusable-dialog";
import { useState, useTransition } from "react";
import { deleteCell, deleteMember } from "@/actions/admin";

export type Member = {
  id: string;
  name: string | null;
  memberEmail: string;
  cellName: string | undefined;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      const handleDelete = (memberId: string) => {
        startTransition(async () => {
          deleteMember(memberId);
          setOpen(false);
          window.location.reload();
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ReusableDialog
              trigger={
                <Button type="button" variant="ghost">
                  Deletar membro
                </Button>
              }
              open={open}
              setOpen={setOpen}
              textAlign="center"
              headerStyle="flex flex-col gap-y-3"
              title="Excluir Membro Permanentemente"
              description="Atenção: Ao excluir este membro, todas as informações relacionadas a ele, incluindo reuniões, serão permanentemente removidas do sistema. Essa ação não pode ser desfeita. Tem certeza de que deseja continuar?"
              content={
                <div className="flex gap-2">
                  <Button
                    size="full"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="full"
                    type="button"
                    className="flex gap-x-2"
                    onClick={() => handleDelete(row.original.id)}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Deletando...
                      </>
                    ) : (
                      "Deletar"
                    )}
                  </Button>
                </div>
              }
            />

            <Link
              href={`/admin/member/${row.original.id}`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Sobre o Membro
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cellName",
    header: "Celula",
  },
  {
    accessorKey: "memberEmail",
    header: ({ column }) => {
      return <Button variant="ghost">Email</Button>;
    },
  },
];
