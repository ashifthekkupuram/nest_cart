import api from '../api/api'

const dataProvider = {
    getList: async (resource, params) => {
        try {
            const response = await api.get(`/${resource}`)
            const data = response.data.categories.map((category) => ({ id: category._id, ...category }))
            return { data: data, total: data.length }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    getOne: async (resource, { id }) => {
        try {
            const response = await api.get(`/${resource}/${id}`)
            const category = response.data.category
            return { data: {id: category._id, ...category} }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    create: async (resource, { data }) => {
        try {
            const response = await api.post(`/${resource}`, { name: data.name.trim() })
            const category = response.data.category
            return { data: { id: category._id, ...category } }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    update: async (resource, { id, data }) => {
        try {
            const response = await api.put(`/${resource}/${id}`, { name: data.name.trim() })
            const category = response.data.category
            return { data: { id: category._id, ...category } }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    },
    delete: async (resource, { id }) => {
        try {
            const response = await api.delete(`/${resource}/${id}`)
            const category = response.data.category
            return { data: { id: category._id, ...category } }
        } catch (err) {
            throw new Error(err?.response?.data?.message || 'Internal Server Error')
        }
    }
}

export default dataProvider
