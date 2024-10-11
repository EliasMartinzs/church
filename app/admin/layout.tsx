import { Navbar } from "@/components/global/navbar";
import { SidebarDesktop } from "../../components/admin/sidebar-desktop";
import { TopbarDesktop } from "../../components/admin/topbar-desktop";

type Props = {
  children: React.ReactNode;
};

export default function LayoutAdmin({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        {/* Topbar */}
        <div className="w-full h-24 fixed top-0 left-0 z-10 bg-background/90 backdrop-blur-sm">
          <TopbarDesktop />
        </div>

        {/* Sidebar */}
        <div className="w-56 h-[calc(100vh-96px)] fixed top-24 left-0 z-10">
          <SidebarDesktop />
        </div>

        {/* Main Content */}
        <main className="ml-56 mt-24 flex-1 p-4 overflow-x-auto">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 p-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
