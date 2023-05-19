"use client";

import BreadcrumbExample from "./routes/breadcrumbs";
import Gallery from "./imagegallery/gallery";
import styles from "./product.module.css";
import BasicRating from "./inputs/rating";
// import Typography from "@mui/material/Typography";
import { useStore } from "../../zustand/store";
import Sizedropdown from "./inputs/sizedropdown";
import { useState, useEffect } from "react";

const Productdetail = ({ productdetail }) => {
  const { productvariations, fetchvariations } = useStore((state) => state);

  useEffect(() => {
    fetchvariations(productdetail.id);
  }, []);

  const [price, setPrice] = useState("");

  useEffect(() => {
    if (productvariations && productvariations.length > 0) {
      const price = productvariations[0].regularPrice;
      setPrice(price);
    }
  }, [productvariations]);

  return (
    <main className={styles.main}>
      <section className={styles.firstcolumn}>
        <div className={styles.breadcrumbs}>
          <BreadcrumbExample productdetail={productdetail} />
        </div>
        <div className={styles.imagegallery}>
          <Gallery productdetail={productdetail} />
        </div>
      </section>
      <section className={styles.secondcolumn}>
        <h1 className={styles.title}>{productdetail.name}</h1>
        <p className={styles.description}>{productdetail.description}</p>

        <section className={styles.infocontainer}>
          <div className={styles.firstinfocolumn}>
            <div className={styles.sizedropdown}>
              <Sizedropdown productdetail={productdetail} />
            </div>
            <div className={styles.price}>
              <del>{price}$</del>
              <span>{productdetail.price}$</span>
              <div>-33.3%</div>
            </div>
          </div>
          <div className={styles.reviews}>
            <BasicRating productdetail={productdetail} />
          </div>
        </section>

        <button>
          <i class="bi bi-cart3"></i>add to cart
        </button>
      </section>
    </main>
  );
};

export default Productdetail;
