import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { category } = useParams()
  const navigate = useNavigate()

  const getFilterData = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      )

      console.log('CATEGORY PRODUCTS 👉', res.data)
      setProducts(res.data)

    } catch (err) {
      console.error(err)
      setError('Failed to fetch products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFilterData()
    window.scrollTo(0, 0)
  }, [category])

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className='flex justify-center items-center h-[400px]'>
        <div className='animate-spin h-12 w-12 border-b-2 border-red-500 rounded-full'></div>
      </div>
    )
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className='text-center mt-20'>
        <p className='text-red-500 font-semibold'>{error}</p>
        <button
          onClick={getFilterData}
          className='mt-4 bg-red-500 text-white px-4 py-2 rounded-md'
        >
          Retry
        </button>
      </div>
    )
  }

  /* ---------------- SUCCESS ---------------- */
  return (
    <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
      <button
        onClick={() => navigate(-1)}
        className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md flex items-center gap-1'
      >
        <ChevronLeft /> Back
      </button>

      <h1 className='text-2xl font-bold mb-6 capitalize'>
        Category: {category} ({products.length} products)
      </h1>

      {products.length > 0 ? (
        <div className='space-y-4'>
          {products.map(product => (
            <ProductListView key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>No products found</p>
      )}
    </div>
  )
}

export default CategoryProduct
