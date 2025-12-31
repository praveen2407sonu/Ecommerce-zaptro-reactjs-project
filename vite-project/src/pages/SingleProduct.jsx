import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrums from '../components/Breadcrums'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'
import axios from 'axios'

const SingleProduct = () => {
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  // Fallback images array
  const fallbackImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop'
  ]

  // Hardcoded mock products as backup
  const mockProducts = {
    1: {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 }
    },
    2: {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 }
    },
    3: {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 }
    },
    4: {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      rating: { rate: 2.1, count: 430 }
    },
    5: {
      id: 5,
      title: "Women's Gold & Silver Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.6, count: 400 }
    },
    6: {
      id: 6,
      title: "Solid Gold Petite Micropave",
      price: 168,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 3.9, count: 70 }
    },
    7: {
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 3, count: 400 }
    },
    8: {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 1.9, count: 100 }
    },
    9: {
      id: 9,
      title: "WD 2TB Elements Portable External Hard Drive",
      price: 64,
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      rating: { rate: 3.3, count: 203 }
    },
    10: {
      id: 10,
      title: "SanDisk SSD PLUS 1TB Internal SSD",
      price: 109,
      description: "Easy upgrade for faster boot up, shutdown, application load.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      rating: { rate: 2.9, count: 470 }
    }
  }

  const getSingleProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching product ID:', id)
      
      // First try to fetch from API
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      console.log('API Response:', res.data)
      
      if (res.data) {
        // If API returns data, use it
        const productData = res.data
        
        // If image is missing or empty, use fallback
        if (!productData.image || productData.image.trim() === '') {
          const randomIndex = Math.floor(Math.random() * fallbackImages.length)
          productData.image = fallbackImages[randomIndex]
        }
        
        setSingleProduct(productData)
      }
      
    } catch (error) {
      console.log('API Error, using mock data:', error)
      
      // If API fails, use mock data
      const productId = parseInt(id)
      if (mockProducts[productId]) {
        setSingleProduct(mockProducts[productId])
      } else {
        // If no mock data for this ID, use first product as fallback
        const fallbackProduct = mockProducts[1]
        fallbackProduct.title = `Product #${id}`
        fallbackProduct.description = `Description for product #${id}`
        setSingleProduct(fallbackProduct)
      }
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getSingleProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen text-xl'>
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-xl'>
        <p className="text-red-500 mb-4 text-2xl">Error loading product!</p>
        <button 
          onClick={getSingleProduct}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!singleProduct) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-xl'>
        <p className="text-red-500 mb-4 text-2xl">Product not found!</p>
      </div>
    )
  }

  // Calculate original price (20% more for display)
  const originalPrice = Math.round(singleProduct.price * 1.2)

  return (
    <div className='px-4 pb-4 md:px-0'>
      <Breadcrums title={singleProduct.title} />

      <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
        
        {/* IMAGE SECTION - GUARANTEED TO WORK */}
        <div className='w-full'>
          <div className='rounded-2xl w-full h-[400px] border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 shadow-md'>
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className='w-full h-full object-contain p-4'
              onError={(e) => {
                console.log('Image failed to load, using fallback')
                // If image fails to load, use fallback image
                const randomIndex = Math.floor(Math.random() * fallbackImages.length)
                e.target.src = fallbackImages[randomIndex]
              }}
            />
          </div>
          
          <div className='text-center mt-3 text-gray-500 text-sm'>
            Product #{singleProduct.id}
          </div>
        </div>

        {/* PRODUCT DETAILS SECTION */}
        <div className='flex flex-col gap-6'>
          <h1 className='md:text-3xl text-xl font-bold text-gray-800'>
            {singleProduct.title}
          </h1>

          <div className='flex items-center gap-2 text-gray-700'>
            <span className='font-semibold'>Category:</span> 
            <span className='bg-gray-100 px-3 py-1 rounded-full text-sm'>
              {singleProduct.category?.toUpperCase()}
            </span>
          </div>

          {/* RATING */}
          {singleProduct.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xl ${
                      i < Math.floor(singleProduct.rating.rate) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                <span className="font-semibold">{singleProduct.rating.rate}</span>/5 
                <span className="text-gray-500 ml-2">({singleProduct.rating.count} reviews)</span>
              </span>
            </div>
          )}

          {/* PRICE */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='text-3xl font-bold text-red-600'>
              ${singleProduct.price.toFixed(2)}
            </div>
            <div className='flex items-center gap-3 mt-2'>
              <span className='line-through text-gray-500 text-lg'>
                ${originalPrice.toFixed(2)}
              </span>
              <span className='bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                Save ${(originalPrice - singleProduct.price).toFixed(2)}
              </span>
              <span className='text-green-600 font-semibold'>
                20% OFF
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className='mt-2'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>Product Description</h3>
            <p className='text-gray-600 leading-relaxed'>
              {singleProduct.description}
            </p>
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={() => {
              addToCart(singleProduct)
              alert(`${singleProduct.title} added to cart!`)
            }}
            className='px-8 flex items-center justify-center gap-3 py-3 text-lg bg-red-500 text-white rounded-lg w-full hover:bg-red-600 transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02] duration-200'
          >
            <IoCartOutline className='w-6 h-6' />
            <span className='font-semibold'>Add to Cart</span>
          </button>

          {/* ADDITIONAL INFO */}
          <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
            <h3 className='font-semibold text-gray-800 mb-3'>Features & Benefits</h3>
            <ul className='text-gray-600 space-y-2'>
              <li className='flex items-start gap-2'>
                <span className='text-green-500'>✓</span>
                <span>Free shipping on orders over $50</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500'>✓</span>
                <span>30-day return policy</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500'>✓</span>
                <span>Authentic product guarantee</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-500'>✓</span>
                <span>24/7 customer support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct