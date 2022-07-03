import s from './Login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/authOperation';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../Modal/Modal';

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));

    if (login.fulfilled) {
      reset();
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <ModalWindow>
      <h2 className={s.title}>Login</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          className={s.input}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={handleChange}
          value={password}
          name="password"
          className={s.input}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" id="signUp" className={s.btn}>
          Login
        </button>
        <Link className={s.link} to="/register">
          &#8594; to Register
        </Link>
      </form>
    </ModalWindow>
  );
};
