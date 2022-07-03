import s from './AppBar.module.css';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';
import { AuthNav } from './AuthNav/AuthNav';
import { UserMenu } from './UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import authSelelector from '../../redux/auth/authSelector';

export const AppBar = () => {
  const isLoggedIn = useSelector(authSelelector.getIsLoggedIn);
  return (
    <div className="container">
      <header className={s.header}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
