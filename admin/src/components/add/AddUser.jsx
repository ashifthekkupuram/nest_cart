import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import './add.scss'

import api from '../../api/api'

const AddUser = ({ setOpen }) => {

    const queryClient = useQueryClient()

    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState('')
    const [admin, setAdmin] = useState(false)


    const mutation = useMutation({
        mutationFn: () => {
            return api.post('/auth/register', { firstName, secondName, email, phone, password, isAdmin: admin } )
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`products`])
            setOpen(false)
            toast.success('Product added')
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const disabled = !firstName || !secondName || !email || !phone || password || mutation.isPending

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add new User</h1>
                <form onSubmit={handleSubmit}>
                    {mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div>}
                    <div className='field'>
                        <label htmlFor="firstName">First Name:</label>
                        <input value={firstName} type='text' name='firstName' id='firstName' onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="secondName">Second Name:</label>
                        <input value={secondName} type='text' name='secondName' id='secondName' onChange={(e) => setSecondName(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="email">Email:</label>
                        <input value={email} type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="phone">Phone:</label>
                        <input value={phone} type='number' name='phone' id='phone' onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="password">Password:</label>
                        <input value={password} type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="admin">Admin:</label>
                        <input checked={admin} type='admin' name='admin' id='admin' onChange={(e) => setAdmin(e.target.checked)} />
                    </div>
                    <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Add'}</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
