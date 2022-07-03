import s from './Register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/authOperation';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../Modal/Modal';

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(register({ name, email, password }));

    if (register.fulfilled) {
      reset();
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <ModalWindow>
      <h2 className={s.title}>Register</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={name}
          name="name"
          className={s.input}
          type="name "
          placeholder="Name"
          required
        />
        <input
          onChange={handleChange}
          name="email"
          className={s.input}
          type="email"
          placeholder="Email"
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
          Sign up
        </button>
        <Link className={s.link} to="/login">
          &#8594; to Login
        </Link>
      </form>
    </ModalWindow>
  );
};
