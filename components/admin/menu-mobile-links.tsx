import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as PiIcons from "react-icons/pi";

type Props = {
  setOpen: (prevState: boolean) => void;
  menuItems: { iconName: string; path: string; label: string }[];
};

export const MenuMobileLinks = ({ setOpen, menuItems }: Props) => {
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
    <div className="space-y-2">
      {menuItems.map(({ iconName, path, label }) => {
        const Icon = getIconComponent(iconName);
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
                pathname === path && "text-primary"
              )}
            />
            <p
              className={cn(
                "text-muted-foreground",
                pathname === path && "text-primary"
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
