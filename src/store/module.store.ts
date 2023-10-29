

import {IModuleStore} from "@/types";
import {create} from "zustand";

export const useModuleStore = create<IModuleStore>((set) => ({
    modules: [ ],
    setModules: (modules) => set({modules})
}))