import {WaiterI} from "./type";
import {WaitersListItem} from "./WaitersListItem";

interface WaitersListProps {
    waiters: WaiterI[];
    editWaiter: (waiter: WaiterI) => void;
    deleteWaiter: (id: number) => void;
}

export function WaitersList({waiters, editWaiter, deleteWaiter}: WaitersListProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {waiters.map(waiter =>
                <WaitersListItem
                    key={waiter.id}
                    waiter={waiter}
                    editWaiter={editWaiter}
                    deleteWaiter={deleteWaiter}
                />)}
            </tbody>
        </table>
    );
}