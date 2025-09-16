import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type { Place, Pending } from "../types/models"; 

// -------------------
// Context Types
// -------------------
interface ListingsContextType {
  places: Place[];
  pendings: Pending[];
  loading: boolean;
  error: string | null;

  fetchPlaces: () => Promise<void>;
  fetchPendings: () => Promise<void>;

  createPlace: (data: Partial<Place>) => Promise<Place | null>;
  createPending: (data: Partial<Pending>) => Promise<Pending | null>;

  updatePlace: (id: string, data: Partial<Place>) => Promise<Place | null>;
  deletePlace: (id: string) => Promise<boolean>;

  // Admin actions
  approvePending: (id: string) => Promise<Place | null>;
  rejectPending: (id: string) => Promise<boolean>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

// -------------------
// Provider Component
// -------------------
export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [places, setPlaces] = useState<Place[]>([]); // ✅ not undefined
  const [pendings, setPendings] = useState<Pending[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // -------------------
  // API Calls
  // -------------------
  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Place[]>(`${API_BASE}/places`);
      setPlaces(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendings = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Pending[]>(`${API_BASE}/pendings`);
      setPendings(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPlace = async (data: Partial<Place>) => {
    try {
      const res = await axios.post<Place>(`${API_BASE}/places`, data);
      setPlaces((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const createPending = async (data: Partial<Pending>) => {
    try {
      const res = await axios.post<Pending>(`${API_BASE}/pendings`, data);
      setPendings((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updatePlace = async (id: string, data: Partial<Place>) => {
    try {
      const res = await axios.put<Place>(`${API_BASE}/places/${id}`, data);
      setPlaces((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const deletePlace = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/places/${id}`);
      setPlaces((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // -------------------
  // Admin Actions
  // -------------------
  const approvePending = async (id: string) => {
    try {
      // backend moves Pending -> Place automatically
      const res = await axios.post<Place>(`${API_BASE}/pendings/approve/${id}`);
      
      // remove from pendings list
      setPendings((prev) => prev.filter((p) => p.id !== id));
      // add to places list
      setPlaces((prev) => [...prev, res.data]);
  
      return res.data;
    } catch (err) {
      console.error("Failed to approve pending:", err);
      return null;
    }
  };
  
  const rejectPending = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/pendings/reject/${id}`);
      setPendings((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to reject pending:", err);
      return false;
    }
  };
  
  // optional stricter admin reject
  const adminRejectPending = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/pendings/adminReject/${id}`);
      setPendings((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to admin reject pending:", err);
      return false;
    }
  };
  // -------------------
  // Auto-fetch on mount
  // -------------------
  useEffect(() => {
    fetchPlaces();
    fetchPendings();
  }, []);

  return (
    <ListingsContext.Provider
      value={{
        places,
        pendings,
        loading,
        error,
        fetchPlaces,
        fetchPendings,
        createPlace,
        createPending,
        updatePlace,
        deletePlace,
        approvePending,
        rejectPending,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

// -------------------
// Custom Hook
// -------------------
export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error("useListings must be used inside ListingsProvider");
  }
  return context;
};
