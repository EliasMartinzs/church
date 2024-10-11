import { Member } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  participant: Member;
};

export const ParticipantCard = ({
  participant: { id, fullName, email, photoUrl },
}: Props) => {
  return (
    <Link href={`/admin/member/${id}`}>
      <Card className="lg:bg-background hover:border border-muted-foreground">
        <CardHeader className="flex items-center flex-row gap-x-3">
          <CardTitle>
            <Image
              src={photoUrl as string}
              alt={fullName as string}
              width={64}
              height={64}
              className="size-16 rounded-full object-cover"
            />
          </CardTitle>
          <CardDescription className="flex flex-col justify-center">
            <span className="text-foreground">{fullName}</span>{" "}
            <small>{email}</small>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
