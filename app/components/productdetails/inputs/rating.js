import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useStore } from "../../../zustand/store";
import axios from "axios";
import { useState } from "react";
import { submitRating } from "../../../lib/woocommerce";

export default function BasicRating({ productdetail }) {
  const [rating, setRating] = useState(0);

  const data = {
    // product_name: productname,
    review: "Nice album!",
    reviewer: "John Doe",
    reviewer_email: "john.doe@example.com",
    rating: rating,
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        marginTop: "-20px",
      }}
    >
      <Typography component="legend">Rate</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <button onClick={() => submitRating()}>send review</button>

      <Typography>
        Rating <br></br> {productdetail.average_rating}{" "}
        <i class="bi bi-star"></i>
      </Typography>
    </Box>
  );
}
