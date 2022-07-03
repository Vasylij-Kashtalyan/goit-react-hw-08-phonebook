import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  addContact,
  fetchContacts,
  removeContact,
} from 'redux/contacts/contactsOperations';
import s from './Contacts.module.css';
import Filter from '../Filter/Filter';
import Notiflix from 'notiflix';

export const Contacts = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const { items, filter } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      items.map(items => items.name.toLowerCase()).includes(name.toLowerCase())
    ) {
      return Notiflix.Notify.warning(`${name} is already in contacts`);
    }

    dispatch(addContact({ name, number }));

    if (addContact.fulfilled) {
      reset();
      return Notiflix.Notify.success(`${name} is adde in contacts`);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={s.div}>
      <div>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Name"
            className={s.form__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />

          <input
            onChange={handleChange}
            placeholder="Number"
            className={s.form__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
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
            .map(contact => {
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
