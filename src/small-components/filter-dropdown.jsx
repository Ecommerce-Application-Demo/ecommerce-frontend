// small-components/filter-dropdown.js
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ name, title, items, isOpen, handleDropdownClick, handleItemClick, selectedItems, renderItems }) => (
  <div className="filter-dropdown-wrapper">
    <div className="filter-dropdown-collaps" onClick={() => handleDropdownClick(name)}>
      <span>{title}</span>
      <span className={`filterDropdownArrow${isOpen ? '--open' : ''}`}>
        <FaChevronDown />
      </span>
    </div>
    {isOpen && (
      <ul className="filter-dropdown-expand">
        {renderItems
          ? renderItems(items)
          : items.map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type={name === "discountPercentages" ? "radio" : "checkbox"}
                    name={name}
                    value={item}
                    checked={selectedItems[name].includes(item)}
                    onChange={() => handleItemClick(name, item)}
                  />
                  {item}
                </label>
              </li>
            ))}
      </ul>
    )}
  </div>
);

export default Dropdown;
