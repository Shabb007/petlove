import { useSelector } from "react-redux";
import PetsItem from "./PetsItem.jsx";
import { selectPets } from "../redux/users/selectors.js";

const PetsList = () => {
  const pets = useSelector(selectPets);

  return (
    <ul className="mb-5 flex flex-col gap-3.5 md:flex-row md:flex-wrap xl:mb-10">
      {pets?.map((pet) => (
        <li key={pet._id}>
          <PetsItem pet={pet} />
        </li>
      ))}
    </ul>
  );
};
export default PetsList;
