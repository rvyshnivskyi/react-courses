import {WaiterI} from "../type";
import {useAppDispatch} from "../../../hooks";
import React from "react";
import {removeItemRequest} from "../store/reducer";
import {Alert} from "../../../components/Alert";
import {Button} from "@mui/material";

export function DeleteBtn({waiter}: { waiter: WaiterI }) {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    async function onDeleteBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            setError('')
            setLoading(true)

            try {
                await new Promise((resolve, reject) => dispatch(removeItemRequest(waiter.id!, resolve, reject)))
            } catch (e: any) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <>
            <Button color="error" onClick={onDeleteBtnClick} disabled={loading}>Delete</Button>
            {error && <Alert message={error}/>}
        </>
    )
}