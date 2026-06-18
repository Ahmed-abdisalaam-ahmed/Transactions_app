import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useAuthStore = create(


    persist(

        (set,get) => ({

            user: null,
            token:null,
            isAuthenticated: false,

            // Set user data and token after successfully login
            setAuth: (userData, token) => set({
                user:userData,
                token,
                isAuthenticated: true
            }),

            // clean data after log out
            setCleanAuth: () => set({
                user:null,
                token:null,
                isAuthenticated:false
            }),

            // Get token (for use outside of React Component)

            getToken: () => get().token,

        }),

        {
            name: "Auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)

export default useAuthStore