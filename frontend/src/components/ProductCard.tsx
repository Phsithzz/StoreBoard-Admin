import { Link } from "react-router-dom"
import type { Product } from "../types/productType"
import { EditIcon, TrashIcon } from "lucide-react"
import { useProductStore } from "../store/useProductStore"

interface ProductCardProps{
    product:Product
}

const ProductCard = ({product}:ProductCardProps) => {
    const {deleteProduct} = useProductStore()
    return (
    <div className="bg-white rounded-xl border-6 border-black
    shadow-[6px_6px_0px_black] ">

        <figure className="relative pt-[56.25%]">
            <img src={product.image} alt={product.name} 
            className="absolute top-0 left-0 w-full h-full object-cover"/>
        </figure>

        <div className="card-body">

            <h2 className="card-title text-lg font-semibold">
                {product.name}
            </h2>

            <p className="text-2xl font-bold text-primary">
                ${Number(product.price).toFixed(2)}
            </p>

            <div className="card-actions justify-end mt-4">

                <Link to={`/product/${product.id}`} 
                className="btn btn-sm btn-accent btn-outline border-2 border-black
    shadow-[2px_2px_0px_black]">
                    <EditIcon className="size-4"/>
                </Link>

                <button 
                 onClick={()=>deleteProduct(product.id)}
                className="btn btn-sm bg-red-500 text-white btn-outline
                 border-2 border-black shadow-[2px_2px_0px_black]
                 transition-all ease-in 
                 hover:bg-red-400 
                 ">
                    <TrashIcon 
                   
                    className="size-4"/>
                </button>


            </div>

        </div>


    </div>
  )
}

export default ProductCard