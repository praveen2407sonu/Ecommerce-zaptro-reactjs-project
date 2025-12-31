import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrums from '../components/Breadcrums'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'

const SingleProduct = () => {
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)
  const { addToCart } = useCart()

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products/${id}`
      )

      console.log('API RESPONSE ', res.data)

      // ✅ CORRECT DATA
      setSingleProduct(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct()
  }, [id])

  if (!singleProduct) {
    return (
      <div className='flex items-center justify-center h-screen text-xl'>
        Loading...
      </div>
    )
  }

  const originalPrice = Math.round(
    singleProduct.price +
      (singleProduct.price * singleProduct.discount) / 100
  )

  return (
    <div className='px-4 pb-4 md:px-0'>
      <Breadcrums title={singleProduct.title} />

      <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Image */}
        <div className='w-full'>
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className='rounded-2xl w-full object-cover'
          />
        </div>

        {/* Details */}
        <div className='flex flex-col gap-6'>
          <h1 className='md:text-3xl text-xl font-bold text-gray-800'>
            {singleProduct.title}
          </h1>

          <div className='text-gray-700'>
            {singleProduct.brand?.toUpperCase()} /
            {singleProduct.category?.toUpperCase()} /
            {singleProduct.model}
          </div>

          <p className='text-xl text-red-500 font-bold'>
            ${singleProduct.price}{' '}
            <span className='line-through text-gray-700'>
              ${originalPrice}
            </span>{' '}
            <span className='bg-red-500 text-white px-4 py-2 rounded-full'>
              {singleProduct.discount}% discount
            </span>
          </p>

          <p className='text-gray-600'>{singleProduct.description}</p>

          <button
            onClick={() => addToCart(singleProduct)}
            className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md w-fit'
          >
            <IoCartOutline className='w-6 h-6' />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
