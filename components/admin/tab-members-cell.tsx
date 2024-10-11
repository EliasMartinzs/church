"use client";

import { Member } from "@prisma/client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Cake, Search } from "lucide-react";
import Image from "next/image";
import { cn, isBirthdayToday } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { RedirectButton } from "../global/redirect-button";
import { LiaUser } from "react-icons/lia";

type Props = {
  members: Member[];
  cellId: string;
};

export const TabMembersCell = ({ members, cellId }: Props) => {
  const [search, setSearch] = useState<string>("");

  const searchedMembers = members
    .filter((member) =>
      member.fullName?.toLowerCase().includes(search.toLowerCase())
    )
    .map((member) => ({
      name: member.fullName,
      photo: member.photoUrl,
      email: member.email,
      id: member.id,
      birthDate: member.birthDate,
    }))
    .sort((a, b) => a.name!.localeCompare(b.name!));

  const birthdaysOfTheDay = members
    .filter(
      (member) => member.birthDate !== null && isBirthdayToday(member.birthDate)
    )
    .map((member) => ({
      name: member.fullName,
      photo: member.photoUrl,
      email: member.email,
      id: member.id,
      birthDate: member.birthDate,
    }))
    .sort((a, b) => a.name!.localeCompare(b.name!));

  return (
    <div className="mt-10 space-y-8">
      <div className="relative">
        <Input
          placeholder="Buscar por membros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="size-5 absolute top-3.5 left-3.5" />
      </div>

      <div className="lg:w-1/3">
        <RedirectButton
          href={`/admin/member/create/${cellId}`}
          name="Novo membro"
          icon={LiaUser}
        />
      </div>

      {birthdaysOfTheDay.length !== 0 && (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold">Aniversários do dia</h4>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {birthdaysOfTheDay.length === 0 &&
              birthdaysOfTheDay.map(({ id, birthDate, name, photo, email }) => (
                <MemberCard
                  key={id}
                  birthDate={birthDate}
                  id={id}
                  name={name}
                  photo={photo}
                  email={email}
                />
              ))}
          </div>
        </div>
      )}

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {searchedMembers.map(({ birthDate, id, name, photo, email }) => (
          <MemberCard
            key={id}
            birthDate={birthDate}
            id={id}
            name={name}
            photo={photo}
            email={email}
          />
        ))}
      </div>
    </div>
  );
};

const MemberCard = ({
  birthDate,
  email,
  id,
  name,
  photo,
}: {
  birthDate: Date | null;
  id: string;
  name: string | null;
  photo: string | null;
  email: string;
}) => {
  const defaultPhoto = "/noAvatar.png";
  const displayName = name || "Nome não disponível";

  return (
    <div
      key={id}
      className={cn(
        "flex items-center gap-3 p-2 bg-accent lg:bg-background rounded-3xl shadow-3xl hover:bg-accent/90 transition-colors cursor-pointer relative"
      )}
    >
      <Image
        alt={displayName}
        src={photo || defaultPhoto}
        className="w-10 h-10 object-cover object-center rounded-full"
        width={40}
        height={40}
      />
      <div className="flex flex-col">
        <p>{displayName}</p>
        <small className="text-muted-foreground">{email}</small>
      </div>

      {birthDate !== null && isBirthdayToday(birthDate) && (
        <div className="absolute top-4 right-4">
          <Cake className="size-6" />
        </div>
      )}
    </div>
  );
};
