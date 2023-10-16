import {WaiterI} from "./type";
import {WaitersListItem} from "./WaitersListItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getWaitersList} from "./store/thunk";

export function WaitersList() {
    const waiters = useSelector((state: any) => state.waiters.waitersList);
    const isLoading = useSelector((state: any) => state.waiters.isWaitersListLoading);
    const loadingError = useSelector((state: any) => state.waiters.loadingWaitersListError);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(getWaitersList())
    }, [getWaitersList]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (loadingError) {
        return <div style={{ color: 'red' }}>Error: {loadingError.message}</div>
    }

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
            {waiters.map((waiter: WaiterI) => <WaitersListItem key={waiter.id} waiter={waiter}/>)}
            </tbody>
        </table>
    );
}