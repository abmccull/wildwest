'use client';

import React from 'react';
import Header from './Header';
import MobileFooter from './MobileFooter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0" role="main">
        {children}
      </main>

      {/* Mobile Footer - Only visible on mobile */}
      <MobileFooter />
    </div>
  );
};

export default Layout;
