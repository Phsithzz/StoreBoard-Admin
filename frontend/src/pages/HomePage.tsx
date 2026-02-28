import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { PlusCircleIcon, RefreshCwIcon } from 'lucide-react'

import ProductCardSkeleton from '../components/ProductCardSkeleton'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
   const {products,loading,error,fetchProducts} = useProductStore()

    useEffect(()=>{
        fetchProducts()
    },[fetchProducts])

 

  return (
  <main className="mx-auto max-w-6xl px-4 py-8">
  
    <div className="flex justify-between items-center mb-8">

    <button className="btn btn-primary">
      <PlusCircleIcon className="size-5 mr-2 "/>
      Add Product
    </button>

    <button 
    onClick={fetchProducts}
    className="btn btn-ghost btn-circle">
      <RefreshCwIcon className='size-5 '/>
    </button>

    </div>
     
     {error && <div className='alert alert-error mb-8'>{error}</div>}

    {loading ?(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
    ):(
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product)=>(
          <ProductCard key={product.id} product={product} />
        ))}
        
      </div>
    )}
</main>

  )
}

export default HomePage