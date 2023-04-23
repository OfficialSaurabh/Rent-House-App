// import components
import PriceRangeDropdown from "./PriceRangeDropdown";
import BedsDropDown from "./BedsDropDown";

// import icon
import { RiSearch2Line } from "react-icons/ri";
import LocalityDropdown from "./LocalityDropdown";

const Search = () => {
  const handleClick = () => {
    console.log("clicked");
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
            <BedsDropDown />
          </div>
          <div className=" ">
            <PriceRangeDropdown />
          </div>
          <div className=" ">
            <LocalityDropdown />
          </div>
          <div className=" ">
            <button
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
