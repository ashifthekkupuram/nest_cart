import './home.scss'
import { useQuery } from '@tanstack/react-query'

import api from '../../api/api'

const Home = () => {

  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get('/admin')
      return response.data.data
    } 
  })

  return (
    <div className='home'>
      <div className="title">
        <h1>Dashboard</h1>
      </div>
      { data && <div className="dashboard">
        <h1>Users: {data.usersCount}</h1>
        <h1>Products: {data.productsCount}</h1>
        <h1>Orders: {data.ordersCount}</h1>
        <h1>Pending Orders: {data.deliveredOrdersCount}</h1>
        <h1>Delivered Orders: {data.pendingOrdersCount}</h1>
      </div> }
    </div>
  )
}

export default Home
