import {FormEdit} from "./FormEdit";
import {WaitersList} from "./WaitersList";
import {useWaiter} from "./hooks/useWaiter";

export function WaitersApp() {

    const {editingWaiter, onWaiterSubmit, waiters, editWaiter, deleteWaiter} = useWaiter();

    return (
        <div>
            <FormEdit waiter={editingWaiter} onWaiterSubmit={onWaiterSubmit}/>
            <br/>
            <WaitersList waiters={waiters} editWaiter={editWaiter} deleteWaiter={deleteWaiter}/>
        </div>
    )
}