import {WaiterI} from "../type";
import {
    createWaiterAction,
    deleteWaiterAction,
    startWaitersListLoadingAction,
    updateWaiterAction,
    waitersListLoadedAction,
    waitersListLoadingErrorAction
} from "./actions";
import {WaitersApi} from "../api/server";

export function saveWaiter(waiter: WaiterI) {
    return (dispatch: any) => {
        if (waiter.id) {
            WaitersApi.update(waiter.id, waiter).then((updatedWaiter) => {
                dispatch(updateWaiterAction(updatedWaiter))
            })
        } else {
            WaitersApi.create(waiter).then((newWaiter) => {
                dispatch(createWaiterAction(newWaiter))
            })
        }
    }
}

export function deleteWaiter(id: number) {
    return (dispatch: any) => {
        WaitersApi.delete(id).then(() => {
            dispatch(deleteWaiterAction(id))
        })
    }
}

export function getWaitersList() {
    return (dispatch: any) => {
        dispatch(startWaitersListLoadingAction())

        WaitersApi.getList()
            .then((waiters) => {
                dispatch(waitersListLoadedAction(waiters))
            })
            .catch((error) => {
                dispatch(waitersListLoadingErrorAction(error))
            })
    }
}