import './users.scss'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'

import api from '../../api/api'
import Addresses from '../../components/addresses/Addresses'
import AddUser from '../../components/add/AddUser'
import useAuth from '../../zustand/useAuth'
import useChangeAdmin from '../../hooks/useChangeAdmin'

const Users = () => {

    const [openAddress, setOpenAddress] = useState({ open: false, data: null })
    const [openAdd, setOpenAdd] = useState(false)
    
    const UserData = useAuth((state) => state.UserData)
    
    const { loading: changeAdminLoading ,changeAdmin } = useChangeAdmin()

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/user')
            return response.data.data
        }
    })
    

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            renderCell: (params) => {
                return `${params.row.name.firstName} ${params.row.name.secondName}`
            }
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            renderCell: (params) => {
                return params.row.email.email
            }
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 100,
            renderCell: (params) => {
                return params.row.phone.phone
            }
        },
        {
            field: 'admin',
            headerName: 'Admin',
            width: 80,
            renderCell: (params) => {
                return params.row.admin ? <img className='admin-icons' src='true.svg' /> : <img className='admin-icons' src='false.svg' />
            }
        },
        {
            field: 'createdAt',
            headerName: 'Joined At',
            width: 150,
            valueFormatter: (value) => moment(value).format('MMM Do YYYY')
        },
        {
            field: 'addresses',
            headerName: 'Addresses',
            width: 100,
            renderCell: (params) => {

                const onAddressView = () => {
                    setOpenAddress({ open: true, data: params.row.addresses })
                }

                return <div className='actions'>
                    <img onClick={onAddressView} src="view.svg" alt="" title='view addresses' />
                </div>
            }
        },
        {
            field: 'updateAdmin',
            headerName: 'Change Admin',
            width: 150,
            renderCell: (params) => {

                const check = UserData._id !== params.row._id

                const handleClick = (e) => {
                    e.preventDefault()
                    changeAdmin(params.row._id)
                }

                return check && <button disabled={changeAdminLoading} className='changeAdmin' onClick={handleClick} >{ params.row.admin ? 'remove from admin' : 'add to admin' }</button> 
            }
        },
    ]

    return (
        <div className='users'>
            <div className="title">
                <h1>Users</h1>
                <button onClick={() => setOpenAdd(true)} >Add new User</button>
            </div>
            <DataGrid
                sx={{ backgroundColor: 'white' }}
                columns={columns}
                rows={data}
                getRowId={(row) => row._id}
            />
            { openAddress.open && <Addresses setOpen={setOpenAddress} data={openAddress.data} /> }
            { openAdd && <AddUser setOpen={setOpenAdd} /> }
        </div>
    )
}

export default Users
