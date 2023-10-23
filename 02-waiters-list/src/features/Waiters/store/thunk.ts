import {WaiterI} from "../type";
import {WaitersApi} from "../api/server";
import {
    createWaiterAction,
    deleteWaiterAction,
    editingWaiterLoadedAction,
    editingWaiterLoadingErrorAction,
    startEditingWaiterLoadingAction,
    startWaitersListLoadingAction,
    updateWaiterAction,
    waitersListLoadedAction,
    waitersListLoadingErrorAction
} from "./reducer";

export function saveWaiter(waiter: WaiterI) {
    return async (dispatch: any) => {
        if (waiter.id) {
            const updatedWaiter = await WaitersApi.update(waiter.id, waiter)
            dispatch(updateWaiterAction(updatedWaiter))
        } else {
            const newWaiter = await WaitersApi.create(waiter)
            dispatch(createWaiterAction(newWaiter))
        }
    }
}

export function deleteWaiter(id: number) {
    return async (dispatch: any) => {
        await WaitersApi.delete(id)
        dispatch(deleteWaiterAction(id))
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
                dispatch(waitersListLoadingErrorAction(error.message))
            })
    }
}

export function getEditingWaiter(id: number) {
    return async (dispatch: any) => {
        dispatch(startEditingWaiterLoadingAction())

        try {
            const editingWaiter = await WaitersApi.getOne(id)

            dispatch(editingWaiterLoadedAction(editingWaiter))
        } catch (error: any) {
            dispatch(editingWaiterLoadingErrorAction(error.message))
        }
    }
}