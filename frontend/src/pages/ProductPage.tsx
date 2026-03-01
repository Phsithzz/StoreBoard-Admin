import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailSkeleton from '../components/ProductDetailSkeleton'
import { ArrowLeftIcon } from 'lucide-react'

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
  } = useProductStore()

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    if(id){
      fetchProduct(Number(id))
    }
  },[fetchProduct,id])

  if(loading){
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailSkeleton/>
      </div>
    )
  }

  if(error){
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
      onClick={()=>navigate("/")}
      className='btn btn-ghost mb-8' 

      >
        <ArrowLeftIcon className='size-4 mr-2'/>
        Back to Products
      </button>
    </div>
  )
}

export default ProductPage