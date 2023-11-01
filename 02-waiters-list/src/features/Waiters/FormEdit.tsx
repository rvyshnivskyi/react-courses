import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEditingWaiter, saveWaiter} from "./store/thunk";
import {useNavigate, useParams} from "react-router-dom";
import {editingWaiterCombinedSelector} from "./store/selectors";
import {DEFAULT_WAITER, setEditingWaiterAction} from "./store/reducer";
import {Page} from "../../components/Page";


export function FormEdit() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {editingWaiter: waiter, isEditingWaiterLoading, editingWaiterLoadingError} = useSelector(editingWaiterCombinedSelector);
    const [firstName, setFirstName] = useState(waiter.firstName);
    const [phone, setPhone] = useState(waiter.phone);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(getEditingWaiter(id));
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
        setError('');
        setUpdating(true);

        try {
            // @ts-ignore
            await dispatch(saveWaiter(newWaiter));
            navigate('/waiters');
        } catch (e: any) {
            setError(e.message);
        } finally {
            setUpdating(false);
        }
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
            {error && <div style={{color: 'red'}}>{error}</div>}
        </Page>
    );
}