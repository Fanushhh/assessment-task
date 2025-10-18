import { configureStore } from '@reduxjs/toolkit'
import routeReducer from '../features/routes/routesSlice'
import logsReducer from "../features/logs/logsSlice"
import draftsReducer from '../features/drafts/draftsSlice'

export const store = configureStore({
  reducer: {
    route: routeReducer,
    logs: logsReducer,
    drafts:draftsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;