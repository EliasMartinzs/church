"use client";

import { menuItemsAdmin } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "../global/sign-out-button";

export const SidebarDesktop = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full px-4 flex flex-col items-start justify-start gap-y-5 py-20">
      {menuItemsAdmin.map(({ icon, path, label }) => {
        const Icon = icon;
        return (
          <Link
            key={path}
            href={path}
            className={cn("p-2 flex items-center gap-x-3")}
          >
            <Icon
              className={cn(
                "size-7 text-muted-foreground hover:text-foreground transition-colors hover:scale-110",
                pathname === path && "text-foreground"
              )}
            />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        );
      })}

      <SignOutButton />
    </aside>
  );
};
