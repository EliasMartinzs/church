import { Title } from "../global/title";

import { Prisma } from "@prisma/client";

import { EditProfileForm } from "./edit-profile-form";
import { getAdmin } from "@/actions/admin";

type UserData = Prisma.PromiseReturnType<typeof getAdmin>;

type Props = {
  user: UserData;
};

export const EditProfile = ({ user }: Props) => {
  return (
    <div className="mt-5 space-y-6">
      <Title text="Meu pefil" />

      <div className="w-full">
        <EditProfileForm user={user} />
      </div>
    </div>
  );
};
