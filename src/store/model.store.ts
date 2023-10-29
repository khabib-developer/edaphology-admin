import {IAppStore, IModelStore} from "@/types";
import {create} from "zustand";

export const useModelStore = create<IModelStore>((set) => ({
    models: [ ],
    setModels: (models) => set({models})
}))