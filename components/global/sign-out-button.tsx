import { SignOutButton as SignOutButtonClerk } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";

export const SignOutButton = () => {
  return (
    <SignOutButtonClerk>
      <div className="flex items-center gap-x-2 cursor-pointer">
        <CiLogout className="size-5" /> Sair
      </div>
    </SignOutButtonClerk>
  );
};
