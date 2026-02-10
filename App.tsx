
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchIcon } from './components/Icons';
import { MapComponent } from './components/MapComponent';
import { HouseCard } from './components/HouseCard';
import { RESIDENTS } from './data/residentData';

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Map */}
        <section className="relative pt-8 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                SIMARUW<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-sky-500">
                  Padukuhan Puyang
                </span>
              </h1>
              <p className="text-slate-500 text-lg">
                Sistem Informasi Maps Rumah Warga yang akurat dan terintegrasi dengan Google Maps.
              </p>
            </div>

            {/* Search Input Floating */}
            <div className="relative max-w-xl group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="text"
                placeholder="Cari nama warga..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-emerald-100 shadow-xl shadow-emerald-50 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Map Column */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                <MapComponent 
                  residents={filteredResidents} 
                  activeResidentId={activeResidentId} 
                />
              </div>

              {/* Quick Info Column */}
              <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col justify-center gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-200">
                  <h3 className="text-xl font-bold mb-2">Informasi Sistem</h3>
                  <p className="text-emerald-50 text-sm leading-relaxed">
                    Menampilkan {filteredResidents.length} dari {RESIDENTS.length} total warga yang terdaftar dalam sistem pemetaan.
                  </p>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Panduan Penggunaan
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-emerald-500">1.</span>
                      Ketik nama warga pada kotak pencarian di atas.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-emerald-500">2.</span>
                      Klik "Lihat di Peta" untuk memfokuskan lokasi.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-emerald-500">3.</span>
                      Klik "Navigasi" untuk membuka rute di aplikasi Google Maps.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="bg-emerald-50/30 py-20 px-4 md:px-8 border-t border-emerald-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {isSearching ? `Hasil Pencarian: "${searchQuery}"` : 'Daftar Seluruh Rumah Warga'}
                </h2>
                <p className="text-slate-500">
                  {filteredResidents.length} lokasi ditemukan di sistem SIMARUW Padukuhan Puyang.
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            </div>

            {filteredResidents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                  <SearchIcon className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Nama tidak ditemukan</h3>
                <p className="text-slate-400 text-sm">Coba masukkan kata kunci pencarian lainnya.</p>
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
