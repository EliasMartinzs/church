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
import React from "react";
import { deleteCell } from "@/actions/admin";

export type Secretary = {
  id: string;
  name: string;
  secretary: string | null | undefined;
  secretaryEmail: string | undefined;
};

const CellActions: React.FC<{ row: any }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = (cellId: string) => {
    startTransition(async () => {
      await deleteCell(cellId);
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
              Deletar Celula
            </Button>
          }
          open={open}
          setOpen={setOpen}
          textAlign="center"
          headerStyle="flex flex-col gap-y-3"
          title="Excluir Célula Permanentemente"
          description="Atenção: Ao excluir esta célula, todas as informações relacionadas a ela, incluindo membros e reuniões, serão permanentemente removidas do sistema. Essa ação não pode ser desfeita. Tem certeza de que deseja continuar?"
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
          href={`/admin/cell/${row.original.id}`}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Sobre a Célula
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Secretary>[] = [
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => <CellActions row={row} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome célula
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "secretary",
    header: "Secretario",
  },
  {
    accessorKey: "secretaryEmail",
    header: ({ column }) => <Button variant="ghost">Email secretario</Button>,
  },
];
