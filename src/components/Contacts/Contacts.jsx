import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addContact,
  fetchContacts,
  removeContact,
} from "../../redux/contacts/contactsOperations";
import Notiflix from "notiflix";
import s from "./Contacts.module.css";
import Filter from "../Filter/Filter";

export const Contacts = () => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    name: "",
    number: "",
  });
  const { items, filter } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(contact));
    setContact({ name: "", number: "" });
  };

  return (
    <div className={s.div}>
      <div>
        <form className={s.form} onSubmit={handleSubmit}>
          <label className={s.form__label}>
            Name
            <input
              onChange={handleChange}
              className={s.form__input}
              // value={contact}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className={s.form__label}>
            Number
            <input
              onChange={handleChange}
              className={s.form__input}
              // value={contact}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button className={s.form__button} type="submit">
            Add Contact
          </button>
        </form>
      </div>

      <div>
        <Filter />
        <ul>
          {items
            .filter(({ name }) =>
              name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((contact) => {
              return (
                <li key={contact.id} className={s.item}>
                  <button
                    key={contact.id}
                    name={contact.name}
                    className={s.buttonDelete}
                    type="button"
                    onClick={() => dispatch(removeContact(contact.id))}
                  >
                    Delete
                  </button>
                  {contact.name}: {contact.number}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
