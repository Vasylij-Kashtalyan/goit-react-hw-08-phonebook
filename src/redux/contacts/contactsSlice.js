import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './contactsOperations';

const setError = (state, { payload }) => {
  state.status = 'rejected';
  state.error = payload;
};
const setPending = state => {
  state.status = 'loading';
  state.error = null;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], filter: '', status: null, error: null },
  reducers: {
    filterContacts: (state, { payload }) => {
      return { ...state, filter: payload };
    },
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.status = 'resolved';
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
    [removeContact.pending]: setPending,
    [fetchContacts.pending]: setPending,
    [addContact.pending]: setPending,
    [fetchContacts.rejected]: setError,
    [removeContact.rejected]: setError,
    [addContact.rejected]: setError,
  },
});
export default contactsSlice.reducer;
export const { filterContacts } = contactsSlice.actions;
