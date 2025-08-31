import { Link, useNavigate } from "react-router-dom";
import sprite from "../assets/sprite.svg";
import Select, { components } from "react-select";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserPet } from "../redux/users/operations.js";
import clsx from "clsx";
import { selectSpecies } from "../redux/notices/selectors.js";
import toast from "react-hot-toast";
import { selectError } from "../redux/users/selectors.js";

const petSchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  name: yup.string().required("Pet's name is required!"),
  imgURL: yup
    .string()
    .test("is-url", "Enter a valid URL", (value) => {
      if (!value) return true;
      const urlPattern = new RegExp(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/
      );
      return urlPattern.test(value);
    })
    .required("Image URL is required!"),
  species: yup.string().required("Species is required!"),
  birthday: yup
    .string()
    .test(
      "is-date",
      "Enter a valid birthday date (e.g., 2025-01-01)",
      (value) => {
        if (!value) return true;
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return datePattern.test(value);
      }
    )
    .required("Birthday is required!"),
  sex: yup.string().required("Sex of pet is required!"),
});

const cloudName = "do0ywvaar";
const uploadPreset = "avatar_upload";

const AddPetForm = () => {
  const species = useSelector(selectSpecies);
  const error = useSelector(selectError);
  const [selectedType, setSelectedType] = useState(null);
  const [urlInputValue, setUrlInputValue] = useState("");
  const [titleInputValue, setTitleInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [birthdayInputValue, setBirthdayInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(petSchema),
    mode: "onSubmit",
  });

  const handleUploadPetAvatar = async (e) => {
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
      setUrlInputValue(imageUrl);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  const onSubmit = (data) => {
    dispatch(addUserPet(data));
    if (error) {
      return;
    }
    reset();
    navigate("/profile");
  };

  const controlStyles = selectedType
    ? "hover:cursor-pointer border border-orange rounded-[30px] bg-white h-10.5 p-3 md:h-13 md:p-4"
    : "hover:cursor-pointer border border-black/15 rounded-[30px] bg-white h-10.5 p-3 md:h-13 md:p-4";
  const singleValueStyles =
    "capitalize md:text-base md:leading-5 md:tracking-[-0.03em]";
  const menuStyles =
    "p-3 mt-1 bg-white border border-black/15 rounded-[15px] text-black/60 md:text-base md:leading-5 md:tracking-[-0.03em]";
  const menuListStyles = "h-19 md:h-35.5 overflow-y-auto";
  const placeholderStyles =
    "text-black/50 md:text-base md:leading-5 md:tracking-[-0.03em]";
  const optionStyles = {
    base: "capitalize text-black/60",
    focus: "active:text-orange",
    selected: "text-orange",
  };

  const DropdownIndicatorChevron = (props) => (
    <components.DropdownIndicator {...props}>
      <svg width={18} height={18} className="fill-black md:h-5 md:w-5">
        <use href={sprite + "#icon-chevron-down"}></use>
      </svg>
    </components.DropdownIndicator>
  );

  const handleChangeUrlInputValue = (e) => {
    setUrlInputValue(e.target.value);
  };

  const handleChangeTitleInputValue = (e) => {
    setTitleInputValue(e.target.value);
  };

  const handleChangeNameInputValue = (e) => {
    setNameInputValue(e.target.value);
  };

  const handleChangeBirthdayInputValue = (e) => {
    setBirthdayInputValue(e.target.value);
  };

  return (
    <div className="rounded-[30px] bg-white px-5 pt-7 pb-5 md:rounded-[60px] md:px-34 md:py-10 xl:px-20 xl:py-15">
      <div className="mb-6 flex items-baseline gap-2 md:mb-10">
        <h2 className="text-[28px] leading-7 font-bold tracking-[-0.84px] md:text-[32px] md:leading-8 md:tracking-[-0.03em]">
          Add my pet /
        </h2>
        <p className="font-bold text-zinc-800/40 md:text-base md:leading-5">
          Personal details
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[295px] md:w-108">
        <div className="mb-2 flex justify-start gap-2 md:mb-[-22px] xl:mb-[-16px]">
          <label
            className="bg-red-secondary/10 has-checked:bg-red-secondary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition md:h-10 md:w-10"
            htmlFor="female"
          >
            <input
              {...register("sex")}
              className="peer hidden"
              type="radio"
              id="female"
              value="female"
            />
            <svg
              width={20}
              height={20}
              className="fill-red-secondary peer-checked:fill-white md:h-6 md:w-6"
            >
              <use href={sprite + "#icon-female"}></use>
            </svg>
          </label>
          <label
            className="bg-blue/10 has-checked:bg-blue flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition md:h-10 md:w-10"
            htmlFor="male"
          >
            <input
              {...register("sex")}
              className="peer hidden"
              type="radio"
              id="male"
              value="male"
            />
            <svg
              width={20}
              height={20}
              className="fill-blue peer-checked:fill-white md:h-6 md:w-6"
            >
              <use href={sprite + "#icon-male"}></use>
            </svg>
          </label>
          <label
            className="bg-orange/10 has-checked:bg-orange flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition md:h-10 md:w-10"
            htmlFor="multiple"
          >
            <input
              {...register("sex")}
              className="peer hidden"
              type="radio"
              id="multiple"
              value="multiple"
            />
            <svg
              width={20}
              height={20}
              className="fill-orange peer-checked:fill-white md:h-6 md:w-6"
            >
              <use href={sprite + "#icon-multiple"}></use>
            </svg>
          </label>
        </div>
        <div className="bg-brown-light mx-auto mt-0 mb-4 flex h-17 w-17 items-center justify-center overflow-hidden rounded-full md:mb-3 md:h-21.5 md:w-21.5">
          {urlInputValue ? (
            <img src={urlInputValue ? urlInputValue : null} alt="Pet Avatar" />
          ) : (
            <svg width={34} height={34} className="fill-orange md:h-11 md:w-11">
              <use href={sprite + "#icon-footprint"}></use>
            </svg>
          )}
        </div>

        <div className="mb-[31px] flex flex-col gap-2.5 md:mb-11.5 md:gap-4.5 xl:mb-10">
          <div className="flex items-center justify-between gap-[5px] md:gap-2">
            <label htmlFor="imgURL">
              <input
                {...register("imgURL")}
                className={
                  urlInputValue
                    ? "border-orange h-9 w-[170px] overflow-hidden rounded-[30px] border py-2.5 pr-5 pl-2.5 text-xs leading-4 font-medium tracking-[-0.24px] text-ellipsis whitespace-nowrap outline-0 md:h-10.5 md:w-69.5 md:py-3 md:pl-3 md:text-sm md:leading-4.5 md:tracking-[-0.02em]"
                    : "h-9 w-[170px] overflow-hidden rounded-[30px] border border-black/15 py-2.5 pr-5 pl-2.5 text-xs leading-4 font-medium tracking-[-0.24px] text-ellipsis whitespace-nowrap outline-0 md:h-10.5 md:w-69.5 md:py-3 md:pl-3 md:text-sm md:leading-4.5 md:tracking-[-0.02em]"
                }
                type="url"
                id="imgURL"
                placeholder="Enter URL"
                value={urlInputValue}
                onChange={handleChangeUrlInputValue}
              />
              {errors.imgURL && (
                <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                  {errors.imgURL?.message}
                </p>
              )}
            </label>
            <label
              htmlFor="uploadBtn"
              className="bg-brown-light focus:bg-brown-light-secondary hover:bg-brown-light-secondary flex h-9 w-[117px] cursor-pointer items-center justify-center gap-[5px] rounded-[30px] border-0 p-2.5 text-xs leading-4 font-medium tracking-[-0.24px] text-black outline-0 transition md:h-10.5 md:w-36.5 md:gap-2 md:px-4 md:py-3 md:text-sm md:leading-4.5 md:tracking-[-0.02em]"
            >
              <input
                className="hidden"
                id="uploadBtn"
                type="file"
                accept="image/*"
                onChange={handleUploadPetAvatar}
              />
              Upload photo
              <svg
                width={16}
                height={16}
                className="fill-orange md:h-4.5 md:w-4.5"
              >
                <use href={sprite + "#icon-upload-cloud"}></use>
              </svg>
            </label>
          </div>
          <label htmlFor="title">
            <input
              {...register("title")}
              className={
                titleInputValue
                  ? "border-orange h-10.5 w-full rounded-[30px] border p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                  : "h-10.5 w-full rounded-[30px] border border-black/15 p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
              }
              type="text"
              id="title"
              placeholder="Title"
              value={titleInputValue}
              onChange={handleChangeTitleInputValue}
            />
            {errors.title && (
              <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                {errors.title?.message}
              </p>
            )}
          </label>
          <label htmlFor="name">
            <input
              {...register("name")}
              className={
                nameInputValue
                  ? "border-orange h-10.5 w-full rounded-[30px] border p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                  : "h-10.5 w-full rounded-[30px] border border-black/15 p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
              }
              type="text"
              id="name"
              placeholder="Pet’s Name"
              value={nameInputValue}
              onChange={handleChangeNameInputValue}
            />
            {errors.name && (
              <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                {errors.name?.message}
              </p>
            )}
          </label>
          <div className="flex items-center justify-between gap-2 md:gap-3">
            <label className="relative inline-block" htmlFor="birthday">
              <input
                {...register("birthday")}
                className={
                  birthdayInputValue
                    ? "border-orange h-10.5 w-36 rounded-[30px] border p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:w-52.5 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                    : "h-10.5 w-36 rounded-[30px] border border-black/15 p-3 text-sm leading-4.5 font-medium tracking-[-0.42px] outline-0 md:h-13 md:w-52.5 md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em]"
                }
                type="text"
                id="birthday"
                placeholder="0000-00-00"
                value={birthdayInputValue}
                onChange={handleChangeBirthdayInputValue}
              />
              <svg
                width={18}
                height={18}
                className="absolute top-3 right-3 fill-black md:top-4 md:right-4 md:h-5 md:w-5"
              >
                <use href={sprite + "#icon-calendar"}></use>
              </svg>
              {errors.birthday && (
                <p className="text-red mt-1 pl-3 text-xs leading-3.5 tracking-[-0.36px]">
                  {errors.birthday?.message}
                </p>
              )}
            </label>
            <Controller
              name="species"
              control={control}
              defaultValue={selectedType}
              render={({ field }) => (
                <Select
                  {...field}
                  components={{ DropdownIndicator: DropdownIndicatorChevron }}
                  className="w-[143px] md:w-52.5"
                  classNames={{
                    control: () => controlStyles,
                    singleValue: () => singleValueStyles,
                    menu: () => menuStyles,
                    menuList: () => menuListStyles,
                    placeholder: () => placeholderStyles,
                    option: ({ isFocused, isSelected }) =>
                      clsx(
                        isFocused && optionStyles.focus,
                        isSelected && optionStyles.selected,
                        optionStyles.base
                      ),
                  }}
                  placeholder="Type of pet"
                  onChange={(option) => {
                    setSelectedType(option);
                    field.onChange(option.value);
                  }}
                  options={species.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  value={species.find((item) => item === selectedType)}
                  unstyled
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Link
            className="block h-10.5 w-25 cursor-pointer rounded-[30px] border-0 bg-black/5 px-8.5 py-3 text-sm leading-4.5 font-bold tracking-[-0.42px] text-black outline-0 transition hover:bg-black/10 focus:bg-black/10 md:h-12 md:w-42.5 md:px-[67px] md:py-3.5 md:text-base md:leading-5"
            to="/profile"
          >
            Back
          </Link>
          <button
            className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary block h-10.5 w-25 cursor-pointer rounded-[30px] border-0 px-6.5 py-3 text-sm leading-4.5 font-bold tracking-[-0.42px] text-white outline-0 transition md:h-12 md:w-42.5 md:px-14.5 md:py-3.5 md:text-base md:leading-5"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddPetForm;
