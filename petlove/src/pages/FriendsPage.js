import Title from "../components/Title.jsx";
import FriendsList from "../components/FriendsList.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFriends } from "../redux/friends/operations.js";

const FriendsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-10 pt-8 pb-20 md:pt-[53px] md:gap-11 xl:px-8 xl:pt-16 xl:gap-15">
      <Title>Our friends</Title>
      <FriendsList />
    </section>
  );
};

export default FriendsPage;
