import { useEffect, useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import './update.scss'

import api from '../../api/api'

const UpdateProduct = ({ setOpen, data }) => {

    const queryClient = useQueryClient()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(10.99)
    const [selectedCategories, setSelectedCategories] = useState([])

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await api.get('/category')
            return response.data.data
        }
    })

    const mutation = useMutation({
        mutationFn: () => {
            const cats = selectedCategories.map((c) => c._id)
            return api.put(`/product/${data.data._id}`, { name, description, price, categories: cats })
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`products`])
            setOpen({ open: false, data: null })
            toast.success('Category updated')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const categoryChange = (e) => {
        const value = e.target.value.toString()
        if (value) {
            const item = categories.find((cat) => cat._id === value)
            const i = selectedCategories.findIndex(i => i._id === item._id)
            if (i > -1) {
                const newCategories = selectedCategories.filter((cat) => cat._id !== value)
                setSelectedCategories(newCategories)
            } else {
                setSelectedCategories(prev => [...prev, item])
            }

        }
    }

    const categoryRemove = (value) => {
        const newCategories = selectedCategories.filter((cat) => cat._id !== value)
        setSelectedCategories(newCategories)
    }

    const disabled = !name || mutation.isPending

    useEffect(() => {
        if (data) {
            setName(data?.data?.name)
            setDescription(data?.data?.description || '')
            setPrice(data?.data?.price)
            setSelectedCategories(data?.data?.categories)
        }
    }, [data])

    return (
        <div className="update">
            <div className="modal">
                <span className="close" onClick={() => setOpen({ open: false, data: null })}>
                    X
                </span>
                <h1>Update Product</h1>
                <form onSubmit={handleSubmit}>
                    {mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div>}
                    <div className='field'>
                        <label htmlFor="name">Name:</label>
                        <input value={name} type='text' name='name' id='name' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="description">Description:</label>
                        <textarea value={description} type='text' name='description' id='description' onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label htmlFor="price">Price:</label>
                        <input value={price} type='number' name='price' id='price' onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    {categories && <div className='field'>
                        <label htmlFor="categories">Categories:</label>
                        <select name="categories" id="categories" onChange={categoryChange} >
                            <option value="">-</option>
                            {categories.map((category) => <option value={category._id}>{category.name}</option>)}
                        </select>
                    </div>}
                    {selectedCategories && <div className="selectedCategories">
                        {selectedCategories.map((selected) => <span onClick={() => categoryRemove(selected._id)} className='selectedCategoriesItem'>{selected.name}</span>)}
                    </div>}
                    <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Update'}</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct
