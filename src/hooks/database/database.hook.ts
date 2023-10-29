import useAxios from "@/services";
import {useCallback, useState} from "react";
import {massiveNames} from "@/views/admin/components/database";


export const useDatabaseHook = () => {
    const {fetchData} = useAxios()

    const [data, setData] = useState([])

    const getData = useCallback(async (index) => {
        const result = await fetchData(`/modul/counter-db/?name=${massiveNames[index]}`)
        if(result) {
            setData(result)
            return result
        }
    }, [ ])

    const editData = useCallback(async (item) => {
        const result = await fetchData(`/modul/counter-db/${item.id}/`, "PUT", item)
        if(result) setData(prev => [...prev.filter(instance => instance.id !== item.id), item])
    }, [data])

    return {data, getData, editData}
}