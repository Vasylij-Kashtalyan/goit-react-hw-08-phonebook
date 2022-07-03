import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import authSelectors from '../../redux/auth/authSelector';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children, redirectTo = '/login' }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return <>{isLoggedIn ? children : <Navigate to={redirectTo} />}</>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};
