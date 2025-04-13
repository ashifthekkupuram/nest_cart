import './orders.scss'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataGrid } from '@mui/x-data-grid'

import Address from '../../components/address/Address'
import OrderItems from '../../components/orderitems/OrderItems'

import api from '../../api/api'

const Orders = () => {

  const [openAddress, setOpenAddress] = useState({ open: false, data: null })
  const [openItems, setOpenItems] = useState({ open: false, data: null })

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/order/all')
      return response.data.data
    }
  })

  const columns = [
    {
      field: 'customername',
      headerName: 'Customer Name',
      width: 150,
      renderCell: (params) => {
        console.log(params.row)
        return `${params.row.customer.name.firstName} ${params.row.customer.name.secondName}`
      }
    },
    {
      field: 'email',
      headerName: 'Customer Email',
      width: 150,
      renderCell: (params) => {
        console.log(params.row)
        return `${params.row.customer.email.email}`
      }
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 150
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 80,
      renderCell: (params) => {

        const onAddressView = () => {
          setOpenAddress({ open: true, data: params.row.address })
        }

        return <div className='actions'>
          <img onClick={onAddressView} src="view.svg" alt="" title='view addresses' />
        </div>
      }
    },
    {
      field: 'items',
      headerName: 'Items',
      width: 80,
      renderCell: (params) => {

        const onItemsView = () => {
          setOpenItems({ open: true, data: params.row.order_items })
        }

        return <div className='actions'>
          <img onClick={onItemsView} src="view.svg" alt="" title='view addresses' />
        </div>
      }
    },
    {
      field: 'paid',
      headerName: 'Paid',
      width: 100,
      renderCell: (params) => {
        return params.row.paid ? <img className='admin-icons' src='true.svg' /> : <img className='admin-icons' src='false.svg' />
      }
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      width: 100
    },
  ]

  return (
    <div className='orders'>
      <div className="title">
        <h1>Orders</h1>
      </div>
      <DataGrid
        sx={{ backgroundColor: 'white' }}
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
      {openAddress.open && <Address setOpen={setOpenAddress} data={openAddress.data} />}
      {openItems.open && <OrderItems setOpen={setOpenItems} data={openItems.data} />}
    </div>
  )
}

export default Orders
