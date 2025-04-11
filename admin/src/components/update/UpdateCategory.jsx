import { useEffect, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import './update.scss'

import api from '../../api/api'

const UpdateCategory = ({ setOpen, data }) => {

  const queryClient = useQueryClient()

  const [name, setName] = useState('')

  const mutation = useMutation({
      mutationFn: () => {
         return api.put(`/category/${data.id}`, { name })
      },
      onSuccess: () => {
          queryClient.invalidateQueries([`categories`])
          setOpen({ open: false, id: '', name: '' })
          toast.success('Category updated')
      }
  })

  const handleSubmit = (e) => {
      e.preventDefault()
      mutation.mutate()
  }

  const disabled = !name || mutation.isPending

  useEffect(() => {
    if(data?.name){
      setName(data.name)
    }
  },[data])

  return (
    <div className="update">
      <div className="modal">
        <span className="close" onClick={() => setOpen({ open: false, id: '', name: '' })}>
          X
        </span>
        <h1>Update Category</h1>
        <form onSubmit={handleSubmit}>
          {mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div>}
          <div className='field'>
            <label htmlFor="name">Name:</label>
            <input value={name} type='text' name='name' id='name' onChange={(e) => setName(e.target.value)} />
          </div>
          <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Update'}</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategory
