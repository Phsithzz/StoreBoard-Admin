import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";

import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

const HomePage = () => {
  const { products, loading, error, fetchProducts ,resetForm} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button 
      onClick={() => {
        resetForm(); 
  const modal = document.getElementById(
    "add_product_modal"
  ) as HTMLDialogElement | null;

  modal?.showModal();
}}
        className="btn btn-accent btn-outline border-4 border-black
        shadow-[4px_4px_0px_black] 
 ">
          <PlusCircleIcon className="size-5 mr-2    " />
          Add Product
        </button>

        <button onClick={fetchProducts} className="btn btn-ghost btn-circle">
          <RefreshCwIcon className="size-5 " />
        </button>
      </div>
      <AddProductModal />
      {error && <div className="alert alert-error mb-8">{error}</div>}
      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>

          <h1 className="text-2xl font-semibold">No Products Found</h1>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
