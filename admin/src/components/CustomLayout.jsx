import React from 'react'
import { Layout } from 'react-admin'

import Navbar from './Navbar'

const CustomLayout = ({ children }) => {
  return (
    <Layout appBar={Navbar}>
      { children }
    </Layout>
  )
}

export default CustomLayout
