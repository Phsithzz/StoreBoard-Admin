
const ProductDetailSkeleton = () => {
  return (
<div className="max-w-3xl mx-auto space-y-6">
      
      <div className="skeleton h-64 w-full rounded-xl" />

      <div className="space-y-4">
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-6 w-1/2" />
      </div>

      <div className="flex gap-4">
        <div className="skeleton h-10 w-24" />
        <div className="skeleton h-10 w-24" />
      </div>

    </div>
  )
}

export default ProductDetailSkeleton