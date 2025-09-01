import { Link } from "react-router-dom";
import PetBlock from "../components/PetBlock.jsx";
import Title from "../components/Title.jsx";
import LoginForm from "../components/LoginForm.jsx";
import loginMobImg from "../assets/img/login-mob@1x.webp";
import loginMobImg2x from "../assets/img/login-mob@2x.webp";
import loginTabImg from "../assets/img/login-tab@1x.webp";
import loginTabImg2x from "../assets/img/login-tab@2x.webp";
import loginDeskImg from "../assets/img/login-desk@1x.webp";
import loginDeskImg2x from "../assets/img/login-desk@2x.webp";

const LoginPage = () => {
  return (
    <section className="flex flex-col gap-2.5 pb-5 md:gap-4 md:pb-8 xl:flex-row xl:gap-8">
      <PetBlock
        mob={`${loginMobImg} 1x, ${loginMobImg2x} 2x`}
        tab={`${loginTabImg} 1x, ${loginTabImg2x} 2x`}
        desk={`${loginDeskImg} 1x, ${loginDeskImg2x} 2x`}
        src={loginDeskImg}
      />
      <div className="rounded-[30px] bg-white px-5 py-15 md:rounded-[60px] md:px-35 md:py-[71px] xl:px-21 xl:py-29.5">
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:gap-4 xl:w-106">
          <Title>Log In</Title>
          <p className="md:text-lg md:leading-5.5 md:tracking-[-0.02em]">
            Welcome! Please enter your credentials to login to the platform:
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-xs leading-3.5 tracking-[-0.36px] text-black/50 md:text-sm md:leading-5 md:tracking-[-0.03em]">
          Don’t have an account?{" "}
          <Link
            className="text-orange font-bold underline decoration-solid decoration-auto underline-offset-auto md:text-sm md:leading-5 md:tracking-[-0.03em]"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
