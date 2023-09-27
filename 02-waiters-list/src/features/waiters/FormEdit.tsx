import {Waiter} from "./type";
import React, {useState} from "react";

interface FormEditProps {
    onWaiterSubmit: (waiter: Waiter) => void;
}

export function FormEdit({onWaiterSubmit}: FormEditProps) {
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onWaiterSubmit({firstName, phone});

        setFirstName('');
        setPhone('');
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