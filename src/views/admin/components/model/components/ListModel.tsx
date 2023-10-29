import React from 'react';
import {Box} from "@mui/material";
import {DragSortList} from "@/components/DragSortList";
import {useModelStore} from "@/store/model.store";
import {ModelItem} from "@/views/admin/components/model/components/ModelItem";
import {useModelHook} from "@/hooks/models/model.hook";
import {IModel} from "@/types";

const ListModel = () => {
    const {models} = useModelStore()
    const {bulkUpdateOrders} = useModelHook()
    const setData = (updatedArray: IModel[]) => {
        bulkUpdateOrders(updatedArray)
    }
    return (
        <Box sx={ {width: "100%"} }>
            <DragSortList data={ models.sort((a, b) => a.order - b.order) } setData={ setData }>
                { (item, setActive, active) => {
                    return (
                        <ModelItem model={ item } setActive={ setActive } active={ active }/>
                    )
                } }
            </DragSortList>
        </Box>
    );
};

export default ListModel;