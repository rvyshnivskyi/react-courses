import {WaiterI} from "../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const DEFAULT_WAITER: WaiterI = {firstName: '', phone: ''};

interface WaitersListStateI {
    editingWaiter: WaiterI;
    waitersList: WaiterI[];
    isWaitersListLoading: boolean;
    loadingWaitersListError?: string;
    isEditingWaiterLoading: boolean;
    editingWaiterLoadingError?: string;
    nameQuery?: string;
    phoneQuery?: string;
}

const initialState: WaitersListStateI = {
    editingWaiter: DEFAULT_WAITER,
    waitersList: [],
    isWaitersListLoading: false,
    loadingWaitersListError: undefined,
    isEditingWaiterLoading: false,
    editingWaiterLoadingError: undefined,
    nameQuery: undefined,
    phoneQuery: undefined,
}

export const waitersSlice = createSlice({
    name: 'waiters',
    initialState,
    reducers: {
        startWaitersListLoadingAction: (state) => {
            state.isWaitersListLoading = true
            state.loadingWaitersListError = undefined
        },
        waitersListLoadedAction: (state, action: PayloadAction<WaiterI[]>) => {
            state.waitersList = action.payload
            state.isWaitersListLoading = false
        },
        waitersListLoadingErrorAction: (state, action: PayloadAction<string>) => {
            state.loadingWaitersListError = action.payload
            state.isWaitersListLoading = false
        },
        startEditingWaiterLoadingAction: (state) => {
            state.isEditingWaiterLoading = true
            state.editingWaiterLoadingError = undefined
        },
        editingWaiterLoadedAction: (state, action: PayloadAction<WaiterI>) => {
            state.editingWaiter = action.payload
            state.isEditingWaiterLoading = false
        },
        editingWaiterLoadingErrorAction: (state, action: PayloadAction<string>) => {
            state.editingWaiterLoadingError = action.payload
            state.isEditingWaiterLoading = false
        },
        setNameQueryAction: (state, action: PayloadAction<string>) => {
            state.nameQuery = action.payload
        },
        setPhoneQueryAction: (state, action: PayloadAction<string>) => {
            state.phoneQuery = action.payload
        },
        setEditingWaiterAction: (state, action: PayloadAction<WaiterI>) => {
            state.editingWaiter = action.payload
        },
        updateWaiterAction: (state, action: PayloadAction<WaiterI>) => {
            state.waitersList = state.waitersList.map(waiter => {
                if (waiter.id === action.payload.id) {
                    return action.payload
                }
                return waiter
            })
            state.editingWaiter = DEFAULT_WAITER
        },
        createWaiterAction: (state, action: PayloadAction<WaiterI>) => {
            state.waitersList.push(action.payload)
            state.editingWaiter = { ...DEFAULT_WAITER }
        },
        deleteWaiterAction: (state, action: PayloadAction<number>) => {
            state.waitersList = state.waitersList.filter(waiter => waiter.id !== action.payload)
        }
    },
})

export const {
    startWaitersListLoadingAction,
    waitersListLoadedAction,
    waitersListLoadingErrorAction,
    setEditingWaiterAction,
    updateWaiterAction,
    createWaiterAction,
    deleteWaiterAction,
    startEditingWaiterLoadingAction,
    editingWaiterLoadedAction,
    editingWaiterLoadingErrorAction,
    setNameQueryAction,
    setPhoneQueryAction
} = waitersSlice.actions

export const reducer = waitersSlice.reducer