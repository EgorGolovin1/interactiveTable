import { createSlice } from "@reduxjs/toolkit";

type ItemProps = {
  address: string;
  name: string;
  id: string;
  checked: boolean;
}[];
const layout = createSlice({
  name: "table",
  initialState: {
    items: [] as ItemProps,
    checkAll: false,
    editableItem: "" as string,
    isEditItem: { id: "", name: "", address: "" } as ItemProps[number],
  },
  reducers: {
    deleteItems: (state) => {
      state.items = state.items.filter((item) => !item.checked);
    },
    addItem: (state, action) => {
      state.items.reverse().push({
        ...action.payload,
      });
      state.items.reverse();
    },
    checkAll: (state, action) => {
      if (action.payload === "unset") {
        state.checkAll = false;
        return;
      }
      state.checkAll = !state.checkAll;
      if (state.checkAll) {
        state.items = state.items.map((e) => {
          e.checked = true;
          return e;
        });
      } else {
        state.items = state.items.map((e) => {
          e.checked = false;
          return e;
        });
      }
    },
    checkItem: (state, action) => {
      state.checkAll = false;
      state.items = state.items.map((e) => {
        if (e.id === action.payload) {
          e.checked = !e.checked;
        }

        return e;
      });
    },
    editItem: (state, action) => {
      state.items = state.items.map((element) => {
        if (element.id === action.payload.id) {
          element.address = action.payload.address;
          element.name = action.payload.name;
        }
        return element;
      });
    },
    uploadData: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    setEditableItem: (state, action) => {
      state.isEditItem = action.payload;
    },
  },
});

export default layout.reducer;
export const {
  deleteItems,
  addItem,
  editItem,
  checkItem,
  checkAll,
  uploadData,
  setEditableItem,
} = layout.actions;
