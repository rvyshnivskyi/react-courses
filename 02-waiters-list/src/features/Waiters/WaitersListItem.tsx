import {WaiterI} from "./type";
import {setEditingWaiterAction} from "./store/actions";
import {useDispatch} from "react-redux";
import {deleteWaiter} from "./store/thunk";

interface WaitersListItemPropsI {
    waiter: WaiterI
}

export function WaitersListItem({waiter} : WaitersListItemPropsI) {
    const dispatch = useDispatch();

    function onEditBtnClick(ignored: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch(setEditingWaiterAction(waiter));
    }

    function onDeleteBtnClick(ignored: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            // @ts-ignore
            dispatch(deleteWaiter(waiter.id));
        }
    }

    return (
        <tr>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
            <td>
                <button onClick={onEditBtnClick}>Edit</button>
                <button onClick={onDeleteBtnClick}>Delete</button>
            </td>
        </tr>
    );
}