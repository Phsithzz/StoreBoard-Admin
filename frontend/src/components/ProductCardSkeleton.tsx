const ProductCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 space-y-4">
      
      <div className="skeleton h-48 w-full rounded-lg" />
      
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
      
      <div className="skeleton h-8 w-full mt-4" />

    </div>
  )
}

export default ProductCardSkeleton