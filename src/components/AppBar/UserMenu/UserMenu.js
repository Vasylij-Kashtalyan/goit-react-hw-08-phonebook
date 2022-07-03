import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../../redux/auth/authOperation';
import authSelector from '../../../redux/auth/authSelector';
import s from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(authSelector.getUserName);

  return (
    <div>
      <Link to={'/contacts'} className={s.link}>
        {name}
      </Link>
      <button
        className={s.btn}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
};
