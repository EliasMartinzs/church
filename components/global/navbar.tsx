import { Church } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { MenuMobile } from "../admin/menu-mobile";
import { MenuProfile } from "@/components/global/menu-profile";

type Props = {
  href: string;
  fullname: string;
  photoUrl: string;
  email: string;
  menuItems: { iconName: string; path: string; label: string }[];
};

export const Navbar = ({ fullname, photoUrl, email, menuItems }: Props) => {
  return (
    <header className="w-full mt-2.5 mb-10">
      <nav className="max-lg:w-[90%] mx-auto lg:max-w-7xl bg-card backdrop-blur-md rounded-full py-4 px-8 flex items-center justify-between shadow-3xl">
        <Link
          href="/admin"
          className="flex items-center gap-2 cursor-pointer hover:text-muted-foreground transition-colors hover:scale-110"
        >
          <Church className="size-8" />
          <span>Home</span>
        </Link>

        <div className="flex items-center gap-x-3">
          <ModeToggle />
          <div className="flex items-center lg:hidden">
            <MenuMobile
              menuItems={menuItems}
              userProfile={
                <MenuProfile
                  fullname={fullname as string}
                  photoUrl={photoUrl as string}
                  email={email as string}
                />
              }
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
