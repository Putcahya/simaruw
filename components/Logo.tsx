
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const imgSizes = {
    sm: 'h-10 w-auto',
    md: 'h-16 w-auto',
    lg: 'h-24 md:h-28 w-auto'
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Segera matikan handler error untuk mencegah loop tak terbatas
    target.onerror = null;
    
    // Coba satu kali fallback ke path relatif jika absolute gagal
    if (!target.src.includes('cdn-icons-png')) {
      const currentSrc = target.src;
      if (currentSrc.includes('/assets/')) {
         // Jika gagal pada /assets/..., coba tanpa slash
         target.src = 'assets/img/logo-simaruw.png';
      } else {
         // Jika masih gagal, gunakan icon CDN sebagai solusi terakhir
         target.src = 'https://cdn-icons-png.flaticon.com/512/854/854878.png';
      }
    }
  };

  return (
    <div className="flex items-center group cursor-pointer">
      <div className={`${imgSizes[size]} flex items-center justify-center transition-all duration-700 group-hover:scale-105`}>
        <img 
          src="/assets/img/logo-simaruw.png" 
          alt="SIMARUW Logo" 
          className="h-full w-auto object-contain drop-shadow-xl"
          onError={handleImageError}
        />
      </div>
    </div>
  );
};
