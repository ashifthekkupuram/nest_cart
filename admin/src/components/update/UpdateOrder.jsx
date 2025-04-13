import { useEffect, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import './update.scss'

import api from '../../api/api'

const STATUS = ['PENDING', 'CANCELLED', 'DELIVERED']

const UpdateOrder = ({ setOpen, data }) => {

    const queryClient = useQueryClient()

    const [paid, setPaid] = useState(false)
    const [status, setStatus] = useState('')

    const mutation = useMutation({
        mutationFn: () => {
            return api.put(`/order/${data.id}`, { paid, status })
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`orders`])
            setOpen({ open: false, data: null })
            toast.success('Category updated')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const onStatusChange = (e) => {
        if (e.target.value) {
            setStatus(e.target.value)
        }
    }

    const disabled = !status || mutation.isPending

    useEffect(() => {
        if (data) {
            console.log(data)
            setPaid(data.paid)
            setStatus(data.status)
        }
    }, [data])

    console.log(paid)

    return (
        <div className="order">
            <div className="modal">
                <span className="close" onClick={() => setOpen({ open: false, data: null })}>
                    X
                </span>
                <h1>Update Order</h1>
                <form onSubmit={handleSubmit}>
                    {mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div>}
                    <div className='field'>
                        <label htmlFor="status">Status:</label>
                        <select onChange={onStatusChange} name="status" id="status" defaultValue={data?.status} >
                            {STATUS.map((status) => <option value={status}>{status}</option>)}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="paid">Is Paid:</label>
                        <input checked={paid} type="checkbox" name='paid' id='paid' onChange={(e) => setPaid(e.target.checked)} />
                    </div>
                    <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Update'}</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateOrder
