import { useState } from "react";
import sprite from "../assets/sprite.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/users/operations.js";
import { selectError } from "../redux/users/selectors.js";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid Email"
    )
    .required("Email is required!"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required!"),
});

const LoginForm = () => {
  const error = useSelector(selectError);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    dispatch(logIn(data));
    if (error) {
      return;
    }
    reset();
  };

  const passwordValue = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-3 w-[295px] md:mb-4 md:w-106"
    >
      <label className="relative mb-2.5 inline-block w-full md:mb-4">
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className={`focus:border-orange h-10.5 w-full rounded-[30px] border ${errors.email ? "border-red focus:border-red" : "border-black/15"} p-3 tracking-[-0.03em] text-black outline-0 md:h-13 md:p-4 md:text-base md:leading-5`}
        />
        {errors.email && (
          <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.03em] md:pl-4">
            {errors.email?.message}
          </p>
        )}
        {errors.email && (
          <svg
            className="fill-red absolute top-3 right-3 md:top-[15px] md:right-4 md:h-5.5 md:w-5.5"
            width={18}
            height={18}
          >
            <use href={sprite + "#icon-close"}></use>
          </svg>
        )}
      </label>
      <label className="relative mb-10 inline-block w-full md:mb-16">
        <input
          {...register("password")}
          type={isVisiblePassword ? "text" : "password"}
          placeholder="Password"
          className={`${passwordValue && passwordValue.length >= 7 ? "border-green focus:border-green" : "focus:border-orange"} h-10.5 w-full rounded-[30px] border ${errors.password ? "border-red focus:border-red" : "border-black/15"} p-3 tracking-[-0.03em] text-black outline-0 md:h-13 md:p-4 md:text-base md:leading-5`}
        />
        <button
          className="absolute top-3 right-3 cursor-pointer border-0 outline-0 md:top-[15px] md:right-4"
          type="button"
          onClick={() => setIsVisiblePassword(!isVisiblePassword)}
        >
          {isVisiblePassword ? (
            <svg
              className="fill-orange md:h-5.5 md:w-5.5"
              width={18}
              height={18}
            >
              <use href={sprite + "#icon-eye"}></use>
            </svg>
          ) : (
            <svg
              className="fill-orange md:h-5.5 md:w-5.5"
              width={18}
              height={18}
            >
              <use href={sprite + "#icon-eye-off"}></use>
            </svg>
          )}
        </button>
        {!errors.password && passwordValue && passwordValue.length >= 7 && (
          <svg
            className="fill-green absolute top-3 right-9.5 md:top-[15px] md:right-12.5 md:h-5.5 md:w-5.5"
            width={18}
            height={18}
          >
            <use href={sprite + "#icon-check"}></use>
          </svg>
        )}
        {!errors.password && passwordValue && passwordValue.length >= 7 && (
          <p className="text-green mt-1 pl-3 text-xs leading-3.5 tracking-[-0.03em] md:pl-4">
            Password is secure
          </p>
        )}
        {errors.password && (
          <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.03em] md:pl-4">
            {errors.password?.message}
          </p>
        )}
      </label>
      <button
        className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary block h-10.5 w-[295px] cursor-pointer rounded-[30px] border-0 px-31.5 py-3 text-[14px] leading-[18px] font-bold tracking-[-0.03em] text-white uppercase outline-0 transition md:h-13 md:w-106 md:px-[187.5px] md:py-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
        type="submit"
      >
        Log In
      </button>
    </form>
  );
};
export default LoginForm;
