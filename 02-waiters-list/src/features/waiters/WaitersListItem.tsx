import {WaiterI} from "./type";

export interface WaitersListItemProps {
    waiter: WaiterI;
    editWaiter: (waiter: WaiterI) => void;
    deleteWaiter: (id: number) => void;
}

export function WaitersListItem({ waiter, editWaiter, deleteWaiter }: WaitersListItemProps) {

    function onEditBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        editWaiter(waiter);
    }

    function onDeleteBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (waiter.id) {
            deleteWaiter(waiter.id);
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