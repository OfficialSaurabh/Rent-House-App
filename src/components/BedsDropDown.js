import React, { useState, useContext } from "react";
// import icons
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";

// import headless ui components
import { Menu } from "@headlessui/react";
// import context


const BedsDropDown = ({ bedroom, setBedroom }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as="div" className="dropdown relative  ">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <BiBed className="dropdown-icon-primary" />
        <div>
          <div className="py-1 text-sm font-medium text-gray-500 ">
            {" "}
            Bedrooms
          </div>
          <div className="sm:text-md text-sm font-medium leading-tight">
            {" "}
            {bedroom}{" "}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu text-center ">
      <Menu.Item as="li" className="menu-item">
          <button
          aria-label="All Types"
            onClick={() => {
              setBedroom("All Types");
              setIsOpen(false);
            }}
            className="menu-item-btn"
          >
            All Types
          </button>
        </Menu.Item>
        <Menu.Item as="li" className="menu-item">
          <button
          aria-label="1"
            onClick={() => {
              setBedroom("1");
              setIsOpen(false);
            }}
            className="menu-item-btn"
          >
            1
          </button>
        </Menu.Item>
        <Menu.Item as="li" className="menu-item">
          <button
          aria-label="2"
            onClick={() => {
              setBedroom("2");
              setIsOpen(false);
            }}
            className="menu-item-btn"
          >
            2
          </button>
        </Menu.Item>
        <Menu.Item as="li" className="menu-item">
          <button
          aria-label="3"
            onClick={() => {
              setBedroom("3");
              setIsOpen(false);
            }}
            className="menu-item-btn"
          >
            3
          </button>
        </Menu.Item>
        <Menu.Item as="li" className="menu-item">
          <button
          aria-label="4"
            onClick={() => {
              setBedroom("4");
              setIsOpen(false);
            }}
            className="menu-item-btn"
          >
            4
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default BedsDropDown;
