"use client";

import styles from "./filters.module.css";
import Colordropdownbutton from "./filterinputs/colordropdown";
import Typedropdownbutton from "./filterinputs/typedropdown";
import Sizedropdownbutton from "./filterinputs/sizedropdown";
import { useStore } from "../../../zustand/store";
import RangeSlider from "./filterinputs/pricerange";

const Filters = (props) => {
  const { selectedcolor, selectedsize, selectedtype } = useStore(
    (state) => state
  );
  return (
    <main className={styles.main}>
      <div className={styles.dropdowngroups}>
        <div className={styles.dropdowns}>
          <Colordropdownbutton filtername="color" />
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selectedcolor == "all" ? "black" : selectedcolor,
              width: "100%",
              height: "20px",
              marginTop: "10px",
              cursor: "pointer",
              color: "white",
            }}
          >
            {" "}
            {selectedcolor == "all" ? "all" : ""}
          </span>
        </div>
        <div className={styles.dropdowns}>
          <Sizedropdownbutton filtername="size" />
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              color: "white",
              width: "100%",
              height: "20px",
              marginTop: "10px",
            }}
          >
            {selectedsize}
          </span>
        </div>
        <div className={styles.dropdowns}>
          <Typedropdownbutton filtername="type" />
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              color: "white",
              width: "100%",
              height: "20px",
              marginTop: "10px",
            }}
          >
            {selectedtype}
          </span>
        </div>
      </div>
      <RangeSlider />
    </main>
  );
};

export default Filters;
