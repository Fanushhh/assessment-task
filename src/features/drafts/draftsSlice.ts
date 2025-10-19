import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ServiceLog } from "../../types";
import {
  saveDraftToStorage,
  loadAllDraftsFromStorage,
  deleteDraftFromStorage,
  clearAllDraftsFromStorage,
} from "../../app/utils/storage"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../logsSlice/logsSlice";
import type { RootState } from "../../app/store";
export interface DraftState {
  drafts: ServiceLog[];
  status: "idle" | "saving" | "saved";
}

const initialState: DraftState = {
  drafts: loadAllDraftsFromStorage<ServiceLog>(),
  status: "idle",
};

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    createDraft(state) {
      const newDraft: ServiceLog = {
        id: uuidv4(),
        providerId: "",
        serviceOrder: "",
        carId: "",
        odometer: 0,
        engineHours: 0,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        type: "planned",
        serviceDescription: "",
      };
      state.drafts.push(newDraft);
      saveDraftToStorage(newDraft.id, newDraft);
      state.status = "saved";
    },

    updateDraftField(
      state,
      action: PayloadAction<{
        id: string;
        field: keyof ServiceLog;
        value: string | number;
      }>
    ) {
      const { id, field, value } = action.payload;
      const draft = state.drafts.find((d) => d.id === id);
      if (draft) {
        // Handle dependent fields
        if (field === "startDate") {
          const nextDay = new Date(value as string);
          nextDay.setDate(nextDay.getDate() + 1);
          draft.endDate = nextDay.toISOString().split("T")[0];
        }
        (draft[field] as any) = value;
        state.status = "saving";
        saveDraftToStorage(draft.id, draft);
        state.status = "saved";
       
      }
    },

    deleteDraft(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.drafts = state.drafts.filter((d) => d.id !== id);
      deleteDraftFromStorage(id);
    },

    clearDrafts(state) {
      state.drafts = [];
      clearAllDraftsFromStorage();
    },
    
  },
});

// Save draft as log
export const saveDraftAsLog = createAsyncThunk(
  "draft/saveDraftAsLog",
  (draftId: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const draft = state.drafts.drafts.find((d) => d.id === draftId);
    if (draft) {
      dispatch(addLog(draft));   // add to logs slice
      dispatch(deleteDraft(draftId)); // remove from drafts slice
    }
  }
);

export const { createDraft, updateDraftField, deleteDraft, clearDrafts } =
  draftsSlice.actions;
export default draftsSlice.reducer;
