import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' />;
  // либо если не требуется дополнять пропсы return props.loggedIn ? Component : <Navigate to='/sign-in' />;
}

export default ProtectedRoute;
