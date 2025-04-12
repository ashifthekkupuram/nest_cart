import { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import './add.scss'

import api from '../../api/api'

const AddProduct = ({ setOpen }) => {

    const queryClient = useQueryClient()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(10.99)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [images, setImages] = useState([])

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await api.get('/category')
            return response.data.data
        }
    })

    const mutation = useMutation({
        mutationFn: () => {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            const cats = selectedCategories.map((c) => c._id)
            formData.append('categories', cats)
            images.map((image) => {
                formData.append('images', image)
            })
            return api.post('/product', formData )
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`products`])
            setOpen(false)
            toast.success('Product added')
        }
    })

    const categoryChange = (e) => {
        const value = e.target.value.toString()
        if (value) {
            const item = data.find((cat) => cat._id === value)
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

    const imageChanges = (e) => {
        setImages(prev => [...prev, ...e.target.files])
        e.target.files = ''
    }

    const imageRemove = (value) => {
        const newImages = images.filter((img) => img.name !== value)
        setImages(newImages)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const disabled = !name || !price || !selectedCategories || mutation.isPending

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add new Product</h1>
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
                    {data && <div className='field'>
                        <label htmlFor="categories">Categories:</label>
                        <select name="categories" id="categories" onChange={categoryChange} >
                            <option value="">-</option>
                            {data.map((category) => <option value={category._id}>{category.name}</option>)}
                        </select>
                    </div>}
                    {selectedCategories && <div className="selectedCategories">
                        {selectedCategories.map((selected) => <span onClick={() => categoryRemove(selected._id)} className='selectedCategoriesItem'>{selected.name}</span>)}
                    </div>}
                    <div className='field'>
                        <label htmlFor="images">Images:</label>
                        <input value={null} type='file' name='images' id='images' onChange={imageChanges} />
                    </div>
                    {images && <div className="images">
                        { images.map((img) => <span onClick={() => imageRemove(img.name)} className='image'>{img.name}</span> ) }
                    </div>}
                    <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Add'}</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
