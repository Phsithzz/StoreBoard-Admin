import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";
import imageUrlError from "../assets/images/imageUrlError.jpg";
const ProductPage = () => {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (!id) return;
    await deleteProduct(Number(id));
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentProduct?.image || imageUrlError}
            alt={currentProduct?.name || "product image error"}
                   onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = imageUrlError;
  }}
            className="size-full object-cover border-8 border-black
 "
          />
        </div>

        <div
          className="
          border-6 border-black
    shadow-[6px_6px_0px_black]
        card bg-base-100 "
        >
          <div
            className="
          card-body"
          >
            <h1 className="card-title text-2xl mb-6">Edit Product</h1>

            <form
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                await updateProduct(Number(id));
              }}
              className="space-y-6"
            >
              <div className="form-control">
                <label className="label label-text text-base font-semibold">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input 
              outline-none
               border-4 border-black
    shadow-[4px_4px_0px_black] w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label label-text text-base font-semibold">
                  Price
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="input 
              outline-none
              border-4 border-black
    shadow-[4px_4px_0px_black] w-full"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label label-text text-base font-semibold">
                  Image Url
                </label>
                <input
                  type="text"
                  placeholder="http://example.com/image.jpg"
                  className="input 
              outline-none
             border-4 border-black
    shadow-[4px_4px_0px_black] w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() =>
                    (
                      document.getElementById(
                        "delete_modal",
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                  className="btn bg-red-500 border-4 border-black
    shadow-[4px_4px_0px_black] text-white transition-all ease-in 
                 hover:bg-red-400"
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn btn-accent btn-outline border-4 border-black
    shadow-[4px_4px_0px_black]"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <dialog id="delete_modal" className="modal ">
        <div className="modal-box border-6 border-black shadow-[6px_6px_0px_black]">
          <h3 className="font-bold text-lg mb-4">Delete Product</h3>
          <p className="mb-6">
            Are you sure you want to delete this product? 
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>

            <button
              className="btn bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_black] 
            transition-all ease-in hover:bg-red-400"
              onClick={handleDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProductPage;
