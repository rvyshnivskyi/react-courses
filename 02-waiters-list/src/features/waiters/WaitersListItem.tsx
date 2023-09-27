import {Waiter} from "./type";

export interface WaitersListItemProps {
    waiter: Waiter;
}

export function WaitersListItem(props: { waiter: Waiter }) {
    const {waiter} = props;

    return (
        <tr>
            <td>{waiter.firstName}</td>
            <td>{waiter.phone}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    );
}