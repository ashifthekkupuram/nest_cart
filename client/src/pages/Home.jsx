import React, { useState } from 'react'
import { CiFilter } from 'react-icons/ci'
import { useQuery } from '@tanstack/react-query'

import Product from '../components/Product'

import api from '../api/axios'

const Home = () => {

  const [search, setSearch] = useState('')

  const { data } = useQuery({ queryKey: ['products'], queryFn: async () => {
    const response = await api.get('/product')
    return response.data.data
  } })

  return (
    <div className='flex flex-col px-1 py-2 md:px-10'>
      {/* Top Section */}
      <div className='flex justify-center items-center gap-1 w-full mb-2'>
          <input className='w-full' value={search} type="text" id='search' name='search' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
          <CiFilter className='text-4xl transition-all text-[#FFB200] hover:text-[#EB5B00]' />
      </div>
      { /* Products Section */ }
      <div className='grid justify-between grid-cols-1 gap-4 md:grid-cols-4'>
        { data && data.map((product) => <Product product={product} key={product._id} />) }
      </div>
    </div>
  )
}

export default Home
