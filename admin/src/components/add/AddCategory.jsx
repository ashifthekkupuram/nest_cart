import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import './add.scss'

import api from '../../api/api'

const AddCategory = ({ setOpen }) => {

    const queryClient = useQueryClient()

    const [name, setName] = useState('')

    const mutation = useMutation({
        mutationFn: () => {
           return api.post('/category', { name })
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`categories`])
            setOpen(false)
            toast.success('Category added')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const disabled = !name || mutation.isPending

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add new Category</h1>
                <form onSubmit={handleSubmit}>
                    { mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div> }
                    <div className='field'>
                        <label htmlFor="name">Name:</label>
                        <input value={name} type='text' name='name' id='name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <button disabled={disabled}>{ mutation.isPending ? 'Loading...' : 'Add' }</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory
