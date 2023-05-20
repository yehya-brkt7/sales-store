"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useStore } from "../../../../zustand/store";

const marks = [
  {
    value: 0,
    label: "0$",
  },

  {
    value: 1000,
    label: "1000$",
  },
];

export default function RangeSlider() {
  const { setPriceRange } = useStore((state) => state);

  const [value, setValue] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPriceRange(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        color="secondary"
        marks={marks}
        min={0}
        max={1000}
        step={1}
      />
    </Box>
  );
}
