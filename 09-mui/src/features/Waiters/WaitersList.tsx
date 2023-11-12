import React, {useEffect} from "react";
import {Page} from "../../components/Page";
import {queriedWaitersListSelector} from "./store/selectors";
import {Link} from "react-router-dom";
import {startWaitersListLoadingAction} from "./store/reducer";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Stack from "@mui/material/Stack";
import {useStyles} from "./styles";
import {DataGrid} from '@mui/x-data-grid';
import {Box, Button} from "@mui/material";
import {useColumns} from "./useColumns";

export function WaitersList() {
    const waiters = useAppSelector(queriedWaitersListSelector);
    const isLoading = useAppSelector((state) => state.waiters.isWaitersListLoading);
    const loadingError = useAppSelector((state) => state.waiters.loadingWaitersListError);
    const dispatch = useAppDispatch();
    const {columns} = useColumns();
    const {classes} = useStyles();

    useEffect(() => {
        dispatch(startWaitersListLoadingAction())
    }, [dispatch, startWaitersListLoadingAction]);

    return (
        <Page
            title={'Waiters'}
            loading={isLoading}
            error={loadingError}
        >
            <Stack spacing={2}>
                <Box className={classes.end}>
                    <Link to={'/waiters/create'}><
                        Button size="small" variant="outlined">Create waiter</Button>
                    </Link>
                </Box>

                <Box sx={{height: 400, width: '100%'}}>
                    <DataGrid
                        columnHeaderHeight={120}
                        rows={waiters}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 4,
                                },
                            },
                        }}
                        pageSizeOptions={[4]}
                    />
                </Box>
            </Stack>
        </Page>
    );
}