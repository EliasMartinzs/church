"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { CiLogout } from "react-icons/ci";
import * as FiIcons from "react-icons/fi";
import * as PiIcons from "react-icons/pi";

import { FaRegUserCircle } from "react-icons/fa";

type Props = {
  menuLinks: { label: string; iconName: string; path: string }[];
};

export const SidebarDesktop = ({ menuLinks }: Props) => {
  const pathname = usePathname();

  const iconGroups = {
    Fi: FiIcons,
    Pi: PiIcons,
  };

  const getIconComponent = (iconName: string) => {
    const prefix = iconName.slice(0, 2);

    const IconComponent = iconGroups[prefix]?.[iconName] || FaRegUserCircle;
    return IconComponent;
  };

  return (
    <aside className="w-full h-full px-4 flex flex-col items-start justify-start gap-y-5 py-20">
      {menuLinks.map(({ iconName, path, label }) => {
        const Icon = getIconComponent(iconName);
        return (
          <Link
            key={path}
            href={path}
            className={cn(
              "p-2 flex items-center gap-x-3",
              pathname === path && "text-primary"
            )}
          >
            <Icon
              className={cn(
                "size-7 text-muted-foreground hover:text-foreground transition-colors hover:scale-110",
                pathname === path && "text-primary"
              )}
            />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        );
      })}

      <SignOutButton>
        <div className="flex items-center gap-x-3 cursor-pointer p-2">
          <CiLogout className="size-7 text-muted-foreground hover:text-foreground transition-colors hover:scale-110" />{" "}
          Sair
        </div>
      </SignOutButton>
    </aside>
  );
};
