import { IActivity } from "@/app/backend/database";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  records: {
    selectedActivity: IActivity | null;
  };
  activities: {
    edit: {
      selected: IActivity | null;
    };
    delete: {
      selected: IActivity | null;
    };
  };
  currentTab: "activities" | "records";
  menuOptions: {
    openedAddDialog: boolean;
    addDialog: {
      submitting: boolean;
    };
  };
};

const initialState: State = {
  records: {
    selectedActivity: null,
  },
  activities: {
    edit: {
      selected: null,
    },
    delete: {
      selected: null,
    },
  },
  currentTab: "records",
  menuOptions: {
    openedAddDialog: false,
    addDialog: {
      submitting: false,
    },
  },
};

const librarySlice = createSlice({
  initialState: initialState,
  name: "libraryStore",
  reducers: {
    changeAddDialog(state, data: PayloadAction<boolean>) {
      state.menuOptions.openedAddDialog = data.payload;
    },

    selectEditActivity(state, data: PayloadAction<IActivity | null>) {
      state.activities.edit.selected = data.payload;
    },

    selectDeleteActivity(state, data: PayloadAction<IActivity | null>) {
      state.activities.delete.selected = data.payload;
    },

    selectActivity(state, data: PayloadAction<IActivity | null>) {
      state.records.selectedActivity = data.payload;
    },
  },
});

export const {
  changeAddDialog,
  selectEditActivity,
  selectDeleteActivity,
  selectActivity,
} = librarySlice.actions;
export default librarySlice.reducer;
