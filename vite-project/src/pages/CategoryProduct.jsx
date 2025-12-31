import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { category } = useParams()
  const navigate = useNavigate()

  const getFilterData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/category?type=${category}`
      )

      console.log('CATEGORY DATA 👉', res.data)

      if (res.data && res.data.products && Array.isArray(res.data.products)) {
        setSearchData(res.data.products)
      } else {
        setError("No products found in this category")
        setSearchData([])
      }

    } catch (error) {
      console.log(error)
      setError("Failed to fetch products. Please try again.")
      setSearchData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFilterData()
    window.scrollTo(0, 0)
  }, [category])

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-[400px]'>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
        <p>Loading products for {category}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
        <button
          onClick={() => navigate(-1)}
          className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md flex gap-1 items-center'
        >
          <ChevronLeft /> Back
        </button>
        <div className='text-center py-10'>
          <p className='text-red-500 text-lg font-semibold'>{error}</p>
          <button 
            onClick={getFilterData}
            className='mt-4 bg-red-500 text-white px-4 py-2 rounded-md'
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
        
        <button
          onClick={() => navigate(-1)}
          className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md flex gap-1 items-center'
        >
          <ChevronLeft /> Back
        </button>

        <h1 className='text-2xl font-bold mb-6 capitalize'>Category: {category} ({searchData.length} products)</h1>

        {searchData.length > 0 ? (
          <div className='space-y-4'>
            {searchData.map((product) => (
              <ProductListView key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-10'>
            <p className='text-gray-600'>No products found in this category.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default CategoryProduct