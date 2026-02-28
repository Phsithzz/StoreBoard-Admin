import axios from "axios";

import { create } from "zustand";

import type * as productType from "../types/productType";
import type { ApiResponse } from "../types/api";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create<productType.ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),

  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async () => {
 
    set({ loading: true, error: null });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product add succesfully");
      
    } catch (err) {
      console.log("Error in addProduct", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get<ApiResponse<productType.Product[]>>(
        `${BASE_URL}/products`,
      );
      set({ products: res.data.data, error: null });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 429) {
          set({ error: "Rate limit exceeded", products: [] });
        } else {
          set({ error: err.message, products: [] });
        }
      } else {
        set({ error: "Unexpected error occurred" });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.log("Errror", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
