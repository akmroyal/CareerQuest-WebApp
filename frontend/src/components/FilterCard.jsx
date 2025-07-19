import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { MapPin, Briefcase } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    icon: MapPin,
    arrays: [
      "delhi-ncr",
      "gurugram",
      "noida",
      "bengaluru",
      "hyderabad",
      "pune",
      "mumbai",
    ], // Values must match the location field in jobs data
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    arrays: [
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Product Manager",
      "Data Scientist",
      "Software Engineer",
      "Software Development Engineer",
      "Full Stack Developer",
      "AI/ML Engineer",
      "Accountant",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6A38C2] to-[#7d52d1] p-4">
        <h1 className="font-bold text-lg text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Filter Jobs
        </h1>
      </div>

      {/* Filter Content */}
      <div className="p-4">
        <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
          {filterData.map((data, index) => (
            <div key={index} className="space-y-3">
              {/* Section Header */}
              <div className="flex items-center gap-2 text-[#6A38C2]">
                <data.icon className="w-4 h-4" />
                <h2 className="font-semibold text-base">{data.filterType}</h2>
              </div>

              {/* Options */}
              <div className="ml-6 space-y-2">
                {data.arrays.map((item, idx) => {
                  const itemId = `r${index}-${idx}`;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 group cursor-pointer hover:bg-purple-50 rounded-lg p-2 transition-colors"
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="text-[#6A38C2] border-gray-300"
                      />
                      <Label
                        htmlFor={itemId}
                        className="text-sm text-gray-600 group-hover:text-[#6A38C2] transition-colors cursor-pointer"
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              {index < filterData.length - 1 && <div className="border-t border-gray-100 mt-4"></div>}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
