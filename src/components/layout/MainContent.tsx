import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent: React.FC = () => {
  return (
    <main className="bg-muted/30 text-foreground overflow-y-auto min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;