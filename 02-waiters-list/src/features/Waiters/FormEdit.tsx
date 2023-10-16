import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveWaiter} from "./store/thunk";
import {delay} from "./utils";


export function FormEdit() {
    const dispatch = useDispatch();
    const waiter = useSelector((state: any) => state.waiters.editingWaiter);
    const [firstName, setFirstName] = useState(waiter.firstName);
    const [phone, setPhone] = useState(waiter.phone);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

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
        } catch (e: any) {
            setError(e.message);
        } finally {
            setUpdating(false);
            await delay(3000);
            setError('');
        }
    }

    return (
        <>
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
        </>
    );
}