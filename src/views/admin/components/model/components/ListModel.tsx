import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {DragSortList} from "@/components/DragSortList";
import {useModelStore} from "@/store/model.store";
import {ModelItem} from "@/views/admin/components/model/components/ModelItem";
import {useModelHook} from "@/hooks/models/model.hook";
import {IModel} from "@/types";
import {useAppStore} from "@/store/index.store";

const ListModel = () => {
    const {models} = useModelStore()
    const {setError} = useAppStore()
    const {bulkUpdateOrders} = useModelHook()
    const [changingActiveModel, setChangingActiveModel] = useState(false)
    const [error, setCustomError] = useState(false)
    const [activeModel, setActiveModel] = useState<IModel | null>(null)

    const setData = async (updatedArray: IModel[]) => {
        const bool1 = !models.find(item => item.order === 0)
        const bool2 = models.filter(item => item.order === 0).length > 1
        if(bool2 || bool1) setChangingActiveModel(true)
        const result = await bulkUpdateOrders(updatedArray)
        const err = !Boolean(result.detail === 'success')
        setCustomError(err)
        if(!err) setActiveModel(updatedArray.find(item => item.order === 0))
        else setError("Error activating model")
        setChangingActiveModel(false)
    }

    useEffect(() => {
        const activeModel = models.find(item => item.order === 0)
        if(activeModel) setActiveModel(activeModel)
    }, [])

    if(activeModel)
        return (
            <Box sx={ {width: "100%"} }>
                <DragSortList data={ models.sort((a, b) => a.order - b.order) } setData={ setData }>
                    { (item, setActive, active) => {
                        return (
                            <ModelItem
                                model={ item }
                                setActive={ setActive }
                                activeModel={ activeModel! }
                                loading={changingActiveModel}
                                setLoading={setChangingActiveModel} error={error} />
                        )
                    } }
                </DragSortList>
            </Box>
        );
};

export default ListModel;