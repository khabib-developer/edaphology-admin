import React, {useState} from 'react';
import {Box} from "@mui/material";
import {DragSortList} from "@/components/DragSortList";
import {useModelStore} from "@/store/model.store";
import {ModelItem} from "@/views/admin/components/model/components/ModelItem";
import {useModelHook} from "@/hooks/models/model.hook";
import {IModel} from "@/types";

const ListModel = () => {
    const {models} = useModelStore()
    const {bulkUpdateOrders} = useModelHook()
    const [changingActiveModel, setChangingActiveModel] = useState(false)
    const setData = async (updatedArray: IModel[]) => {
        const newActive = models.find(item => item.order === 0)
        const prevActive = updatedArray.find(item => item.order === 0)
        if(newActive.id !== prevActive.id) setChangingActiveModel(true)
        await bulkUpdateOrders(updatedArray)
        setChangingActiveModel(false)
    }
    return (
        <Box sx={ {width: "100%"} }>
            <DragSortList data={ models.sort((a, b) => a.order - b.order) } setData={ setData }>
                { (item, setActive, active) => {
                    return (
                        <ModelItem model={ item } setActive={ setActive } active={ active } loading={changingActiveModel} setLoading={setChangingActiveModel} />
                    )
                } }
            </DragSortList>
        </Box>
    );
};

export default ListModel;