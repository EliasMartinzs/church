"use client";

import { Members, Profile, User } from "@prisma/client";
import Image from "next/image";
import { formatDateToBr } from "@/lib/utils";
import { Button } from "../ui/button";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { Input } from "../ui/input";
import { useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

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
import { deleteMember } from "@/actions/members";

type MemberWithProfile = Members & {
  member: User & {
    profile: Profile | null;
  };
};

interface TabsMembersProps {
  members: MemberWithProfile[];
  cellId: string;
}

export const TabsMembers = ({ members, cellId }: TabsMembersProps) => {
  const [search, setSearch] = useState("");

  const searchedMembers = members.filter((member) =>
    member.member.profile?.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 mt-6">
      <Button size="lg" variant="outline" asChild>
        <Link
          href={`/admin/member/create/${cellId}`}
          className="flex items-center gap-x-2"
        >
          <HiOutlineUserPlus className="size-5" /> Novo membro
        </Link>
      </Button>

      <div className="relative">
        <Input
          placeholder="Buscar por membros..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <Search className="size-5 absolute top-3.5 right-3.5" />
      </div>

      {search && searchedMembers.length === 0 ? (
        <p>Nenhum membro encontrado.</p>
      ) : (
        <div className="flex flex-col gap-1">
          {searchedMembers.map(({ member: { profile }, id }) => (
            <div
              key={profile?.id}
              className="bg-card text-card-foreground shadow-3xl flex items-center justify-between p-4 rounded-2xl hover:border relative"
            >
              <div className="flex items-center gap-x-5">
                <Image
                  src={profile?.photoUrl || "/noAvatar.png"}
                  alt={profile?.fullName as string}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />

                <Link
                  href={`/admin/member/${profile?.userId}`}
                  className="capitalize"
                >
                  {profile?.fullName}
                </Link>
                <p>{formatDateToBr(profile?.birthDate as Date)}</p>
                <p>{profile?.phoneNumber}</p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger>
                  <X className="hover:text-destructive cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirmar Exclusão do Membro
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza de que deseja excluir este membro? Esta ação é
                      irreversível e todos os dados associados serão
                      permanentemente removidos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <form action={deleteMember}>
                      <input type="hidden" name="memberId" value={id} />
                      <AlertDialogAction className="w-full" type="submit">
                        Deletar
                      </AlertDialogAction>
                    </form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
