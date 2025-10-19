import { configureStore } from '@reduxjs/toolkit'
import routeReducer from '../features/routes/routesSlice'
import logsReducer from '../features/logsSlice/logsSlice'
import draftsReducer from '../features/drafts/draftsSlice'

const store = configureStore({
  reducer: {
    route: routeReducer,
    logs: logsReducer,
    drafts:draftsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;