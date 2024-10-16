import { SignOutButton as SignOutButtonClerk } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";

export const SignOutButton = () => {
  return (
    <SignOutButtonClerk>
      <div className="flex items-center gap-x-5 cursor-pointer">
        <CiLogout className="size-7 text-muted-foreground hover:text-foreground transition-colors hover:scale-110" />{" "}
        Sair
      </div>
    </SignOutButtonClerk>
  );
};
