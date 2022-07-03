import { NavLink } from 'react-router-dom';
import s from '../AppBar.module.css';
export const AuthNav = () => {
  return (
    <div>
      <NavLink
        exact="true"
        to="/register"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Login
      </NavLink>
    </div>
  );
};
