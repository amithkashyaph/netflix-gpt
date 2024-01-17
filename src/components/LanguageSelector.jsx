import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../utils/store/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  const handleLanguageChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    showGPTSearch && (
      <div className="px-5 py-3 bg-black/80 rounded-lg ">
        {/* <label for="languages" className="text-white">
          Choose a language :{"   "}
        </label> */}
        <select
          id="languages"
          onChange={handleLanguageChange}
          className="rounded-md p-1 text-sm"
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <option key={language.id} value={language.id}>
              {language.value}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default LanguageSelector;
