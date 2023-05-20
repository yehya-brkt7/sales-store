"use client";

import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Categories from "./filterinputs/buttongroup";
import styles from "./categoryslider.module.css";

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className={styles.slider}
      id="products"
    >
      <Carousel.Item className={index == 0 ? styles.items : ""}>
        <Categories
          className="d-block w-100"
          category1="Basketball Shoes"
          category2="Football Shoes"
          category3="Normal Shoes"
          category4="All"
        />
      </Carousel.Item>
      <Carousel.Item className={index == 1 ? styles.items : ""}>
        <Categories
          className="d-block w-100"
          category1="Polo Shirt"
          category2="T-Shirts"
          category3="Dress shirt"
          category4="All"
        />
      </Carousel.Item>
      <Carousel.Item className={index == 2 ? styles.items : ""}>
        <Categories
          className="d-block w-100"
          category1="Jeans"
          category2="SweatPants"
          category3="Joggers"
          category4="All"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
