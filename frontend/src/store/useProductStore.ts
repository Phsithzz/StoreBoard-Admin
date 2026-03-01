import axios from "axios";

import { create } from "zustand";

import * as productType from "../types/productType";
import type { ApiResponse } from "../types/api";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create<productType.ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct:null,

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
      const payload = {
        ...formData,
        price:Number(formData.price)
      }
      await axios.post<ApiResponse<productType.Product>>(`${BASE_URL}/products`, payload);
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

  deleteProduct: async (id:number) => {
    set({ loading: true, error: null });
    try {
      await axios.delete<ApiResponse<productType.Product>>(`${BASE_URL}/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.log("Error in deleteProduct", err);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  
  fetchProduct:async(id:number)=>{
    set({loading:true,error:null})

    try {
      const res = await axios.get<ApiResponse<productType.Product>>(`${BASE_URL}/products/${id}`)
      const product = res.data.data
      set({
        currentProduct:product,
        formData:{
          name:product.name,
          image:product.image,
          price:product.price.toString()
        },
        error:null
      })

    } catch (err) {

      console.log("Error in fetchProduct",err)
      set({error:"Something went wrong",currentProduct:null})

    }
    finally{
      set({loading:false})
    }
  },

  updateProduct:async(id:number)=>{
    set({loading:true,error:null})

    try {
      
      const {formData} = get()
      const payload = {
        ...formData,
        price:Number(formData.price)
      }
      const res = await axios.put<ApiResponse<productType.Product>>(`${BASE_URL}/products/${id}`,payload)
      set({currentProduct:res.data.data})
      toast.success("Product update successfully")

    } catch (err) {
      console.log("Error in updateProduct",err)
      toast.error("Something went wrong")
      
    }
    finally{
      set({loading:false})
    }
  }

}));
