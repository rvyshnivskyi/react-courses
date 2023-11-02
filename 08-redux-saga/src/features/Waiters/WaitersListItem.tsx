import {WaiterI} from "./type";
import React from "react";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {removeItemRequest} from "./store/reducer";

interface WaitersListItemPropsI {
    waiter: WaiterI
}

export function WaitersListItem({waiter} : WaitersListItemPropsI) {

    return (
        <tr>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
            <td>
                <Link to={`/waiters/${waiter.id}/edit`}><button>Edit</button></Link>
                <DeleteBtn waiter={waiter}/>
            </td>
        </tr>
    );
}

function DeleteBtn({ waiter }: { waiter: WaiterI }) {
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
            <button onClick={onDeleteBtnClick} disabled={loading}>Delete</button>
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </>
    )
}