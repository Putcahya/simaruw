
import React from 'react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 px-4 py-2 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo size="lg" />
      </div>
    </nav>
  );
};
