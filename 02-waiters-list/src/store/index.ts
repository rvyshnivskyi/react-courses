import { configureStore } from '@reduxjs/toolkit'
import { reducer as waitersReducer } from "../features/Waiters/store/reducer";

export const store = configureStore({
    reducer: {
        waiters: waitersReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch