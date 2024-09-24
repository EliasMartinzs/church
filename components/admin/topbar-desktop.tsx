import { ModeToggle } from "@/components/global/mode-toggle";
import Link from "next/link";
import { FaChurch } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CiSearch, CiSettings, CiUser } from "react-icons/ci";
import { SignOutButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

export const TopbarDesktop = async () => {
  // const linkToMainPage =
  //   user?.role === "ADMIN"
  //     ? "/admin"
  //     : user?.role === "SECRETARY"
  //     ? "/secretary"
  //     : "/member";

  return (
    <header className="w-full h-full flex">
      <div className="grid place-items-center size-24">
        <Link
          href={""}
          className="size-18 border rounded-full border-blue-500 grid place-items-center hover:border-foreground"
        >
          <FaChurch className="size-14 text-primary hover:scale-110 hover:text-foreground transition-colors" />
        </Link>
      </div>
      <div className="w-96 h-full flex items-center relative ml-10">
        <Input className="flex-1" placeholder="Search" />
        <CiSearch className="size-6 absolute right-0 text-muted-foreground" />
      </div>
      <div className="flex-1 flex items-center justify-end gap-x-5 mr-10">
        <ModeToggle />

        <IoNotificationsOutline className="size-6 text-muted-foreground" />
        <div className="flex items-center gap-x-4">
          <Popover>
            <PopoverTrigger>
              {/* <Avatar>
                <AvatarImage
                  src={user?.profile?.photoUrl as string}
                  alt={user?.profile?.fullName as string}
                />
                <AvatarFallback>
                  {user?.profile?.fullName?.charAt(0)}
                  {user?.profile?.fullName?.charAt(1)}
                </AvatarFallback>
              </Avatar> */}
            </PopoverTrigger>
            <PopoverContent>
              <Button
                variant="ghost"
                className="w-full justify-start gap-x-4"
                asChild
              >
                <Link href="/admin/profile">
                  <CiUser className="size-6" /> Meu perfil
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-x-4"
                asChild
              >
                <Link href="/settings">
                  <CiSettings className="size-6" /> Configurações
                </Link>
              </Button>
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-x-4"
                >
                  <PiSignOutLight className="size-6 rotate-180" /> Sair
                </Button>
              </SignOutButton>
            </PopoverContent>
          </Popover>

          {/* <p className="text-muted-foreground">{user?.profile?.fullName}</p> */}
        </div>
      </div>
    </header>
  );
};
