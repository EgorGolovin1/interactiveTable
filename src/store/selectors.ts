import { RootState } from "./index";

export const checkAllSelector = (state: RootState) => state.table.checkAll;
export const itemsSelector = (state: RootState) => state.table.items;
export const editableItemSelector = (state: RootState) =>
  state.table.isEditItem;
