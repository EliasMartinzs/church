import { getMember } from "@/actions/member";
import { Navbar } from "@/components/global/navbar";
import { SidebarDesktop } from "@/components/global/sidebar-desktop";
import { TopbarDesktop } from "@/components/global/topbar-desktop";
import { menuItemsMember } from "@/constants";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function LayoutMember({ children }: Props) {
  const user = await getMember();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        {/* Topbar */}
        <div className="w-full h-24 fixed top-0 left-0 z-10 bg-background/90 backdrop-blur-sm">
          <TopbarDesktop
            fullname={user?.fullName as string}
            hrefProfile="/member/profile"
            photoUrl={user?.photoUrl as string}
          />
        </div>

        {/* Sidebar */}
        <div className="w-56 h-[calc(100vh-96px)] fixed top-24 left-0 z-10">
          <SidebarDesktop menuLinks={menuItemsMember} />
        </div>

        {/* Main Content */}
        <main className="ml-56 mt-24 flex-1 p-4 overflow-x-auto">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 p-4">
        <Navbar
          menuItems={menuItemsMember}
          fullname={user?.fullName as string}
          email={user?.email as string}
          href="/admin"
          photoUrl={user?.photoUrl as string}
        />
        {children}
      </div>
    </div>
  );
}
