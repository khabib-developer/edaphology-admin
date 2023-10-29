import useAxios from "@/services";
import { useCallback } from "react";
import {useModuleStore} from "@/store/module.store";
import {IModule} from "@/types";

export const useModuleHook = () => {
  const { fetchData } = useAxios();

  const { modules, setModules } = useModuleStore()

  const getModules = useCallback(async () => {
    const result = await fetchData("/modul/module/")
    if(result) setModules(result)
  }, []);

  const changeModule = useCallback(async (module: IModule) => {
    const updatedModule = await fetchData(`/modul/module/${module.id}/`, "PUT", {...module})
    if(updatedModule) setModules([...modules.filter(item => item.id !== module.id), updatedModule])
  }, [modules])

  return { getModules, changeModule };
};
