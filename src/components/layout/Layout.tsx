import { AppSidebar } from "./Sidebar";
import MainContent from "./MainContent";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function Layout() { 
  return (
    <SidebarProvider className="text-foreground">
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex-1">
        <MainContent />
      </main>
    </SidebarProvider>
  );
};
