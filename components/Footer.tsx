
import React from 'react';
import { Logo } from './Logo';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from './Icons';

export const Footer: React.FC = () => {
  const handleKknError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    // Matikan handler segera untuk mencegah looping error di Vercel
    target.onerror = null;
    
    if (!target.src.includes('cdn-icons-png')) {
      const currentSrc = target.src;
      if (currentSrc.includes('/assets/')) {
        target.src = 'assets/img/logo-kkn.png';
      } else {
        target.src = 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png';
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Logo & Info */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="sm" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Sistem Informasi Maps Rumah Warga (SIMARUW) hadir untuk meningkatkan transparansi dan akses informasi data perumahan dengan teknologi pemetaan digital terkini.
            </p>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold border-l-4 border-emerald-500 pl-3">Media Sosial</h4>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/puyang.berkembang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-all text-slate-300 hover:text-white group"
                title="Instagram"
              >
                <InstagramIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.tiktok.com/@puyang_berkembang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-all text-slate-300 hover:text-white group"
                title="TikTok"
              >
                <TikTokIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.youtube.com/@puyang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-all text-slate-300 hover:text-white group"
                title="YouTube"
              >
                <YouTubeIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Supported By - Large KKN Logo */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold border-l-4 border-emerald-500 pl-3">Didukung Oleh</h4>
            <div className="flex items-center cursor-pointer group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/img/logo-kkn.png" 
                  alt="Logo KKN" 
                  className="h-16 md:h-20 w-auto object-contain drop-shadow-md"
                  onError={handleKknError}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[12px]">
          <p>&copy; {new Date().getFullYear()} SIMARUW. Seluruh Hak Cipta Dilindungi. <b>KKN UPY 41 KELOMPOK 56 - PADUKUHAN PUYANG</b> </p>
        </div>
      </div>
    </footer>
  );
};
