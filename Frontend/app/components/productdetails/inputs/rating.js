import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useStore } from "../../../zustand/store";
import axios from "axios";
import { useState, useEffect } from "react";
import { submitRating, getCustomer } from "../../../lib/woocommerce";

export default function BasicRating({ productdetail }) {
  const { user, setuser, accountemail } = useStore((state) => state);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = sessionStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, []);

  const data = {
    product_id: productdetail.id,
    review: "review",
    reviewer: user.first_name,
    reviewer_email: user.email,
    rating: rating,
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        marginTop: "-20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button onClick={() => submitRating(data)}>send review</button>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />

      <Typography style={{ marginTop: "55px" }}>
        Rating <br></br> {productdetail.average_rating}{" "}
        <i class="bi bi-star"></i>
      </Typography>
    </Box>
  );
}
