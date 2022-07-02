import axios from "axios";

axios.defaults.baseURL = "https://62b866cb03c36cb9b7c666cf.mockapi.io";

export async function contactsAPI() {
  const { data } = await axios.get("/contacts");
  return data;
}

export const createContact = async (values) => {
  const { data } = await axios.post("/contacts", values);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};
