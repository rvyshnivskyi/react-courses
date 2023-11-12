import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
    createWaiterAction,
    deleteWaiterAction,
    editingWaiterLoadedAction,
    editingWaiterLoadingErrorAction,
    removeItemRequestType,
    startEditingWaiterLoadingAction,
    startWaitersListLoadingAction,
    startWaiterUpdatingAction,
    updateWaiterAction,
    waitersListLoadedAction,
    waitersListLoadingErrorAction,
    waiterUpdatingErrorAction,
    WaiterUpdatingRequest
} from "./reducer";
import {WaiterI} from "../type";
import {WaitersApi} from "../api/server";
import {PayloadAction} from "@reduxjs/toolkit";

function* getWaitersListWorker() {
    try {
        const waitersList: WaiterI[] = yield call([WaitersApi, 'getList'])

        yield put(waitersListLoadedAction(waitersList))
    } catch (error: any) {
        yield put(waitersListLoadingErrorAction(error.message))
    }
}

interface RemoveWaiterPayload {
    id: number
    resolve: () => any
    reject: () => any
}

function* removeWaiterWorker(action: PayloadAction<RemoveWaiterPayload>) {
    try {
        yield call([WaitersApi, 'delete'], action.payload.id)
        yield put(deleteWaiterAction(action.payload.id))

        action.payload.resolve()
    } catch (error: any) {
        action.payload.reject()
    }
}

function* getEditingWaiterWorker(action: PayloadAction<string>) {
    try {
        const editingWaiter: WaiterI = yield call([WaitersApi, 'getOne'], action.payload)

        yield put(editingWaiterLoadedAction(editingWaiter))
    } catch (error: any) {
        yield put(editingWaiterLoadingErrorAction(error))
    }
}

function* updateWaiterWorker(action: PayloadAction<WaiterUpdatingRequest>) {
    try {
        const waiter = action.payload.updatedWaiter;
        if (waiter.id) {
            const updatedWaiter: WaiterI = yield call([WaitersApi, 'update'], waiter.id, waiter)
            yield put(updateWaiterAction(updatedWaiter))
        } else {
            const newWaiter: WaiterI = yield call([WaitersApi, 'create'], waiter)
            yield put(createWaiterAction(newWaiter))
        }
        action.payload.callback()
    } catch (error: any) {
        yield put(waiterUpdatingErrorAction(error))
    }
}

export function* waitersWatch() {
    yield all([
        takeEvery(startWaitersListLoadingAction, getWaitersListWorker),
        takeEvery(removeItemRequestType, removeWaiterWorker),
        takeEvery(startEditingWaiterLoadingAction, getEditingWaiterWorker),
        takeEvery(startWaiterUpdatingAction, updateWaiterWorker)
    ])
}