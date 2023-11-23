import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { reducer as waitersReducer } from "../features/Waiters/store/reducer";
import {rootSaga} from "./saga";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        waiters: waitersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch