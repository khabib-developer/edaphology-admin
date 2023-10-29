import {useCallback, useState} from "react";
import useAxios from "@/services";
import {useModelStore} from "@/store/model.store";
import {useAppStore} from "@/store/index.store";


export const useModelHook = () => {

    const {fetchData} = useAxios()
    const [updateOrderLoading, setUpdateOrderLoading] = useState(false)

    const {setModels, models} = useModelStore()

    const { setInfo } = useAppStore()

    const getModels = useCallback(async () => {
        let models = await fetchData("/accounts/admin-system/")

        if (models && models.filter(model => model.order === 0).length > 1) {
            models = models.map((model, i) => ({...model, order: i}))
        }
        setModels(models)
    }, [])

    const createModel = useCallback(async (data: FormData, updateMode: undefined | number) => {
        const url = updateMode ? `/accounts/admin-system/${ updateMode }/` : "/accounts/admin-system/"
        const model = await fetchData(url, !!updateMode ? "PATCH" : "POST", data)
        const updatedModels = !updateMode ? [
                ...models, model] :
            [...models.filter(model => model.id !== updateMode), model]
        setModels(updatedModels)
        setInfo("Muvofaqiyatli bajarildi!")

    }, [models])

    const deleteModel = useCallback(async (id) => {
        const updatedModels = models.filter(model => model.id !== id)
            .sort((a, b) => a.order - b.order)
            .map((model, i) => ({...model, order: i}))

        await Promise.all(
            [
                await fetchData(`/accounts/admin-system/${ id }`, "DELETE"),
                await bulkUpdateOrders(updatedModels)
            ]
        )

        await fetchData(`/accounts/admin-system/${ id }`, "DELETE")

        // setModels([...models.filter(model => model.id !== id)])
        setInfo("Muvofaqiyatli bajarildi!")

    }, [models])

    const bulkUpdateOrders = useCallback(async(updatedArray) => {
        setModels(updatedArray)
        return await fetchData("/accounts/update-order/", "POST", {
            order: updatedArray.map(item => ({
                id: item.id,
                order: item.order
            }))
        }, {}, true, true, true)
    }, [models])

    return {getModels, createModel, deleteModel, bulkUpdateOrders, updateOrderLoading}
}