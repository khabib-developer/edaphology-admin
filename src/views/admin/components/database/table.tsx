import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Link, useParams} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDatabaseHook} from "@/hooks/database/database.hook";
import {TableItem} from "@/views/admin/components/database/tableItem";
import {useModelStore} from "@/store/model.store";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
    input?: boolean;
}

export const columns: readonly Column[] = [
    {id: 'id', label: 'id'},
    {id: 'b1', label: 'b1'},
    {id: 'b2', label: 'b2'},
    {id: 'b3', label: 'b3'},
    {id: "b4", label: 'b4'},
    {id: "b5", label: 'b5'},
    {id: "b6", label: 'b6'},
    {id: "b7", label: 'b7'},
    {id: "b10", label: 'b10'},
    {id: "model", label: 'model'},
    {id: "counter_id", label: 'Kontur_raq'},
    {id: "gumus", label: 'gumus', input: true},
    {id: "fosfor", label: 'fosfor', input: true},
    {id: "kaliy", label: 'kaliy', input: true},
    {id: "shorlanish", label: 'tuzlanish', input: true},
    {id: "mex", label: 'mex', input:true},
    {id: "namlik", label: 'namlik', input:true},
    {id: "button", label: 'Edit', input:true},
];

export const DatabaseTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const {data, getData, editData} = useDatabaseHook()



    const [rows, setRows] = useState([])

    const {path} = useParams()

    useEffect(() => {
        (async function () {
            const items = await getData(path)
        }())
    }, [])

    useEffect(() => {
        setRows(data)
    }, [data])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box>
            <Link to="/admin/database"><ArrowBackIosIcon/></Link>
            <Paper sx={ {width: '100%', overflow: 'hidden', mt: 3} }>
                <TableContainer sx={ {maxHeight: 'calc(100vh - 200px)'} }>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                { columns.map((column) => (
                                    <TableCell
                                        key={ column.id }
                                        align={ column.align }
                                        style={ {minWidth: column.minWidth} }
                                    >
                                        { column.label }
                                    </TableCell>
                                )) }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => <TableItem key={row.id} row={row} />) }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={ [15] }
                    component="div"
                    count={ rows.length }
                    rowsPerPage={ rowsPerPage }
                    page={ page }
                    onPageChange={ handleChangePage }
                    onRowsPerPageChange={ handleChangeRowsPerPage }
                />
            </Paper>
        </Box>

    )
}