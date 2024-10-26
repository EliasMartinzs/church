"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
import { useState, useTransition } from "react";

export type Member = {
  id: string;
  name: string | null;
  memberEmail: string;
  cellName: string | undefined;
};

const CellAction: React.FC<{ row: any }> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (memberId: string) => {
    startTransition(async () => {
      // deleteMember(memberId);
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

        <Link
          href={`/member/${row.original.id}`}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Sobre o Membro
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => <CellAction row={row} />,
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
