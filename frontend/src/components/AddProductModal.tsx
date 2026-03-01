import {
  DollarSignIcon,
  ImageIcon,
  PackageIcon,
  PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const AddProductModal = () => {
  const { formData, setFormData, addProduct, loading } = useProductStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addProduct();
    (
      document.getElementById("add_product_modal") as HTMLDialogElement
    )?.close();
  };
  return (
    <dialog id="add_product_modal" className="modal">
      <div
        className="modal-box border-6 shadow-[6px_6px_0px_black] 
     "
      >
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
            X
          </button>
        </form>

        <h1 className="font-bold text-xl mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="form-control">
              <label className="label label-text text-base font-semibold">
                Product Name
              </label>

              <div className="relative">
                <div
                  className="absolute inset-y-0 right-4 z-10
                            pl-3 flex items-center pointer-events-none
                            text-base-content/50"
                >
                  <PackageIcon className="size-5 " />
                </div>
                <input
                  type="text"
                  placeholder="Enter product Name"
                  className="input outline-none w-full  py-4 pr-10
                            focus:input-primary transition-colors
                            duration-200  border-4 border-black
    shadow-[4px_4px_0px_black]
                            "
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label label-text text-base font-semibold">
                Price
              </label>

              <div className="relative">
                <div
                  className="absolute inset-y-0 right-4 z-10
                            pl-3 flex items-center pointer-events-none
                            text-base-content/50"
                >
                  <DollarSignIcon className="size-5" />
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="input  w-full  py-4  border-4 border-black
    shadow-[4px_4px_0px_black]
                            focus:input-primary transition-colors
                            duration-200 appearance-none outline-none
                            "
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label label-text text-base font-semibold">
                Image Url
              </label>

              <div className="relative">
                <div
                  className="absolute inset-y-0 right-4 z-10
                            pl-3 flex items-center pointer-events-none
                            text-base-content/50"
                >
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="http://example.com/image.jpg"
                  className="input input-bordered w-full py-4 
                            focus:input-primary transition-colors 
                            duration-200 outline-none  border-4 border-black
    shadow-[4px_4px_0px_black]
                            "
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={() =>
                  (
                    document.getElementById(
                      "add_product_modal",
                    ) as HTMLDialogElement
                  )?.close()
                }
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !formData.name ||
                  !formData.price ||
                  !formData.image ||
                  loading
                }
                className="btn btn-accent btn-outline border-4 border-black
        shadow-[4px_4px_0px_black]  min-w-30"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <PlusCircleIcon className="size-5 mr-2" />
                    Add Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default AddProductModal;
