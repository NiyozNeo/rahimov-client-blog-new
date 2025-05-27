import React from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const MainContent: React.FC = () => {
  return (
    <main className="bg-muted/30 text-foreground overflow-y-auto min-h-screen">
      <div
        className={cn(" mx-auto px-4 py-8 pt-0 transition-all duration-200")}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;
