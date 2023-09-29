import {Waiter} from "./type";
import {WaitersListItem} from "./WaitersListItem";

interface WaitersListProps {
    waiters: Waiter[];
}

export function WaitersList({waiters}: WaitersListProps) {
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
            {waiters.map(waiter => <WaitersListItem key={waiter.id} waiter={waiter}/>)}
            </tbody>
        </table>
    );
}