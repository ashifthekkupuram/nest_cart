import { create } from 'zustand'

const useCart = create((set) => ({
    cart: [],
    setCart: (data) => set({ cart: data || [] })
}))

export default useCart