import React from 'react'
import { Admin, Resource } from 'react-admin'

import CustomLayout from '../components/CustomLayout'
import { CategoryList, CategoryShow, CategoryCreate, CategoryEdit } from '../components/category'
import { ProductList, ProductShow, ProductCreate, ProductEdit } from '../components/product'

import dataProvider from '../utils/dataProvider'

const Dashboard = () => {
  return (
    <Admin layout={CustomLayout} dataProvider={dataProvider} >
      <Resource name='product' list={ProductList} create={ProductCreate} edit={ProductEdit} show={ProductShow} />
      <Resource name='category' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} show={CategoryShow} hasEdit={true} hasShow={true} recordRepresentation='name'  />
    </Admin>
  )
}

export default Dashboard
