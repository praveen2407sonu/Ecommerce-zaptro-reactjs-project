import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ShoppingCart } from 'lucide-react'

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    // Optional: Show a toast notification
  }

  return (
    <div className='mt-3'>
      <div className='bg-gray-100 flex flex-col md:flex-row gap-6 items-center p-4 rounded-md shadow-md hover:shadow-lg transition-shadow'>
        
        {/* PRODUCT IMAGE */}
        <div 
          className='cursor-pointer'
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.title}
            className='h-48 w-48 object-contain rounded-md hover:scale-105 transition-transform'
          />
        </div>

        <div className='flex-1 space-y-3'>
          <h1 
            className='font-bold text-lg hover:text-red-500 cursor-pointer'
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.title}
          </h1>

          <div className='flex items-center gap-4'>
            <p className='font-semibold text-red-600 text-xl'>
              ${product.price}
            </p>
            {product.discount && (
              <span className='bg-green-100 text-green-800 px-2 py-1 rounded text-sm'>
                {product.discount}% off
              </span>
            )}
          </div>

          <p className='text-gray-600 line-clamp-2'>
            {product.description || 'No description available'}
          </p>

          <div className='flex gap-4'>
            <button
              onClick={handleAddToCart}
              className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors'
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            
            <button
              onClick={() => navigate(`/products/${product.id}`)}
              className='border border-red-500 text-red-500 hover:bg-red-50 px-6 py-2 rounded-md transition-colors'
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListView