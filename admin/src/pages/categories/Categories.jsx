import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import './categories.scss'

import api from '../../api/api'
import AddCategory from '../../components/add/AddCategory'
import DeleteCategory from '../../components/delete/DeleteCategory'
import UpdateCategory from '../../components/update/UpdateCategory'

const Categories = () => {

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => {

        const onDelete = () => setOpenDelete({ open: true, id: params.row._id, name: params.row.name })

        const onEdit = () => setOpenEdit({ open: true, id: params.row._id, name: params.row.name })
        
        return <div className='actions'>
          <img onClick={onDelete} src="delete.svg" alt="" title='delete' />
          <img onClick={onEdit} src="edit.svg" alt="" title='edit' />
        </div>
      }
    }
  ];

  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState({
    open: false,
    _id: '',
    name: ''
  })
  const [openEdit, setOpenEdit] = useState({
    open: false,
    _id: '',
    name: ''
  })

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
        <button onClick={() => setOpenAdd(true)}>Add Category</button>
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
      {openAdd && <AddCategory setOpen={setOpenAdd} />}
      {openDelete.open && <DeleteCategory setOpen={setOpenDelete} data={openDelete} />}
      {openEdit.open && <UpdateCategory setOpen={setOpenEdit} data={openEdit} />}
    </div>
  )
}

export default Categories
