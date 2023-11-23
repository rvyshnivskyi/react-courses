import {Link} from "react-router-dom";
import React from "react";
import {WaiterI} from "../type";
import {Button} from "@mui/material";

export function EditBtn({waiter}: { waiter: WaiterI }) {
    return (
        <Link to={`/waiters/${waiter.id}/edit`}>
            <Button>Edit</Button>
        </Link>
    )
}