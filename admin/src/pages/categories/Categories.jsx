import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import './categories.scss'

import api from '../../api/api'

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
];

const Categories = () => {

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/category')
      return response.data.data
    }
  })

  return (
    <div className='categories'>
      <div className='title'>
        <h1>Categories</h1>
        <button>Add Category</button>
      </div>
      <DataGrid
        sx={{ backgroundColor: 'white' }}
        rows={data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowId={(category) => category._id}
      />
    </div>
  )
}

export default Categories
