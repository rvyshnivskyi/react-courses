import {all} from 'redux-saga/effects';
import {waitersWatch} from "../features/Waiters/store/sagas";

export function* rootSaga() {
    yield all([
        waitersWatch(),
    ])
}