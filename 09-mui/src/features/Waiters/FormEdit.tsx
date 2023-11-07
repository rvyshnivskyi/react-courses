import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {editingWaiterCombinedSelector, waiterUpdatingCombinedSelector} from "./store/selectors";
import {
    DEFAULT_WAITER,
    setEditingWaiterAction,
    startEditingWaiterLoadingAction,
    startWaiterUpdatingAction
} from "./store/reducer";
import {Page} from "../../components/Page";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, Paper, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import {Alert} from "../../components/Alert";


export function FormEdit() {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        editingWaiter: waiter,
        isEditingWaiterLoading,
        editingWaiterLoadingError
    } = useAppSelector(editingWaiterCombinedSelector);
    const [firstName, setFirstName] = useState(waiter.firstName);
    const [phone, setPhone] = useState(waiter.phone);
    const {isWaiterUpdating: updating, waiterUpdatingError: error} = useAppSelector(waiterUpdatingCombinedSelector)

    useEffect(() => {
        if (id) {
            dispatch(startEditingWaiterLoadingAction(id));
        } else {
            dispatch(setEditingWaiterAction(DEFAULT_WAITER))
        }
    }, [id]);

    useEffect(() => {
        setFirstName(waiter.firstName);
        setPhone(waiter.phone);
    }, [waiter]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newWaiter = {...waiter, firstName, phone};
        dispatch(startWaiterUpdatingAction({updatedWaiter: newWaiter, callback: () => navigate('/waiters')}))
    }

    return (
        <Page
            title={id ? 'Edit waiter' : 'Add waiter'}
            loading={isEditingWaiterLoading}
            error={editingWaiterLoadingError}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Paper
                    sx={{
                        padding: '10px',
                        width: '50ch',
                    }}
                >
                    <Stack
                        component="form"
                        spacing={2}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />

                        <TextField
                            required
                            id="phone"
                            label="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />

                        <Button type="submit" disabled={!firstName || !phone || updating}
                                variant="outlined">Submit</Button>
                    </Stack>

                    {error && <Alert message={error}/>}
                </Paper>
            </Box>
        </Page>
    );
}