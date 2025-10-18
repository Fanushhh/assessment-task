import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type RoutesState = "/" | "drafts" | "log-table";

interface RouteSliceState {
  currentRoute: RoutesState;
}

const initialState: RouteSliceState = {
  currentRoute: "/",
};

export const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<RoutesState>) => {
      state.currentRoute = action.payload; 
    },
  },
});

export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;
