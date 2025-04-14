import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent: React.FC = () => {
  return (
    <main className="bg-muted/30 text-foreground flex-1 md:p-10 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;