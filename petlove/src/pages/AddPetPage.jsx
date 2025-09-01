import AddPetForm from "../components/AddPetForm.jsx";
import PetBlock from "../components/PetBlock.jsx";
import addPetMobImg from "../assets/img/add-pet-mob@1x.webp";
import addPetMobImg2x from "../assets/img/add-pet-mob@2x.webp";
import addPetTabImg from "../assets/img/add-pet-tab@1x.webp";
import addPetTabImg2x from "../assets/img/add-pet-tab@2x.webp";
import addPetDeskImg from "../assets/img/add-pet-desk@1x.webp";
import addPetDeskImg2x from "../assets/img/add-pet-desk@2x.webp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNoticeSpecies } from "../redux/notices/operations.js";

const AddPetPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNoticeSpecies());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-2.5 pb-5 md:gap-4 md:pb-8 xl:flex-row xl:gap-8">
      <PetBlock
        mob={`${addPetMobImg} 1x, ${addPetMobImg2x} 2x`}
        tab={`${addPetTabImg} 1x, ${addPetTabImg2x} 2x`}
        desk={`${addPetDeskImg} 1x, ${addPetDeskImg2x} 2x`}
        src={addPetDeskImg}
      />
      <AddPetForm />
    </section>
  );
};

export default AddPetPage;
