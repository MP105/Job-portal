import React from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Noida", "Hyderabad", "Pune"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Java Developer",
      "Mernstack Developer",
      "Mern"
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0-40000",
      "40000-100000",
      "100000-500000",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  const { searchedQuery } = useSelector(
    (store) => store.job
  );

  const changeHandler = (value) => {
    dispatch(setSearchedQuery(value));
  };

  return (
    <div className="w-full bg-white rounded-xl border shadow-sm p-5">

      <h1 className="text-2xl font-bold">
        Filter Jobs
      </h1>

      <hr className="my-4" />

      <RadioGroup
        value={searchedQuery}
        onValueChange={changeHandler}
      >
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">

            <h2 className="font-semibold text-lg mb-3">
              {data.filterType}
            </h2>

            {data.array.map((item, idx) => {
              const id = `${index}-${idx}`;

              return (
                <div
                  key={id}
                  className="flex items-center gap-3 mb-3"
                >
                  <RadioGroupItem
                    id={id}
                    value={item}
                  />

                  <Label
                    htmlFor={id}
                    className="cursor-pointer"
                  >
                    {item}
                  </Label>

                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>

      {searchedQuery && (
        <div className="mt-5 rounded-lg bg-violet-100 p-3">

          <p className="font-medium text-violet-700">
            Selected : {searchedQuery}
          </p>

        </div>
      )}

    </div>
  );
};

export default FilterCard;