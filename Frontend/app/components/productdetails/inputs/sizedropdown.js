import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { useStore } from "../../../zustand/store";

function Sizedropdown({ productdetail }) {
  const { selectedsize, setSelectedsize } = useStore((state) => state);

  const handleSizeSelect = (size) => {
    setSelectedsize(size); // Update selectedSize when a dropdown item is selected
  };
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={`Size: (${selectedsize})`}
    >
      {productdetail.attributes[0].options
        .filter((size) => size != "all")
        .map((size) => (
          <Dropdown.Item
            onClick={() => handleSizeSelect(size)}
            href="#/action-1"
          >
            {size}
          </Dropdown.Item>
        ))}
    </DropdownButton>
  );
}

export default Sizedropdown;
