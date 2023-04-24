import React, { useState } from "react";

import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { Menu } from "@headlessui/react";
// import context


const PriceRangeDropdown = ({price, setPrice}) => {

  const [isOpen, setIsOpen] = useState(false);
  const prices = [
    {
      value: "All Range",
    },
    {
      value: "10000 - 13000",
    },
    {
      value: "13000 - 16000",
    },
    {
      value: "16000 - 19000",
    },
    {
      value: "19000 - 22000",
    },
    {
      value: "20000 - 30000",
    },
    {
      value: "30000 - 40000",
    },
  ];

  return (
    <Menu as="div" className="dropdown relative ">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full"
      >
        <RiWallet3Line className="dropdown-icon-primary" />
        <div>
          <div className="py-1 text-left text-sm font-medium text-gray-500 ">
            Price
          </div>
          <div className="sm:text-md text-sm font-medium leading-tight">
            {price}
          </div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {prices.map((price, index) => {
          return (
            <Menu.Item
              as="li"
              onClick={() => setPrice(price.value)}
              key={index}
              className="menu-item"
            >
              {price.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
