import { useSelector, useDispatch } from 'react-redux';
import s from './Filter.module.css';
import { filterContacts } from '../../redux/contacts/contactsSlice';
const Filter = () => {
  const { filter } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  return (
    <label className={s.filter__label} htmlFor="">
      <h3 className={s.title}>Find contact by name</h3>
      <input
        className={s.filter__input}
        placeholder="Name"
        type="text"
        value={filter}
        onChange={e => dispatch(filterContacts(e.target.value))}
      />
    </label>
  );
};
export default Filter;
