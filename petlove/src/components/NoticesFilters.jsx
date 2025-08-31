import { useEffect, useState } from "react";
import sprite from "../assets/sprite.svg";
import SearchField from "./SearchField.jsx";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectGenders,
  selectSpecies,
} from "../redux/notices/selectors.js";
import { useForm, Controller, set } from "react-hook-form";
import { changeFilters } from "../redux/filters/slice.js";
import { selectCities } from "../redux/cities/selectors.js";
import clsx from "clsx";

const NoticesFilters = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectByPopularity, setSelectByPopularity] = useState(null);
  const [selectByPrice, setSelectByPrice] = useState(null);
  const categories = useSelector(selectCategories);
  const genders = useSelector(selectGenders);
  const species = useSelector(selectSpecies);
  const cities = useSelector(selectCities);

  const controlStyles =
    "hover:cursor-pointer rounded-[30px] bg-white h-10.5 p-3 md:h-12 md:p-3.5";
  const singleValueStyles =
    "capitalize md:text-base md:leading-5 md:tracking-[-0.03em]";
  const menuStyles =
    "px-3 pt-2 pb-2 mt-1 bg-white rounded-[15px] md:px-4 md:pt-2.5 md:pb-2.5";
  const menuListStyles = "overflow-y-auto";
  const placeholderStyles =
    "text-black md:text-base md:leading-5 md:tracking-[-0.03em]";
  const optionStyles = {
    base: "capitalize text-black/60 py-1 tracking-[-0.03em] md:text-base md:leading-5",
    focus: "text-orange",
    selected: "text-orange",
  };

  const DropdownIndicatorChevron = (props) => {
    const { menuIsOpen } = props.selectProps;

    return (
      <components.DropdownIndicator {...props}>
        {menuIsOpen ? (
          <svg width={18} height={18} className="rotate-180 fill-black">
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
        ) : (
          <svg width={18} height={18} className="fill-black">
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
        )}
      </components.DropdownIndicator>
    );
  };

  const DropdownIndicatorSearch = (props) => (
    <components.DropdownIndicator {...props}>
      <svg width={18} height={18} className="fill-black">
        <use href={sprite + "#icon-search"}></use>
      </svg>
    </components.DropdownIndicator>
  );

  const ClearIcon = (props) => (
    <components.ClearIndicator {...props}>
      <svg width={18} height={18} className="fill-black">
        <use href={sprite + "#icon-close"}></use>
      </svg>
    </components.ClearIndicator>
  );

  const IndicatorsContainerStyles = (props) => {
    const { children } = props;
    return (
      <components.IndicatorsContainer {...props}>
        <div className="flex items-center gap-[1.5px]">{children}</div>
      </components.IndicatorsContainer>
    );
  };

  const { register, control, watch, reset } = useForm({
    defaultValues: {
      keyword: keyword,
      category: selectedCategory,
      sex: selectedGender,
      species: selectedType,
      locationId: selectedLocation,
      byPopularity: selectByPopularity,
      byPrice: selectByPrice,
    },
  });

  const watchFields = watch();

  useEffect(() => {
    dispatch(
      changeFilters({
        ...watchFields,
        keyword: keyword,
        category: selectedCategory,
        sex: selectedGender,
        species: selectedType,
        locationId: selectedLocation,
        byPopularity: selectByPopularity,
        byPrice: selectByPrice,
      })
    );
  }, [
    dispatch,
    keyword,
    selectedCategory,
    selectedGender,
    selectedType,
    selectedLocation,
    selectByPopularity,
    selectByPrice,
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearQuery = () => {
    setInputValue("");
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const resetFilters = () => {
    setInputValue("");
    setKeyword("");
    setSelectedCategory(null);
    setSelectedGender(null);
    setSelectedType(null);
    setSelectedLocation(null);
    setSelectByPopularity(null);
    setSelectByPrice(null);
    reset();
  };

  return (
    <form className="bg-brown-light mb-10 w-[335px] rounded-[30px] p-5 md:w-176 md:px-8 md:py-10 xl:w-304 xl:p-10">
      <div className="mb-5 flex flex-col gap-3 border-b-[1px] border-black/10 pb-5 md:flex-row md:flex-wrap md:gap-4">
        <SearchField
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleClearQuery={handleClearQuery}
          onBlur={handleBlur}
        />
        <div className="flex gap-2 md:gap-4">
          <Controller
            name="category"
            control={control}
            defaultValue={selectedCategory}
            render={({ field }) => (
              <Select
                {...field}
                components={{ DropdownIndicator: DropdownIndicatorChevron }}
                className="w-[143px] md:w-42.5 xl:w-50"
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
                placeholder="Category"
                onChange={(option) => {
                  setSelectedCategory(option.value);
                  field.onChange(option);
                }}
                options={[
                  { label: "Show all", value: "" },
                  ...categories.map((category) => ({
                    label: category,
                    value: category,
                  })),
                ]}
                unstyled
              />
            )}
          />
          <Controller
            name="sex"
            control={control}
            defaultValue={selectedGender}
            render={({ field }) => (
              <Select
                {...field}
                components={{ DropdownIndicator: DropdownIndicatorChevron }}
                className="w-36 md:w-42.5 xl:w-47.5"
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
                placeholder="By gender"
                onChange={(option) => {
                  setSelectedGender(option.value);
                  field.onChange(option);
                }}
                options={[
                  { label: "Show all", value: "" },
                  ...genders.map((gender) => ({
                    label: gender,
                    value: gender,
                  })),
                ]}
                unstyled
              />
            )}
          />
        </div>
        <Controller
          name="species"
          control={control}
          defaultValue={selectedType}
          render={({ field }) => (
            <Select
              {...field}
              components={{ DropdownIndicator: DropdownIndicatorChevron }}
              className="w-full md:w-47.5"
              classNames={{
                control: () => controlStyles,
                singleValue: () => singleValueStyles,
                menu: () => menuStyles,
                menuList: () => "h-51.5 overflow-y-auto",
                placeholder: () => placeholderStyles,
                option: ({ isFocused, isSelected }) =>
                  clsx(
                    isFocused && optionStyles.focus,
                    isSelected && optionStyles.selected,
                    optionStyles.base
                  ),
              }}
              placeholder="By type"
              onChange={(option) => {
                setSelectedType(option.value);
                field.onChange(option);
              }}
              options={[
                { label: "Show all", value: "" },
                ...species.map((specie) => ({
                  label: specie,
                  value: specie,
                })),
              ]}
              unstyled
            />
          )}
        />
        <Controller
          name="locationId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              components={{
                DropdownIndicator: DropdownIndicatorSearch,
                ClearIndicator: ClearIcon,
                IndicatorsContainer: IndicatorsContainerStyles,
              }}
              isClearable
              className="w-full md:w-[227px]"
              classNames={{
                control: ({ isFocused }) =>
                  clsx(
                    controlStyles,
                    isFocused && "ring-1 ring-orange border-orange"
                  ),
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
              placeholder="Location"
              defaultValue={selectedLocation}
              onChange={(option) => {
                if (!option) {
                  setSelectedLocation(null);
                  field.onChange("");
                } else {
                  setSelectedLocation(option.value);
                  field.onChange(option);
                }
              }}
              options={cities.map((city) => ({
                label: `${city.stateEn}, ${city.cityEn}`,
                value: city._id,
              }))}
              unstyled
            />
          )}
        />
      </div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2.5 md:gap-2">
        <label
          className="has-checked:bg-orange flex h-10.5 cursor-pointer items-center gap-1.5 rounded-[30px] bg-white p-3 tracking-[-0.03em] has-checked:text-white md:h-12 md:gap-2 md:p-3.5 md:text-base md:leading-5"
          htmlFor="popular"
        >
          Popular
          <input
            {...register("byPopularity")}
            className="peer hidden"
            type="radio"
            name="sorting"
            id="popular"
            value="false"
            onChange={(e) => {
              setSelectByPopularity(e.target.value);
            }}
          />
          <button
            className="hidden peer-checked:block"
            type="button"
            onClick={resetFilters}
          >
            <svg className="fill-white" width={18} height={18}>
              <use href={sprite + "#icon-close"}></use>
            </svg>
          </button>
        </label>

        <label
          className="has-checked:bg-orange flex h-10.5 cursor-pointer items-center gap-1.5 rounded-[30px] bg-white p-3 tracking-[-0.03em] has-checked:text-white md:h-12 md:gap-2 md:p-3.5 md:text-base md:leading-5"
          htmlFor="unpopular"
        >
          Unpopular
          <input
            {...register("byPopularity")}
            className="peer hidden"
            type="radio"
            name="sorting"
            id="unpopular"
            value="true"
            onChange={(e) => {
              setSelectByPopularity(e.target.value);
            }}
          />
          <button
            className="hidden peer-checked:block"
            type="button"
            onClick={resetFilters}
          >
            <svg className="fill-white" width={18} height={18}>
              <use href={sprite + "#icon-close"}></use>
            </svg>
          </button>
        </label>

        <label
          className="has-checked:bg-orange flex h-10.5 cursor-pointer items-center gap-1.5 rounded-[30px] bg-white p-3 tracking-[-0.03em] has-checked:text-white md:h-12 md:gap-2 md:p-3.5 md:text-base md:leading-5"
          htmlFor="cheap"
        >
          Cheap
          <input
            {...register("byPrice")}
            className="peer hidden"
            type="radio"
            name="sorting"
            id="cheap"
            value="false"
            onChange={(e) => {
              setSelectByPrice(e.target.value);
            }}
          />
          <button
            className="hidden peer-checked:block"
            type="button"
            onClick={resetFilters}
          >
            <svg className="fill-white" width={18} height={18}>
              <use href={sprite + "#icon-close"}></use>
            </svg>
          </button>
        </label>

        <label
          className="has-checked:bg-orange flex h-10.5 cursor-pointer items-center gap-1.5 rounded-[30px] bg-white p-3 tracking-[-0.03em] has-checked:text-white md:h-12 md:gap-2 md:p-3.5 md:text-base md:leading-5"
          htmlFor="expensive"
        >
          Expensive
          <input
            {...register("byPrice")}
            className="peer hidden"
            type="radio"
            name="sorting"
            id="expensive"
            value="true"
            onChange={(e) => {
              setSelectByPrice(e.target.value);
            }}
          />
          <button
            className="hidden peer-checked:block"
            type="button"
            onClick={resetFilters}
          >
            <svg className="fill-white" width={18} height={18}>
              <use href={sprite + "#icon-close"}></use>
            </svg>
          </button>
        </label>
        {(inputValue ||
          selectedCategory ||
          selectedGender ||
          selectedType ||
          selectedLocation ||
          selectByPopularity ||
          selectByPrice) && (
          <button
            className="flex h-10.5 cursor-pointer items-center gap-1.5 rounded-[30px] bg-white p-3 tracking-[-0.03em] text-black md:h-12 md:gap-2 md:p-3.5 md:text-base md:leading-5"
            type="button"
            onClick={resetFilters}
          >
            Reset
            <svg className="fill-black" width={18} height={18}>
              <use href={sprite + "#icon-close"}></use>
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};
export default NoticesFilters;
