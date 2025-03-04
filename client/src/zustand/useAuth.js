import { create } from 'zustand'

const useAuth = create((set) => ({
    token: '',
    UserData: {},
    setAuth: (data) => set({ token: data?.access_token || '', UserData: data?.UserData || {} }),
    addAddress: (data) => set((state) => ({ UserData: { ...state.UserData, addresses: [...(state.UserData.addresses || []), data] } })),
    removeAddress: (data) => set((state) => ({ UserData: { ...state.UserData, addresses: [...(state.UserData.addresses.filter((address) => address._id !== data) || [])] } })),
}))

export default useAuth