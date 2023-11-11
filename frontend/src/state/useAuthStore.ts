import { User } from '@/interface/User';
import axios from '@/services/axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState: User = {
  username: "",
  email: "",
  auth: false,
  role: "USER"
}

interface AuthStore {
  user: User;
  setUser: (user: User) => void,
  token: string | null,
  setToken: (token: string) => void,
  reset: () => void

}
export const useAuthStore = create<AuthStore, [["zustand/persist", "unknown"]]>(
  persist(
    (set) => ({
      user: initialState,
      setUser: (user: User) => set({ user }),
      token: null,
      setToken: (newToken: string) => set({ token: newToken }),
      reset: () => set({
        user: initialState,
        token: null
      })
    }),
    {
      name: "auth_storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            if (state) {
              if (state.token) {
                axios.defaults.headers.Authorization = `Bearer ${state.token}`
              }
            }
          }
        }

      }
    }
  )
)


export const clear = () => useAuthStore.persist.clearStorage()
export const rehydrate = async () => await useAuthStore.persist.rehydrate()
