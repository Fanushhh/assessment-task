import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ServiceLog } from "../../types";

export interface LogsState {
  logs: ServiceLog[];
}

const initialState: LogsState = {
  logs: [],
};

const LOG_STORAGE_KEY = "serviceLogs";

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog(state, action: PayloadAction<ServiceLog>) {
      state.logs.push(action.payload);
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(state.logs));
    },
    setLogs(state, action: PayloadAction<ServiceLog[]>) {
      state.logs = action.payload;
    },
    getLogsFromStorage(state) {
      const logs = localStorage.getItem(LOG_STORAGE_KEY);
      if (logs) state.logs = JSON.parse(logs);
    },
  },
});

export const { addLog, setLogs, getLogsFromStorage } = logsSlice.actions;
export default logsSlice.reducer;

