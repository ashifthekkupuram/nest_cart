import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import './products.scss'

import api from '../../api/api'
import AddProduct from '../../components/add/AddProduct'
import DeleteProduct from '../../components/delete/DeleteProduct'
import UpdateProduct from '../../components/update/UpdateProduct'
import Reviews from '../../components/reviews/Reviews'

const PAGE_SIZE = 12

const Products = () => {

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState({ open: false, data: null })
  const [openDelete, setOpenDelete] = useState({ open: false, id: '', name: '' })
  const [openReviews, setOpenReviews] = useState({ open: false, productId: '' })

  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/product', { params: { adminPage: true } })
      return response.data.data.data
    }
  })

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'images',
      headerName: 'Image',
      renderCell: (params) => {
        return <img className='titleImage' src={params.row.images[0]} />
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 200,
      renderCell: (params) => {

        return <div className="titleCategories">
          {params.row.categories.map((category) => <span>{category.name},</span>)}
        </div>
      }
    },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => {

        const onDelete = () => {
          setOpenDelete({ open: true, id: params.row._id, name: params.row.name })
        }

        const onEdit = () => {
          setOpenEdit({ open: true, data: params.row })
        }

        return <div className='actions'>
          <img onClick={onDelete} src="delete.svg" alt="" title='delete' />
          <img onClick={onEdit} src="edit.svg" alt="" title='edit' />
        </div>
      }
    },
    {
      field: 'createdAt',
      headerName: 'created At',
      width: 150,
      valueFormatter: (value) => moment(value).format('MMM Do YYYY')
    },
    {
      field: 'reviews',
      headerName: 'Reviews',
      renderCell: (params) => {

        const onReviews = () => {
          setOpenReviews({ open: true, productId: params.row._id })
        }
        return <div className='actions'>
          <img onClick={onReviews} src="view.svg" alt="" title='reviews' />
        </div>
      }
    },
  ]

  return (
    <div className='products'>
      <div className="title">
        <h1>Products</h1>
        <button onClick={() => setOpenAdd(true)} >Add Product</button>
      </div>
      <DataGrid
        sx={{ backgroundColor: 'white' }}
        columns={columns}
        getRowId={(row) => row._id}
        rows={data}
      />
      {openAdd && <AddProduct setOpen={setOpenAdd} />}
      {openDelete.open && <DeleteProduct setOpen={setOpenDelete} data={openDelete} />}
      {openEdit.open && <UpdateProduct setOpen={setOpenEdit} data={openEdit} />}
      {openReviews.open && <Reviews setOpen={setOpenReviews} data={openReviews.productId} />}
    </div>
  )
}

export default Products
