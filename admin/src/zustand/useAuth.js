import { create } from 'zustand'

const useAuth = create((set) => ({
    token: '',
    UserData: {},
    setAuth: (data) => set({ token: data?.access_token || '', UserData: data?.UserData || {} }),
    // addAddress: (data) => set((state) => ({ UserData: { ...state.UserData, addresses: [...(state.UserData.addresses || []), data] } })),
    // removeAddress: (data) => set((state) => ({ UserData: { ...state.UserData, addresses: [...(state.UserData.addresses.filter((address) => address._id !== data) || [])] } })),
    // editAddress: (data) => set((state) => ({ UserData: { ...state.UserData, addresses: [...(state.UserData.addresses.map((address) => address._id === data?.addressId ? data?.address : address) || [])] } })),
    // updateUserData: (data) => set((state) => ({ UserData: data || {} }))
}))

export default useAuth