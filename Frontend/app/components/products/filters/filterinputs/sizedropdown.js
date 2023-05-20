import Dropdown from "react-bootstrap/Dropdown";
import styles from "../filters.module.css";
import { useStore } from "../../../../zustand/store";
import { useState } from "react";

const Sizedropdownbutton = (props) => {
  const { ukshoesizes, shirtsizes, setSelectedsize } = useStore((state) => ({
    ukshoesizes: state.ukshoesizes,
    shirtsizes: state.shirtsizes,
    setSelectedsize: state.setSelectedsize,
  }));

  const { filtername } = props;

  const handleSelect = (eventKey) => {
    setSelectedsize(eventKey);
  };

  const [showItems1, setShowItems1] = useState(false);
  const [showItems2, setShowItems2] = useState(false);
  const handleToggle1 = () => {
    setShowItems1(!showItems1);
  };
  const handleToggle2 = () => {
    setShowItems2(!showItems2);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="dark"
        id="dropdown-basic"
        className={styles.dropdown}
      >
        {filtername}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header style={{ cursor: "pointer" }} onClick={handleToggle1}>
          Shirt sizes ⬇️
        </Dropdown.Header>

        {showItems1 &&
          Array.isArray(shirtsizes) &&
          shirtsizes.map((size) => {
            return (
              <Dropdown.Item
                key={size.id}
                eventKey={size.value}
                href="#/action-1"
              >
                {size.value}
              </Dropdown.Item>
            );
          })}
        <Dropdown.Header style={{ cursor: "pointer" }} onClick={handleToggle2}>
          uk Shoe sizes ⬇️
        </Dropdown.Header>
        {showItems2 &&
          Array.isArray(ukshoesizes) &&
          ukshoesizes.map((size) => {
            return (
              <Dropdown.Item
                key={size.id}
                eventKey={size.value}
                href="#/action-1"
              >
                {size.value}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sizedropdownbutton;
