import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components/Loader/Loader";
import { AppBar } from "./components/AppBar/AppBar";
import { Contacts } from "./components/Contacts/Contacts";
import { Home } from "./components/Home/Home";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "./redux/auth/authOperation";
import PrivateRoute from "./components/Route/PrivateRoute";
import { PublicRoute } from "./components/Route/PublicRoute";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Suspense>
        <Routes>
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

          <Route path="*" element={<h1>Not found 404</h1>} />
        </Routes>
      </Suspense>
    </>
  );
};
