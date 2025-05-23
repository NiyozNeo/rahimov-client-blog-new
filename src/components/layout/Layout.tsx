import { AppSidebar } from "./Sidebar";
import MainContent from "./MainContent";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "../ui/sidebar";

export default function Layout() { 
  return (
    <SidebarProvider className="text-foreground flex min-h-screen">
      <div className="flex w-full transition-all duration-300 ease-in-out">
        <AppSidebar />
        <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
          <SidebarTrigger/>
          <SidebarInset className="flex-1">
            <MainContent />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};
