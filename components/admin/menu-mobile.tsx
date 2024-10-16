"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoMenuOutline } from "react-icons/io5";

import { SignOutButton } from "../global/sign-out-button";
import { MenuMobileLinks } from "./menu-mobile-links";
import { useState } from "react";

type Props = {
  userProfile: React.ReactNode;
  menuItems: { iconName: string; path: string; label: string }[];
};

export const MenuMobile = ({ userProfile, menuItems }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <IoMenuOutline className="size-7" />
      </SheetTrigger>
      <SheetContent>
        <div className="h-full flex-1 flex flex-col py-20 gap-y-10 relative">
          {userProfile}
          <MenuMobileLinks menuItems={menuItems} setOpen={setOpen} />

          <div className="absolute bottom-0">
            <SignOutButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
