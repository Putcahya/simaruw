
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Resident } from '../types';

interface MapComponentProps {
  residents: Resident[];
  activeResidentId?: string | null;
}

export const MapComponent: React.FC<MapComponentProps> = ({ residents, activeResidentId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([-6.215, 106.845], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => map.removeLayer(marker));
    markersRef.current = {};

    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const activeIcon = L.divIcon({
      className: 'custom-div-icon active',
      html: `<div style="background-color: #0ea5e9; width: 28px; height: 28px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px rgba(14,165,233,0.4);"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    residents.forEach(res => {
      const isSelected = res.id === activeResidentId;
      const marker = L.marker([res.latitude, res.longitude], {
        icon: isSelected ? activeIcon : customIcon
      }).addTo(map);
      
      marker.bindPopup(`
        <div class="p-1">
          <strong class="text-emerald-700">${res.nama}</strong><br/>
          <span class="text-xs text-slate-500">RT ${res.rt} / RW ${res.rw}</span>
        </div>
      `);
      
      markersRef.current[res.id] = marker;
      
      if (isSelected) {
        marker.openPopup();
        map.setView([res.latitude, res.longitude], 16);
      }
    });

    if (!activeResidentId && residents.length > 0) {
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    return () => {
      // Cleanup if needed
    };
  }, [residents, activeResidentId]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-100 border border-emerald-50">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
