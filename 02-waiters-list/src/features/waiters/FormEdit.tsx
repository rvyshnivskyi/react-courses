import {WaiterI} from "./type";
import React, {useEffect, useState} from "react";

interface FormEditProps {
    waiter: WaiterI;
    onWaiterSubmit: (waiter: WaiterI) => void;
}

export function FormEdit({waiter, onWaiterSubmit}: FormEditProps) {
    const [firstName, setFirstName] = useState(waiter.firstName);
    const [phone, setPhone] = useState(waiter.phone);

    useEffect(() => {
        setFirstName(waiter.firstName);
        setPhone(waiter.phone);
    }, [waiter]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        onWaiterSubmit({...waiter, firstName, phone});
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