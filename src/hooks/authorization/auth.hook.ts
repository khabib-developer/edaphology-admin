import useAxios from "@/services";
import {useAppStore} from "@/store/index.store";
import {useCallback} from "react";
import {useHistory} from "react-router-dom";
import {IUser} from "@/types";
import {useModelHook} from "@/hooks/models/model.hook";
import {usePowerUserHook} from "@/hooks/poweruser/poweruser.hook";
import {useModuleHook} from "@/hooks/module/module.hook";


export const useAuthHook = () => {
    const {fetchData} = useAxios()

    const {user, setUser} = useAppStore()
    const {getModels} = useModelHook()
    const {getPowerUsers} = usePowerUserHook()
    const {getModules} = useModuleHook()
    const history = useHistory()

    const login = useCallback(async (data: unknown) => {
        const user: IUser = await fetchData("/accounts/auth/", "POST", data)
        if(user) {
            setUser(user)
            history.push("/admin/model")
        }
    }, [])

    const check = useCallback(async (admin: boolean) => {
        const user = await fetchData("/accounts/auth/", "GET", null, {}, false, true, false)
        if(user) {
            setUser(user)
            if( isAdmin())
                await Promise.all([await getPowerUsers(), await getModels(), await getModules()])
        }

        if(!admin && user) history.push('/admin/model')
        if(admin && !user) history.push('/auth/login')

        return !!user
    }, [])

    const logout = useCallback(async () => {
        if(user) {
            await fetchData(`/accounts/auth/${user.id}`, "DELETE")
            setUser(null)
            history.push("/auth/login")
        }
    }, [user])

    const isAdmin = useCallback(() => {
        if(user) {
            return user.role === "admin_system"
        }
    }, [user])

    const isPower = useCallback(() => {
        if(user) {
            return user.role === "power_user"
        }
    }, [user])

    return {login, logout, isAdmin, isPower, check}
}