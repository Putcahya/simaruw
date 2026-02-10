
import React from 'react';
import { Resident } from '../types';
import { HomeIcon } from './Icons';

interface HouseCardProps {
  resident: Resident;
  onViewOnMap: (id: string) => void;
  isActive?: boolean;
}

export const HouseCard: React.FC<HouseCardProps> = ({ resident, onViewOnMap, isActive }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${resident.latitude},${resident.longitude}`;

  return (
    <div className={`group transition-all duration-300 p-5 rounded-2xl border ${isActive ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500/20 shadow-lg' : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 shadow-sm'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
          <HomeIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</span>
          <span className="text-sm font-semibold text-emerald-600">RT {resident.rt} / RW {resident.rw}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{resident.nama}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        {resident.address}
      </p>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onViewOnMap(resident.id)}
          className="flex-1 text-xs font-semibold py-2.5 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
          Lihat di Peta
        </button>
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-xs font-semibold py-2.5 px-4 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-md shadow-emerald-200 flex items-center justify-center gap-2 text-center"
        >
          Navigasi G-Maps
        </a>
      </div>
    </div>
  );
};
