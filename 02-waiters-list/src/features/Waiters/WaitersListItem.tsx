import {WaiterI} from "./type";
import {useDispatch} from "react-redux";
import {deleteWaiter} from "./store/thunk";
import {useState} from "react";
import {delay} from "./utils";
import {setEditingWaiterAction} from "./store/reducer";

interface WaitersListItemPropsI {
    waiter: WaiterI
}

export function WaitersListItem({waiter} : WaitersListItemPropsI) {
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false)
    const [deletingError, setDeletingError] = useState('')

    function onEditBtnClick(ignored: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch(setEditingWaiterAction(waiter));
    }

    async function onDeleteBtnClick(ignored: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            setDeleting(true)
            setDeletingError('')
            try {
                // @ts-ignore
                await dispatch(deleteWaiter(waiter.id));
            } catch (e: any) {
                setDeletingError(e.message)
            } finally {
                setDeleting(false)
                await delay(3000)
                setDeletingError('')
            }
        }
    }

    return (
        <tr>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
            <td>
                <button onClick={onEditBtnClick} disabled={deleting}>Edit</button>
                <button onClick={onDeleteBtnClick} disabled={deleting}>Delete</button>
            </td>
            {deletingError && <span style={{color: 'red'}}>{deletingError}</span>}
        </tr>
    );
}