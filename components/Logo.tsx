
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'    // Diperkecil dari 7xl agar lebih proporsional
  };

  const imgSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'   // Diperkecil dari w-80 h-48
  };

  return (
    <div className={`flex items-center ${size === 'lg' ? 'gap-4' : 'gap-3'} font-extrabold tracking-tighter group cursor-pointer`}>
      <div className={`${imgSizes[size]} flex items-center justify-center transition-all duration-700 group-hover:scale-105 group-hover:rotate-2`}>
        <img 
          src="assets/img/logo.png" 
          alt="SIMARUW Logo" 
          className="w-full h-full object-contain drop-shadow-xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'assets/img/logo-simaruw.png';
          }}
        />
      </div>
    </div>
  );
};
