import {combineReducers} from "redux";
import {reducer as waitersReducer} from "../features/Waiters/store/reducer";

export const rootReducer = combineReducers({
    waiters: waitersReducer
})