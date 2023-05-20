import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

function Sizedropdown({ productdetail }) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeSelect = (size) => {
    setSelectedSize(size); // Update selectedSize when a dropdown item is selected
  };
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={`Size: (${selectedSize})`}
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
