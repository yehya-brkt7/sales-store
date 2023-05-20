import Dropdown from "react-bootstrap/Dropdown";
import styles from "../filters.module.css";
import { useStore } from "../../../../zustand/store";

const Typedropdownbutton = (props) => {
  const { types, setSelectedtype } = useStore((state) => ({
    types: state.types,

    setSelectedtype: state.setSelectedtype,
  }));

  const { filtername } = props;

  const handleSelect = (eventKey) => {
    setSelectedtype(eventKey);
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
        {Array.isArray(types) &&
          types.map((type) => {
            return (
              <Dropdown.Item
                key={type.id}
                eventKey={type.value}
                href="#/action-1"
              >
                {type.value}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Typedropdownbutton;
