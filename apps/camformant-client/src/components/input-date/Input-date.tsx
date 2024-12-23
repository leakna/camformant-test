import React from "react";

interface inputdate {
  placeHolder?: string;
  date: string;
  focusedField?: string;
  setOpen: (value: boolean) => void;
}
const InputDateField: React.FC<inputdate> = ({
  placeHolder = "Year",
  setOpen,
  date,
  focusedField,
}) => {
  return (
    <div className="w-full container relative pt-10">
      <h1
        className={`w-full outline-none rounded-2xl ${date ? "p-5" : "p-8"} shadow-md shadow-black-300 pl-7`}
        onClick={() => {
          setOpen(true);
        }}
      >
        {date}
      </h1>
      <label
        className={`transition-all text-gray-400 absolute ${date || focusedField === "date" ? "top-7" : "top-16"} left-10`}
      >
        {placeHolder}
      </label>
      <span></span>
    </div>
  );
};

export default InputDateField;
