"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteMember } from "@/actions/members";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type Secretary = {
  id: string;
  name: string;
  photoUrl: string | null;
  secretary: string | null | undefined;
  secretaryEmail: string;
};

export const columns: ColumnDef<Secretary>[] = [
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={deleteMember}>
                <input type="hidden" name="memberId" />
                <Button type="submit" variant="ghost">
                  Deletar Membro
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/admin/cell/${row.original.id}`}
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                Sobre a Célula
              </Link>
            </DropdownMenuItem>
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
          Nome célula
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "secretary",
    header: "Secretario",
  },
  {
    accessorKey: "email-secretary",
    header: ({ column }) => {
      return <Button variant="ghost">Email secretario</Button>;
    },
  },
];
