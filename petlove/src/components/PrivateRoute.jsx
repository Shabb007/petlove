import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/users/selectors.js";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
