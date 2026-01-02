import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../context/DataContext'

const Category = () => {
  const navigate = useNavigate()
  const { data, fetchAllProducts } = getData()

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property]
    })
    newVal = [...new Set(newVal)]
    return newVal
  }

  const categoryOnlyData = getUniqueCategory(data, "category")

  useEffect(() => {
    fetchAllProducts()
  }, [])

  // const handleCategoryClick = (category) => {
  //   navigate(`/category/${category}`)
  // }


  const handleCategoryClick = (category) => {
  navigate(`/category/${encodeURIComponent(category.toLowerCase())}`)
}


  return (
    <div className='bg-[#101829]'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4'>
        {
          categoryOnlyData?.map((item, index) => {
            return (
              <div key={index}>
                <button 
                  onClick={() => handleCategoryClick(item)} 
                  className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200'
                >
                  {item}
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Category