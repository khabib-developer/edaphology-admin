import * as React from "react";
import {columns} from "@/views/admin/components/database/table";
import {Button, TableCell, TableRow, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {useDatabaseHook} from "@/hooks/database/database.hook";
import {useModelStore} from "@/store/model.store";


export const TableItem = ({row}) => {

    const {editData} = useDatabaseHook()

    const [features, setFeatures] = useState(
        {
            [columns[11].id]: row[columns[11].id],
            [columns[12].id]: row[columns[12].id],
            [columns[13].id]: row[columns[13].id],
            [columns[14].id]: row[columns[14].id],
            [columns[15].id]: row[columns[15].id],
        }
    )

    const handleChange = (event, item) => {
        const value = event.target.value
        const regex = item === columns[15].id ? /^[1-6]$/ : /^[1-5]$/
        const isValid = regex.test(value);
        if(isValid)
            setFeatures(prev => ({...prev, [item]: +value}))
    }

    const handleUpdate = () => {
        editData({...row, ...features})
    }

    const {models} = useModelStore()

    const model = useMemo(() => {
        const model = models.find(model => model.id === +row.model)
        return model?model.name:<span style={{textoColor:"red"}}>deleted</span>
    }, [models])
    return (
        <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.id }>
            { columns.map((column) => {
                const value = row[column.id];
                if (column.input)
                    return
                return (
                    <TableCell key={ column.id } align={ column.align }>
                        { column.id === "model"?<Typography sx={{fontStyle:"italic"}}>{ model }</Typography>:value }
                    </TableCell>
                );
            }) }


            <TableCell key={ columns[11].id } >
                <input className="tableInput" onChange={e => handleChange(e, columns[11].id)} value={features[columns[11].id]} max={5} min={1} type="number" />
            </TableCell>
            <TableCell key={ columns[12].id } >
                <input className="tableInput" onChange={e => handleChange(e, columns[12].id)} value={features[columns[12].id]} max={5} min={1} type="number" />
            </TableCell>
            <TableCell key={ columns[13].id } >
                <input className="tableInput" onChange={e => handleChange(e, columns[13].id)} value={features[columns[13].id]} max={5} min={1} type="number" />
            </TableCell>
            <TableCell key={ columns[14].id } >
                <input className="tableInput" onChange={e => handleChange(e, columns[14].id)} value={features[columns[14].id]} max={5} min={1} type="number" />
            </TableCell>
            <TableCell key={ columns[15].id } >
                <input className="tableInput" onChange={e => handleChange(e, columns[15].id)} value={features[columns[15].id]} max={6} min={1} type="number" />
            </TableCell>
            <TableCell key={ columns[16].id } >
                <input className="tableInput" maxLength={1}  type="number" defaultValue={row[columns[16].id ]} max={5} min={1} disabled />
            </TableCell>

            <TableCell key={ 'button' } >
                <Button onClick={handleUpdate}>
                    Edit
                </Button>
            </TableCell>


        </TableRow>
    )
}