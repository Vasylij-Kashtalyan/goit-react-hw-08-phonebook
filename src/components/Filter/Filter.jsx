import s from "./Filter.module.css";
import { filterContacts } from "../../redux/contacts/contactsSlice";
import { useSelector, useDispatch } from "react-redux";

const Filter = () => {
  const { filter } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  return (
    <label className={s.filter__label} htmlFor="">
      <p>Find contacts by name</p>
      <input
        className={s.filter__input}
        type="text"
        value={filter}
        onChange={(e) => dispatch(filterContacts(e.target.value))}
      />
    </label>
  );
};
export default Filter;
