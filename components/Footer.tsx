
import React from 'react';
import { Logo } from './Logo';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-4">
          {/* Logo & Info */}
          <div className="lg:col-span-6 space-y-8">
            <Logo size="lg" />
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Sistem Informasi Maps Rumah Warga (SIMARUW) hadir untuk meningkatkan transparansi dan akses informasi data rumah dengan teknologi pemetaan digital terkini.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xl font-bold border-l-4 border-emerald-500 pl-4">Media Sosial</h4>
            <div className="flex gap-5">
              <a 
                href="https://www.instagram.com/puyang.berkembang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-all text-slate-300 hover:text-white group"
              >
                <InstagramIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.tiktok.com/@puyang_berkembang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-all text-slate-300 hover:text-white group"
              >
                <TikTokIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://www.youtube.com/@puyang_berkembang" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center hover:bg-emerald-500 transition-all text-slate-300 hover:text-white group"
              >
                <YouTubeIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Supported By */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold border-l-4 border-emerald-500 pl-3">Didukung Oleh</h4>
            <div className="flex items-center cursor-pointer group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="assets/img/logo-kkn.png" 
                  alt="Logo KKN" 
                  className="h-16 md:h-20 w-auto object-contain drop-shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Mencoba path alternatif jika logo-kkn.png tidak ditemukan
                    if (!target.dataset.triedAlt) {
                      target.dataset.triedAlt = 'true';
                      target.src = 'assets/img/kkn.png';
                    } else {
                      target.src = 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SIMARUW - Sistem Informasi Maps Rumah Warga. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
