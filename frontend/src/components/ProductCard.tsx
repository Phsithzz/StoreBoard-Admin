import { Link } from "react-router-dom";
import type { Product } from "../types/productType";
import { EditIcon, TrashIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import imageUrlError from "../assets/images/imageUrlError.jpg";
import { useState } from "react";
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { deleteProduct } = useProductStore();
    const [isOpen, setIsOpen] = useState(false);
      const handleDelete = async () => {
    await deleteProduct(product.id);
    setIsOpen(false);
  };
  return (
    <>    <div
      className="bg-white rounded-xl border-6 border-black
    shadow-[6px_6px_0px_black] "
    >
      <figure className="relative pt-[56.25%]">
        <img
          src={product?.image || imageUrlError}
          alt={product?.name || "product image error"}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = imageUrlError;
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>

        <p className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-accent btn-outline border-2 border-black
    shadow-[2px_2px_0px_black]"
          >
            <EditIcon className="size-4" />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-sm bg-red-500 text-white btn-outline
                 border-2 border-black shadow-[2px_2px_0px_black]
                 transition-all ease-in 
                 hover:bg-red-400 
                 "
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
     {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 border-6 border-black shadow-[6px_6px_0px_black] w-80">
            <h3 className="text-lg font-bold mb-3">
              Confirm Delete
            </h3>
            <p className="text-sm mb-6">
              Are you sure you want to delete{"  "}
              <span className="font-semibold">
                {product.name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="btn border-4 border-black
                shadow-[4px_4px_0px_black] hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="btn bg-red-500 text-white border-4 border-black
                shadow-[4px_4px_0px_black]
                hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </>

  );
};

export default ProductCard;
