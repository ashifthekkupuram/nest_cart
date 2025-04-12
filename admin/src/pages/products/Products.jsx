import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import './products.scss'

import api from '../../api/api'

const PAGE_SIZE = 12

const Products = () => {

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

        const onDelete = () => {}

        const onEdit = () => {}
        
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
    }
  ]

  return (
    <div className='products'>
      <div className="title">
        <h1>Products</h1>
        <button>Add Product</button>
      </div>
      <DataGrid
        sx={{ backgroundColor: 'white' }}
        columns={columns}
        getRowId={(row) => row._id}
        rows={data}
      />
    </div>
  )
}

export default Products
