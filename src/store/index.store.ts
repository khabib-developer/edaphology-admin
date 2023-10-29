import {IAppStore} from "@/types";
import {create} from "zustand";


export const useAppStore = create<IAppStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    error: null,
    setError: (error) => set({error}),
    info: null,
    setInfo: (info) => set({info}),
    loading: false,
    setLoading: (loading) => set({loading}),
}))