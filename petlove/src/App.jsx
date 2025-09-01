import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/users/selectors.js";
import { refreshUser } from "./redux/users/operations.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RestrictedRoute from "./components/RestrictedRoute.jsx";
import MainScreen from "./components/MainScreen.jsx";
const HomePage = lazy(() => import("./pages/HomePage.js"));
const NewsPage = lazy(() => import("./pages/NewsPage.js"));
const NoticesPage = lazy(() => import("./pages/NoticesPage.js"));
const FriendsPage = lazy(() => import("./pages/FriendsPage.js"));
const RegistrationPage = lazy(() => import("./pages/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/LoginPage.js"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.js"));
const AddPetPage = lazy(() => import("./pages/AddPetPage.js"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const [showMainScreen, setShowMainScreen] = useState(true);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isHomePage = window.location.pathname === "/home";

  if (showMainScreen && isHomePage) {
    return <MainScreen onFinish={() => setShowMainScreen(false)} />;
  }

  return isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo="/profile"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/profile"
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute component={<ProfilePage />} redirectTo="/login" />
            }
          />
          <Route
            path="/add-pet"
            element={
              <PrivateRoute component={<AddPetPage />} redirectTo="/login" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
