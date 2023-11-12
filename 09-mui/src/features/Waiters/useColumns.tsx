import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import React from "react";
import {WaiterI} from "./type";
import {setNameQueryAction, setPhoneQueryAction} from "./store/reducer";
import {QueriedHeader} from "./QueriedHeader";
import {DeleteBtn} from "./Actions/DeleteBtn";
import {EditBtn} from "./Actions/EditBtn";

export function useColumns() {
    const columns: GridColDef[] = [
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 2,
            renderHeader: () => <QueriedHeader title={'First Name'} queryName={'name'}
                                               queryChangingAction={setNameQueryAction}/>
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 2,
            renderHeader: () => <QueriedHeader title={'Phone'} queryName={'phone'}
                                               queryChangingAction={setPhoneQueryAction}/>
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            renderCell: (params: GridRenderCellParams<WaiterI>) => (
                <Stack spacing={2} direction="row">
                    <EditBtn waiter={params.row}/>
                    <DeleteBtn waiter={params.row}/>
                </Stack>
            ),
            flex: 1,
        },
    ];

    return {
        columns,
    }
}


