import { NavLink } from "react-router-dom";
import s from "../AppBar.module.css";
export const Navigation = () => {
  return (
    <nav>
      <NavLink
        exact="true"
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        HOME
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Contacts
      </NavLink>
    </nav>
  );
};
