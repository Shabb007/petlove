import { Link } from "react-router-dom";
import PetBlock from "../components/PetBlock.jsx";
import Title from "../components/Title.jsx";
import RegistrationForm from "../components/RegistrationForm.jsx";
import registerMobImg from "../assets/img/registermob1.jpeg";
import registerMobImg2x from "../assets/img/registermob2.jpeg";
import registerTabImg from "../assets/img/registertab1.jpeg";
import registerTabImg2x from "../assets/img/registertab2.jpeg";
import registerDeskImg from "../assets/img/registerdesk1.jpeg";
import registerDeskImg2x from "../assets/img/registerdesk2.jpeg";

const RegistrationPage = () => {
  return (
    <section className="flex flex-col gap-2.5 pb-5 md:gap-4 md:pb-8 xl:flex-row xl:gap-8">
      <PetBlock
        mob={`${registerMobImg} 1x, ${registerMobImg2x} 2x`}
        tab={`${registerTabImg} 1x, ${registerTabImg2x} 2x`}
        desk={`${registerDeskImg} 1x, ${registerDeskImg2x} 2x`}
        src={registerDeskImg}
      />
      <div className="rounded-[30px] bg-white p-5 md:rounded-[60px] md:px-35 md:py-7.5 xl:px-21 xl:py-[77px]">
        <div className="mb-5 flex flex-col gap-3 md:mb-8 md:gap-4 xl:w-106">
          <Title>Registration</Title>
          <p className="md:text-lg md:leading-5.5 md:tracking-[-0.02em]">
            Thank you for your interest in our platform.
          </p>
        </div>
        <RegistrationForm />
        <p className="text-center text-xs leading-3.5 tracking-[-0.36px] text-black/50 md:text-sm md:leading-5 md:tracking-[-0.03em]">
          Already have an account?{" "}
          <Link
            className="text-orange font-bold underline decoration-solid decoration-auto underline-offset-auto md:text-sm md:leading-5 md:tracking-[-0.03em]"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegistrationPage;
