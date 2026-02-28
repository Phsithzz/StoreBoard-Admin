import axios from "axios";
import { create } from "zustand";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({

  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {

    set({ loading: true, error: null });
    
    try {

      const res = await axios.get(`${BASE_URL}/products`);
      set({ products: res.data.data, error: null });

    } catch (err) {

  if (axios.isAxiosError(err)) {

    if (err.response?.status === 429) {
      set({ error: "Rate limit exceeded" });
    } else {
      set({ error: err.message });
    }

  } else {
    set({ error: "Unexpected error occurred" });
  }

    } finally {

      set({ loading: false });

    }
  },
}));
