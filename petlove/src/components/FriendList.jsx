import { useSelector } from "react-redux";
import FriendsItem from "./FriendsItem.jsx";
import {
  selectError,
  selectFriends,
  selectIsLoading,
} from "../redux/friends/selectors.js";
import Loader from "./Loader.jsx";

const FriendsList = () => {
  const friends = useSelector(selectFriends);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap xl:gap-x-5 xl:gap-y-7">
      {isLoading && <Loader />}
      {error && <h3>{error}</h3>}
      {friends?.map((friend) => (
        <li key={friend._id}>
          <FriendsItem friend={friend} />
        </li>
      ))}
    </ul>
  );
};
export default FriendsList;
