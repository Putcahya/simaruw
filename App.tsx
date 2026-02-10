
import React, { useState, useMemo } from 'react';
import { Footer } from './components/Footer';
import { SearchIcon } from './components/Icons';
import { MapComponent } from './components/MapComponent';
import { HouseCard } from './components/HouseCard';
import { RESIDENTS } from './data/residentData';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResidentId, setActiveResidentId] = useState<string | null>(null);

  const filteredResidents = useMemo(() => {
    if (!searchQuery.trim()) return RESIDENTS;
    return RESIDENTS.filter(r => 
      r.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setActiveResidentId(null);
  };

  const handleViewOnMap = (id: string) => {
    setActiveResidentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSearching = searchQuery.trim() !== '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      {/* Dynamic Background Elements */}
      <div className="bg-grain"></div>
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-300/30 rounded-full blur-[120px] animate-blob-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-300/30 rounded-full blur-[100px] animate-blob-reverse"></div>
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-teal-200/20 rounded-full blur-[80px] animate-blob-fast"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-lime-200/20 rounded-full blur-[100px] animate-blob-slow"></div>
        <div className="absolute top-[10%] right-[10%] w-[25%] h-[25%] bg-blue-200/20 rounded-full blur-[90px] animate-blob-reverse"></div>
      </div>

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center md:text-left">
              <div className="mb-8 inline-block transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
                <Logo size="md" className="drop-shadow-lg" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                <span className="text-slate-800 text-4xl md:text-5xl opacity-90">Padukuhan Puyang</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                Platform navigasi pintar untuk akses informasi lokasi rumah warga secara akurat, cepat, dan transparan.
              </p>
            </div>

            {/* Glass Search Bar */}
            <div className="relative max-w-2xl group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-20">
                <SearchIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <input
                type="text"
                placeholder="Cari nama warga di Puyang..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-16 pr-6 py-6 rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(16,185,129,0.1)] focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-400 focus:bg-white/80 transition-all text-slate-800 placeholder-slate-400 font-bold text-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Map Container with Glass Frame */}
              <div className="lg:col-span-8 order-2 lg:order-1 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white/20 backdrop-blur-md p-2 rounded-[2.5rem] border border-white/40 shadow-2xl">
                  <MapComponent 
                    residents={filteredResidents} 
                    activeResidentId={activeResidentId} 
                  />
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col gap-6">
                <div className="bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">Total Data</h3>
                  <div className="text-6xl font-black mb-4 relative z-10 text-emerald-400">{filteredResidents.length}</div>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                    Titik koordinat rumah warga telah divalidasi dan terintegrasi dengan data kependudukan Padukuhan.
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-emerald-500">System Live</span>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/80 shadow-xl">
                  <h4 className="font-black text-slate-900 mb-6 flex items-center gap-3 uppercase text-xs tracking-widest">
                    Pusat Bantuan
                  </h4>
                  <div className="space-y-4">
                    {[
                      {text: 'Cari berdasarkan nama lengkap' },
                      {text: 'Pilih "Lihat di Peta" untuk fokus' },
                      {text: 'Klik navigasi untuk G-Maps' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors cursor-default">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-bold text-slate-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results with Frosted Glass Cards */}
        <section id="results" className="relative py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  {isSearching ? `Hasil Pencarian` : 'Daftar Warga Padukuhan Puyang'}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-20 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Puyang Digital Map</span>
                </div>
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-emerald-600 hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)] transition-all active:scale-95 text-sm"
              >
                Reset Filter
              </button>
            </div>

            {filteredResidents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredResidents.map((res) => (
                  <HouseCard 
                    key={res.id} 
                    resident={res} 
                    onViewOnMap={handleViewOnMap}
                    isActive={activeResidentId === res.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white/20 backdrop-blur-3xl rounded-[3rem] border-2 border-dashed border-emerald-200 shadow-inner">
                <div className="text-6xl mb-6">🏜️</div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Tidak Ada Hasil</h3>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Cek kembali ejaan nama warga</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
