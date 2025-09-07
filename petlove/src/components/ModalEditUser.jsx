import sprite from "../assets/sprite.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectUser } from "../redux/users/selectors.js";
import { useEffect, useRef, useState } from "react";
import { updateUser } from "../redux/users/operations.js";
import toast from "react-hot-toast";

const userSchema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid email address"
    ),
  phone: yup
    .string()
    .test(
      "is-valid-phone",
      "Enter a valid phone number (e.g., 05331234567)",
      (value) => {
        if (!value) return true;
        const phonePattern = /^05\d{9}$/;
        return phonePattern.test(value);
      }
    ),
  avatar: yup.string().test("is-url", "Enter a valid URL", (value) => {
    if (!value) return true;
    const urlPattern = new RegExp(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/
    );
    return urlPattern.test(value);
  }),
});

const cloudName = "do0ywvaar";
const uploadPreset = "avatar_upload";

const ModalEditUser = ({ isOpen, onClose }) => {
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const backdropRef = useRef(null);

  if (!isOpen) return null;

  if (!user) return;
  const { name, email, phone, avatar } = user;

  const [formValues, setFormValues] = useState({
    name: name,
    email: email,
    phone: phone,
    avatar: avatar,
  });

  // Convert Turkish phone format (05XXXXXXXXX) to Ukrainian format (+38XXXXXXXXXX)
  const convertTurkishToUkrainianPhone = (turkishPhone) => {
    if (!turkishPhone || !turkishPhone.startsWith('05')) {
      return turkishPhone;
    }
    // Convert 05XXXXXXXXX to +380XXXXXXXXX
    return '+38' + turkishPhone.substring(1);
  };

  // Convert Ukrainian phone format (+38XXXXXXXXXX) to Turkish format (05XXXXXXXXX) for display
  const convertUkrainianToTurkishPhone = (ukrainianPhone) => {
    if (!ukrainianPhone || !ukrainianPhone.startsWith('+38')) {
      return ukrainianPhone;
    }
    // Convert +380XXXXXXXXX to 05XXXXXXXXX
    return '0' + ukrainianPhone.substring(3);
  };

  useEffect(() => {
    setFormValues({ name, email, phone, avatar });
  }, [name, email, phone, avatar]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
      name: name || "",
      email: email || "",
      phone: convertUkrainianToTurkishPhone(phone) || "",
      avatar: avatar || "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const imageUrl = data.secure_url;
      setFormValues((prevValues) => ({
        ...prevValues,
        avatar: imageUrl,
      }));
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  const onSubmit = (data) => {
    // Filter out empty strings and undefined values
    const userData = Object.fromEntries(
      Object.entries({
        ...data,
        avatar: formValues.avatar || data.avatar,
      }).filter(([key, value]) => value !== "" && value !== undefined && value !== null)
    );
    
    // Convert Turkish phone to Ukrainian format for backend
    if (userData.phone) {
      userData.phone = convertTurkishToUkrainianPhone(userData.phone);
    }
    
    console.log("Form data being sent:", userData);
    dispatch(updateUser(userData));
    
    if (error) {
      return;
    }
    onClose();
  };

  const handleCloseModal = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/30"
      ref={backdropRef}
      onClick={handleCloseModal}
    >
      <div className="relative flex w-[335px] flex-col rounded-[30px] bg-white px-5 py-10 md:w-120 md:p-12.5">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <svg className="fill-black" width={24} height={24}>
            <use href={sprite + "#icon-close"}></use>
          </svg>
        </button>
        <h2 className="text-black-secondary mb-5 text-xl leading-5 font-bold md:text-lg md:leading-6">
          Edit information
        </h2>
        <div className="mb-3 flex items-center justify-center">
          <span className="bg-orange flex h-20 w-20 items-center justify-center overflow-hidden rounded-full md:h-21.5 md:w-21.5">
            <img src={avatar ? avatar : null} alt="Avatar" />
          </span>
        </div>
        <form
          className="flex w-[295px] flex-col items-center justify-center gap-[21px] md:w-95 md:gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2.5 md:gap-5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="avatar">
                <input
                  {...register("avatar")}
                  className={
                    avatar
                      ? "border-orange h-10.5 w-[161px] overflow-hidden rounded-[30px] border py-[13px] pr-[39px] pl-3 text-xs leading-4 font-medium tracking-[-0.24px] text-ellipsis whitespace-nowrap outline-0 md:w-56.5 md:py-3 md:pr-5"
                      : "h-10.5 w-[161px] overflow-hidden rounded-[30px] border border-black/15 py-[13px] pr-[39px] pl-3 text-xs leading-4 font-medium tracking-[-0.24px] text-ellipsis whitespace-nowrap outline-0 md:w-56.5 md:py-3 md:pr-5"
                  }
                  type="text"
                  id="avatar"
                  name="avatar"
                  placeholder="https://ftp.goit.study/img/pets/5.webp"
                  value={formValues.avatar}
                  onChange={handleInputChange}
                />
                {errors.avatar && (
                  <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                    {errors.avatar?.message}
                  </p>
                )}
              </label>
              <label
                htmlFor="uploadBtn"
                className="bg-brown-light focus:bg-brown-light-secondary hover:bg-brown-light-secondary flex h-10.5 w-31.5 cursor-pointer items-center justify-center gap-2 rounded-[30px] border-0 px-3 py-[13px] text-xs leading-4 font-medium tracking-[-0.24px] text-black outline-0 transition md:w-36.5 md:px-4 md:py-3 md:text-sm md:leading-4.5 md:tracking-[-0.02em]"
              >
                <input
                  className="hidden"
                  id="uploadBtn"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadAvatar}
                />
                Upload photo
                <svg width={18} height={18} className="fill-orange">
                  <use href={sprite + "#icon-upload-cloud"}></use>
                </svg>
              </label>
            </div>
            <div className="flex w-full flex-col items-center gap-2.5 md:gap-3.5">
              <label className="w-full" htmlFor="name">
                <input
                  {...register("name")}
                  className={
                    name
                      ? "border-orange h-10.5 w-full rounded-[30px] border p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                      : "h-10.5 w-full rounded-[30px] border border-black/15 p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                  }
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                    {errors.name?.message}
                  </p>
                )}
              </label>
              <label className="w-full" htmlFor="email">
                <input
                  {...register("email")}
                  className={
                    email
                      ? "border-orange h-10.5 w-full rounded-[30px] border p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                      : "h-10.5 w-full rounded-[30px] border border-black/15 p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                  }
                  type="text"
                  id="email"
                  name="email"
                  placeholder="name@gmail.com"
                />
                {errors.email && (
                  <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                    {errors.email?.message}
                  </p>
                )}
              </label>
              <label className="w-full" htmlFor="phone">
                <input
                  {...register("phone")}
                  className={
                    phone
                      ? "border-orange h-10.5 w-full rounded-[30px] border p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                      : "h-10.5 w-full rounded-[30px] border border-black/15 p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                  }
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="05331234567"
                />
                {errors.phone && (
                  <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                    {errors.phone?.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          <button
            className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary h-10.5 w-full cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-bold tracking-[-0.42px] text-white outline-0 transition md:h-13 md:text-base md:leading-5 md:tracking-[-0.03em]"
            type="submit"
          >
            Go to profile
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalEditUser;
