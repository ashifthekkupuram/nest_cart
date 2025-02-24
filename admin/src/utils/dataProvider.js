import api from '../api/api'

const dataProvider = {
    getList: async (resource, params) => {
        try {
            const response = await api.get(`/${resource}`)
            const data = response.data.data.map((item) => ({ id: item._id, ...item }))
            console.log(data)
            return { data: data, total: data.length }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    getOne: async (resource, { id }) => {
        try {
            const response = await api.get(`/${resource}/${id}`)
            const data = response.data.data
            console.log(data)
            return { data: {id: data._id, ...data} }
        } catch (err) {
            console.error(err)
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    create: async (resource, { data }) => {
        try {
            let payload
            let headers = []
            if(resource === 'category'){
                payload = { name: data.name.trim() }
            }
            if(resource === 'product'){
                payload = new FormData()
                payload.append('name', data.name.trim())
                payload.append('description', data.description.trim())
                payload.append('price', data.price)
                payload.append('categories', data.categories)
                data.images.forEach(async (image, index) => {
                    payload.append('images', image.rawFile)
                    console.log(`Appended image ${index + 1}:`, image);
                })
                headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const response = await api.post(`/${resource}`, payload, { })
            const item = response.data.data
            return { data: { id: item._id, ...item } }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    update: async (resource, { id, data }) => {
        try {
            let payload
            if(resource === 'category'){
                payload = { name: data.name.trim() }
            }
            if(resource === 'product'){
                payload = new FormData()
                payload.append('name', data.name.trim())
                payload.append('description', data.description.trim())
                payload.append('price', data.price)
                payload.append('categories', data.categories)
                headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const response = await api.put(`/${resource}/${id}`, payload)
            const item = response.data.data
            return { data: { id: item._id, ...item } }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    delete: async (resource, { id }) => {
        try {
            const response = await api.delete(`/${resource}/${id}`)
            const data = response.data.data
            return { data: { id: data._id, ...data } }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    }
}

export default dataProvider
 