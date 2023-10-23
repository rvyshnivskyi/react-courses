import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

export const waitersListSelector = (state: RootState) => state.waiters.waitersList
export const nameQuerySelector = (state: RootState) => state.waiters.nameQuery
export const phoneQuerySelector = (state: RootState) => state.waiters.phoneQuery
export const isEditingWaiterLoadingSelector = (state: RootState) => state.waiters.isEditingWaiterLoading
export const editingWaiterLoadingErrorSelector = (state: RootState) => state.waiters.editingWaiterLoadingError
export const editingWaiterSelector = (state: RootState) => state.waiters.editingWaiter

export const editingWaiterCombinedSelector = createSelector(
    editingWaiterSelector,
    isEditingWaiterLoadingSelector,
    editingWaiterLoadingErrorSelector,
    (editingWaiter, isEditingWaiterLoading, editingWaiterLoadingError) => ({
        editingWaiter,
        isEditingWaiterLoading,
        editingWaiterLoadingError,
    })
);

export const queriedWaitersListSelector = createSelector(
    waitersListSelector,
    nameQuerySelector,
    phoneQuerySelector,
    (waitersList, nameQuery, phoneQuery) => {
        return waitersList.filter(waiter => {
            return waiter.firstName.toLowerCase().includes(nameQuery?.toLowerCase() || '')
                && waiter.phone.includes(phoneQuery || '')
        })
    }
);