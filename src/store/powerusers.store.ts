
import {create} from "zustand";
import {IPowerUserStore} from "@/types";

export const usePowerUserStore = create<IPowerUserStore>((set) => ({
    powerUsers: [ ],
    setPowerUsers: (powerUsers) => set({powerUsers})
}))