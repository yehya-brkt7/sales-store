import Dropdown from "react-bootstrap/Dropdown";
import styles from "../filters.module.css";
import { useStore } from "../../../../zustand/store";

const Colordropdownbutton = (props) => {
  const { colors, setSelectedcolor } = useStore((state) => ({
    colors: state.colors,

    setSelectedcolor: state.setSelectedcolor,
  }));

  const { filtername } = props;

  const handleSelect = (eventKey) => {
    setSelectedcolor(eventKey);
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
        {Array.isArray(colors) &&
          colors.map((color) => {
            return (
              <Dropdown.Item
                key={color.id}
                eventKey={color.value}
                href="#/action-1"
              >
                {color.value}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Colordropdownbutton;
