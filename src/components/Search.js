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
        <div className=" flex flex-wrap items-center justify-center gap-5 p-2 md:justify-start">
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
            aria-label="Search"
              onClick={() => {
                handleClick();
              }}
              className="flex items-center justify-center space-x-2 rounded-lg bg-purple-700 p-2 text-lg text-white transition hover:bg-purple-800 "
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
