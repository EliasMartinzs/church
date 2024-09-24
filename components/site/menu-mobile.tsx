import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { linksSite } from "@/constants";
import { Church, Copyright, Menu } from "lucide-react";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";

export const MenuMobile = () => {
  const year = new Date().getFullYear();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="bg-background/70 backdrop-blur-md">
        <div className="grid place-items-center">
          <Church className="size-20 text-blue-500 hover:scale-110 cursor-pointer transition-colors" />
        </div>
        <ul className="flex flex-col items-start justify-center gap-8 mt-16">
          {linksSite.map(({ label, href, icon }, i) => {
            const Icon = icon;
            return (
              <li key={i}>
                <Link
                  href={href}
                  className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors hover:scale-110"
                >
                  <Icon className="size-6" />
                  <span className="font-extralight">{label}</span>
                </Link>
              </li>
            );
          })}
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors hover:scale-110"
          >
            <CiLogin className="size-6" /> <span>Entrar</span>
          </Link>
        </ul>

        <SheetFooter className="absolute bottom-10">
          <small className="flex items-center gap-2">
            Copyright <Copyright className="size-3" /> Cramb {year}
          </small>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
