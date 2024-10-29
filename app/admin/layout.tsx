import { Navbar } from "@/components/global/navbar";
import { SidebarDesktop } from "../../components/global/sidebar-desktop";
import { TopbarDesktop } from "@/components/global/topbar-desktop";
import { getAdmin } from "@/actions/admin";
import { menuItemsAdmin } from "@/constants";
import { Footer } from "@/components/global/footer";

type Props = {
  children: React.ReactNode;
};

export default async function LayoutAdmin({ children }: Props) {
  const user = await getAdmin();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        {/* Topbar */}
        <div className="w-full h-24 fixed top-0 left-0 z-10">
          <TopbarDesktop
            fullname={user?.fullName as string}
            hrefProfile="/admin/profile"
            photoUrl={user?.photoUrl as string}
          />
        </div>

        {/* Sidebar */}
        <div className="w-56 h-[calc(100vh-96px)] fixed top-24 left-0 z-10">
          <SidebarDesktop menuLinks={menuItemsAdmin} />
        </div>

        {/* Main Content */}
        <main className="ml-56 mt-24 flex-1 p-4 overflow-x-auto">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden p-4 flex flex-col flex-1">
        <Navbar
          menuItems={menuItemsAdmin}
          fullname={user?.fullName as string}
          email={user?.email as string}
          href="/admin"
          photoUrl={user?.photoUrl as string}
        />
        <div className="w-full h-full flex flex-1">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
