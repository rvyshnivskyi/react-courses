import {WaiterI} from "../type";

export const ACTION_START_WAITERS_LIST_LOADING = 'ACTION_START_WAITERS_LIST_LOADING';
export const ACTION_WAITERS_LIST_LOADED = 'ACTION_WAITERS_LIST_LOADED';
export const ACTION_WAITERS_LIST_LOADING_ERROR = 'ACTION_WAITERS_LIST_LOADING_ERROR';
export const ACTION_SET_EDITING_WAITER = 'ACTION_SET_EDITING_WAITER';
export const ACTION_UPDATE_WAITER = 'ACTION_UPDATE_WAITER';
export const ACTION_CREATE_WAITER = 'ACTION_CREATE_WAITER';
export const ACTION_DELETE_WAITER = 'ACTION_DELETE_WAITER';

export function startWaitersListLoadingAction() {
    return {type: ACTION_START_WAITERS_LIST_LOADING}
}

export function waitersListLoadedAction(waiters: WaiterI[]) {
    return {type: ACTION_WAITERS_LIST_LOADED, payload: waiters}
}

export function waitersListLoadingErrorAction(error: Error) {
    return {type: ACTION_WAITERS_LIST_LOADING_ERROR, payload: error}
}

export function setEditingWaiterAction(waiter: WaiterI) {
    return {type: ACTION_SET_EDITING_WAITER, payload: waiter}
}

export function updateWaiterAction(waiter: WaiterI) {
    return {type: ACTION_UPDATE_WAITER, payload: waiter}
}

export function createWaiterAction(waiter: WaiterI) {
    return {type: ACTION_CREATE_WAITER, payload: waiter}
}

export function deleteWaiterAction(id: number) {
    return {type: ACTION_DELETE_WAITER, payload: id}
}