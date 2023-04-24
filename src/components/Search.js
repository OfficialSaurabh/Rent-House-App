// import components
import PriceRangeDropdown from "./PriceRangeDropdown";
import BedsDropDown from "./BedsDropDown";

// import icon
import { RiSearch2Line } from "react-icons/ri";
import LocalityDropdown from "./LocalityDropdown";
import { useState } from "react";

const Search = ({ setFilter }) => {
  const [bedroom, setBedroom] = useState("All Types");
  const [price, setPrice] = useState("All Range");
  const [locality, setlocality] = useState("All Locality");

  const handleClick = () => {
    let min = 0;
    let max = 1000000000;
    if (price && price !== "All Range") {
      [min, max] = price.split(" - ");
    }
    setFilter({
      beds: +bedroom,
      lowerprice: +min,
      upperprice: +max,
      locality: locality,
    });
  };
  return (
    <div className=" bg-gray-100">
      <div className=" ">
        <p className="py-7 text-xl font-bold text-gray-700">
          {" "}
          Filter houses to rent
        </p>
        <div className=" flex justify-center md:justify-start gap-5 items-center flex-wrap p-2">
          <div className="">
            <BedsDropDown bedroom={bedroom} setBedroom={setBedroom} />
          </div>
          <div className=" ">
            <PriceRangeDropdown price={price} setPrice={setPrice} />
          </div>
          <div className=" ">
            <LocalityDropdown locality={locality} setlocality={setlocality} />
          </div>
          <div className=" ">
            <button
              onClick={() => {
                handleClick();
              }}
              className="flex p-2 space-x-2 items-center justify-center rounded-lg bg-purple-700 text-lg text-white transition hover:bg-purple-800 "
            >
              <p className="">Search</p>
              <RiSearch2Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
