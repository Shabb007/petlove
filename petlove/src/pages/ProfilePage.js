import UserCard from "../components/UserCard.jsx";
import MyNotices from "../components/MyNotices.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/users/operations.js";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <section className="flex flex-col pb-11 md:pb-15 xl:flex-row xl:gap-8 xl:pb-8">
      <UserCard />
      <MyNotices />
    </section>
  );
};

export default ProfilePage;
