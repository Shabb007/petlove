import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/users/selectors.js";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
