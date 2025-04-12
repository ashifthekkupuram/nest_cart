import React, { useEffect, useState } from 'react'
import { CiFilter } from 'react-icons/ci'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import Product from '../components/Product'
import Spinner from '../components/Spinner'

import api from '../api/axios'

const Home = () => {

  const [search, setSearch] = useState('')
  const { ref, inView } = useInView()

  const { data, status, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['products', search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get('/product', { params: { page: pageParam, search: search.trim() } })
      return response.data.data
    },
    getNextPageParam: (lastPage, pages) => {
      lastPage.hasNextPage ? pages.length + 1 : undefined
    }
  })

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  return (
    <div className='flex flex-col px-1 py-2 md:px-10'>
      {/* Top Section */}
      <div className='flex justify-center items-center gap-1 w-full mb-2'>
        <input className='w-full' value={search} type="text" id='search' name='search' onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
        <CiFilter className='text-4xl transition-all text-[#FFB200] hover:text-[#EB5B00]' />
      </div>
      { /* Products Section */}
      {status === 'pending' ? <Spinner size={64} /> : status === 'error' ? <div className='text-3xl text-red-600 font-bold capitalize self-center'>{error.response.data.message || 'Internal Server Error'}</div> :
        <div className='grid justify-between grid-cols-1 gap-4 md:grid-cols-4'>
          {data.pages.map((page, index) => {
            return <React.Fragment key={index}>
              {page.data.map((product) => <Product key={product._id} product={product} />)}
            </React.Fragment>
          })}</div>
      }
      <div ref={ref}></div>
      {isFetchingNextPage && <Spinner />}
    </div>
  )
}

export default Home
