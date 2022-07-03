import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './Loader/Loader';
import { AppBar } from './AppBar/AppBar';
import { Contacts } from './Contacts/Contacts';
import { Home } from './Home/Home';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/auth/authOperation';
import PrivateRoute from './Route/PrivateRoute';
import { PublicRoute } from './Route/PublicRoute';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route path="/" index element={<Home />} />
          <Route
            path="register"
            element={
              <PublicRoute redirectTo="/contacts">
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute redirectTo="/contacts">
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<h1>Not found 404</h1>} />
      </Routes>
    </Suspense>
  );
};
