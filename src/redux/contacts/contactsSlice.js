import { addContact, fetchContacts, removeContact } from "./contactsOperations";
import { createSlice } from "@reduxjs/toolkit";

const setPending = (state) => {
  state.status = "loading";
  state.error = null;
};

const setError = (state, { payload }) => {
  state.status = "rejected";
  state.error = payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], filter: "", status: null, error: null },
  reducers: {
    filterContacts: (state, { payload }) => {
      return { ...state, filter: payload };
    },
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.status = "resolved";
      state.items = payload;
    },
    [removeContact.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        status: null,
        items: state.items.filter(({ id }) => {
          return id !== payload;
        }),
      };
    },
    [addContact.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        status: null,
        items: [...state.items, payload],
      };
    },

    [fetchContacts.pending]: setPending,
    [fetchContacts.rejected]: setError,

    [addContact.pending]: setPending,
    [addContact.rejected]: setError,

    [removeContact.pending]: setPending,
    [removeContact.rejected]: setError,
  },
});

export default contactsSlice.reducer;
export const { filterContacts } = contactsSlice.actions;
