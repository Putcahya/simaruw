
export interface Resident {
  id: string;
  nama: string;
  rt: string;
  rw: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface SearchState {
  query: string;
  results: Resident[];
}
