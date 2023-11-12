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
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={firstName}
                    disabled={updating}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={phone}
                    disabled={updating}
                    onChange={e => setPhone(e.target.value)}
                />
                <button type="submit" disabled={!firstName || !phone || updating}>Submit</button>
            </form>
        </Page>
    );
}