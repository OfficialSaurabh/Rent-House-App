import React, { useState, useContext, useEffect } from "react";
// import icons
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";

// import headless ui components
import { Menu } from "@headlessui/react";
import axios from "axios";
// import context

const LocalityDropdown = ({ locality, setlocality }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localities, setLocalities] = useState([]);

  useEffect(() => {
    axios.get("/api/localities").then(res => {
      // get unique localities
      const uniqueLocalities = [
        ...new Set(res.data.map(home => home.locality)),
      ];
      setLocalities(uniqueLocalities);
    });
  }, []);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <CiLocationOn className="dropdown-icon-primary" />
        <div>
          <div className="py-1 text-sm font-medium text-gray-500 ">
            {" "}
            Locality
          </div>
          <div className="sm:text-md text-sm font-medium leading-tight">
            {" "}
            {locality}{" "}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
          ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu text-start ">
        <Menu.Item as="li" className="menu-item">
          <button
            onClick={() => {
              setlocality("All Locality");
              setIsOpen(false);
            }}
            className="menu-item-btn "
          >
            All Locality
          </button>
        </Menu.Item>
        {localities.map(locality => (
          <Menu.Item as="li" className="menu-item" key={locality}>
            <button
              onClick={() => {
                setlocality(locality);
                setIsOpen(false);
              }}
              className="menu-item-btn "
            >
              {locality}
            </button>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default LocalityDropdown;
