import React from 'react'
import { Admin, Resource, CreateBase } from 'react-admin'

import CustomLayout from '../components/CustomLayout'
import CategoryList from '../components/categories/CategoryList'
import CategoryCreate from '../components/categories/CategoryCreate'
import CategoryEdit from '../components/categories/CategoryEdit'
import CategoryShow from '../components/categories/CategoryShow'

import dataProvider from '../utils/dataProvider'

const Dashboard = () => {
  return (
    <Admin layout={CustomLayout} dataProvider={dataProvider} >
      <Resource name='category' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} show={CategoryShow} hasEdit={true} hasShow={true} />
    </Admin>
  )
}

export default Dashboard
