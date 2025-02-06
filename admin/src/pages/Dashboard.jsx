import React from 'react'
import { Admin, Resource } from 'react-admin'

import CustomLayout from '../components/CustomLayout'

const Dashboard = () => {

  return (
    <Admin layout={CustomLayout}>
      <Resource name='details' />
    </Admin>
  )
}

export default Dashboard
