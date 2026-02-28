import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'

const ProductPage = () => {

    const {products,loading,error,fetchProducts} = useProductStore()

    useEffect(()=>{
        fetchProducts()
    },[fetchProducts])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      {products.map((item) => (
        <div key={item.id}>
          {item.name} - {item.price}
        </div>
      ))}
    </div>



  )
}

export default ProductPage


