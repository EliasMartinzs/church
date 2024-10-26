import { EditProfilePic } from "@/components/secretary/edit-profile-pic";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formatDateToBr } from "@/lib/utils";
import { getMember } from "@/actions/member";
import { EditProfileMemberForm } from "@/components/members/edit-profile-member-form";

export default async function SecretaryProfile() {
  const user = await getMember();

  return (
    <div className="flex flex-1 h-full flex-col max-lg:items-center max-lg:justify-center card rounded-2xl lg:p-8 gap-y-8">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-52 h-52 relative rounded-lg">
          <EditProfilePic photoUrl={user?.photoUrl || "/noAvatar.png"} />
        </div>
        <div className="space-y-1 flex flex-col justify-center max-lg:items-center">
          <h6 className="text-2xl font-medium">{user?.fullName}</h6>
          <p className="text-muted-foreground">{user?.email}</p>
          <p className="text-muted-foreground">{user?.phone}</p>
        </div>
      </div>

      <Separator />

      <EditProfileMemberForm
        birthDate={formatDateToBr(user?.birthDate!)}
        phone={user?.phone!}
        fullname={user?.fullName!}
      />

      <Separator />

      <div className="flex items-center group hover:items-start gap-5 transition-all">
        <Image
          src={user?.church?.photoUrl || "/noChurch.png"}
          alt={user?.fullName as string}
          width={128}
          height={128}
          className="w-32 h-32 object-cover origin-center rounded-lg"
        />
        <div className="flex flex-col gap-y-2">
          <p>
            <span className="font-medium">Igreja:</span>
            <span className="text-muted-foreground">{user?.church?.name}</span>
          </p>
          <p>
            <span className="font-medium">Endereço:</span>
            <span className="text-muted-foreground">
              {user?.church?.address}
            </span>
          </p>
          <small className="text-muted-foreground line-clamp-2 group-hover:line-clamp-none hover:line-clamp-none">
            {user?.church?.description}
          </small>
        </div>
      </div>
    </div>
  );
}
