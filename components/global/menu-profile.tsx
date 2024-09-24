import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  fullname: string;
  photoUrl: string;
  email: string;
};

export const MenuProfile = ({ email, fullname, photoUrl }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      <Avatar className="size-10">
        <AvatarImage src={photoUrl as string} />
        <AvatarFallback>
          {fullname?.charAt(0)}
          {fullname?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col leading-5">
        <span className="text-start">{fullname}</span>
        <span className="text-sm text-muted-foreground">{email}</span>
      </div>
    </div>
  );
};
