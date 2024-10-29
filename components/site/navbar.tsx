import { MenuMobile } from "@/components/site/menu-mobile";
import { linksSite } from "@/constants";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { PiChurchThin } from "react-icons/pi";

export const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="max-lg:w-[90%] mx-auto lg:max-w-5xl bg-white text-[#242529] backdrop-blur-sm rounded-full py-4 px-8 flex items-center justify-between shadow-3xl">
        <Link href="/" className="flex items-center gap-x-3">
          <PiChurchThin className="size-8" />

          <span>Cramb</span>
        </Link>
        <ul className="max-lg:hidden flex items-center gap-8">
          {linksSite.map(({ label, href, icon }, i) => {
            const Icon = icon;
            return (
              <li key={i}>
                <Link
                  href={href}
                  className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors hover:scale-110"
                >
                  <Icon className="size-5" />
                  <span className="text-sm font-extralight">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors hover:scale-110 max-lg:hidden"
        >
          <CiLogin className="size-5" />
          <span className="text-sm font-extralight">Entrar</span>
        </Link>

        <div className="lg:hidden">
          <MenuMobile />
        </div>
      </nav>
    </header>
  );
};
