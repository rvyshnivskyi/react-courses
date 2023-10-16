import {WaiterI} from "../type";
import {
    ACTION_CREATE_WAITER,
    ACTION_DELETE_WAITER,
    ACTION_SET_EDITING_WAITER, ACTION_START_WAITERS_LIST_LOADING,
    ACTION_UPDATE_WAITER, ACTION_WAITERS_LIST_LOADED, ACTION_WAITERS_LIST_LOADING_ERROR
} from "./actions";

const DEFAULT_WAITER: WaiterI = {firstName: '', phone: ''};

interface INITIAL_STATE_I {
    editingWaiter: WaiterI;
    waitersList: WaiterI[];
    isWaitersListLoading: boolean;
    loadingWaitersListError?: Error;
}

const INITIAL_STATE: INITIAL_STATE_I = {
    editingWaiter: DEFAULT_WAITER,
    waitersList: [],
    isWaitersListLoading: false,
    loadingWaitersListError: undefined
}

export const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ACTION_START_WAITERS_LIST_LOADING:
            return {...state, isWaitersListLoading: true, loadingWaitersListError: undefined}
        case ACTION_WAITERS_LIST_LOADED:
            return {...state, isWaitersListLoading: false, waitersList: action.payload}
        case ACTION_WAITERS_LIST_LOADING_ERROR:
            return {...state, isWaitersListLoading: false, loadingWaitersListError: action.payload}
        case ACTION_SET_EDITING_WAITER:
            return {...state, editingWaiter: action.payload}
        case ACTION_UPDATE_WAITER:
            return {
                ...state,
                waitersList: state.waitersList.map(waiter => waiter.id === action.payload.id ? action.payload : waiter),
                editingWaiter: DEFAULT_WAITER
            }
        case ACTION_CREATE_WAITER:
            return {...state, waitersList: [...state.waitersList, action.payload], editingWaiter: {...DEFAULT_WAITER}}
        case ACTION_DELETE_WAITER:
            return {...state, waitersList: state.waitersList.filter(waiter => waiter.id !== action.payload)}
        default:
            return state;
    }

}