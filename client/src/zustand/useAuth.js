import { create } from 'zustand'

const useAuth = create((set) => ({
    token: 's',
    UserData: {},
    setAuth: (data) => set({ token: data.access_token || '', UserData: data.UserData || {} })
}))

export default useAuth