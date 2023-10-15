import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveWaiter} from "./store/thunk";


export function FormEdit() {
    const dispatch = useDispatch();
    const waiter = useSelector((state: any) => state.waiters.editingWaiter);
    const [firstName, setFirstName] = useState(waiter.firstName);
    const [phone, setPhone] = useState(waiter.phone);

    useEffect(() => {
        setFirstName(waiter.firstName);
        setPhone(waiter.phone);
    }, [waiter]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newWaiter = {...waiter, firstName, phone};
        // @ts-ignore
        dispatch(saveWaiter(newWaiter));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="phone">Phone</label>
            <input
                id="phone"
                name="phone"
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <button type="submit" disabled={!firstName || !phone}>Submit</button>
        </form>
    );
}