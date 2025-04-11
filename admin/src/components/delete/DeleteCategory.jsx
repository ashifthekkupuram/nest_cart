import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import './delete.scss'

import api from '../../api/api'

const DeleteCategory = ({ setOpen, data }) => {

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return api.delete(`/category/${data.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`categories`])
      setOpen({ open: false, id: '', name: '' })
      toast.success('Category deleted')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate()
  }

  const disabled = mutation.isPending

  return (
    <div className="delete">
      <div className="modal">
        <span className="close" onClick={() => setOpen({ open: false, id: '', name: '' })}>
          X
        </span>
        <h1>Deleting "{data.name}" Category?</h1>
        <form onSubmit={handleSubmit}>
          {mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div>}
          <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Delete'}</button>
        </form>
      </div>
    </div>
  )
}

export default DeleteCategory
