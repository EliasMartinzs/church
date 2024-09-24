import { menuItemsAdmin } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  setOpen: (prevState: boolean) => void;
};

export const MenuMobileLinks = ({ setOpen }: Props) => {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {menuItemsAdmin.map(({ icon, path, label }) => {
        const Icon = icon;
        return (
          <Link
            key={path}
            href={path}
            className={cn("p-2 flex items-center gap-x-3")}
            onClick={() => setOpen(false)}
          >
            <Icon
              className={cn(
                "size-6 text-muted-foreground hover:text-blue-500 transition-colors hover:scale-110",
                pathname === path && "text-foreground"
              )}
            />
            <p
              className={cn(
                "text-muted-foreground",
                pathname === path && "text-foreground"
              )}
            >
              {label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
