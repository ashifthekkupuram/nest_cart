import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import './delete.scss'

import api from '../../api/api'

const DeleteProduct = ({ setOpen, data }) => {

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => {
      return api.delete(`/product/${data.id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`products`])
      setOpen({ open: false, id: '', name: '' })
      toast.success('Product deleted')
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
        <h1>Deleting "{data.name}" Product?</h1>
        <form onSubmit={handleSubmit}>
          {mutation.isError && <div className="error">{mutation.error?.response?.data?.message || 'Internal Server Error'}</div>}
          <button disabled={disabled}>{mutation.isPending ? 'Loading...' : 'Delete'}</button>
        </form>
      </div>
    </div>
  )
}

export default DeleteProduct
