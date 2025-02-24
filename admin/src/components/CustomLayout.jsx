import React from 'react'
import { Layout } from 'react-admin'

import Navbar from './Navbar'
import Menu from './Menu'

const CustomLayout = ({ children }) => {
  return (
    <Layout appBar={Navbar} menu={Menu}>
      { children }
    </Layout>
  )
}

export default CustomLayout
