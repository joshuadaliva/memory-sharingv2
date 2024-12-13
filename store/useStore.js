import { create } from "zustand"

export const useStore = create((set) => ({
    background : false,
    changeBackground : (value) => set({background : value}) 
}))