"use client";

import BreadcrumbExample from "./routes/breadcrumbs";
import Gallery from "./imagegallery/gallery";
import styles from "./product.module.css";
import BasicRating from "./inputs/rating";
// import Typography from "@mui/material/Typography";
import { useStore } from "../../zustand/store";
import Sizedropdown from "./inputs/sizedropdown";
import { useState, useEffect } from "react";
import RelatedProducts from "./relatedproducts/relatedproducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider, useCart } from "react-use-cart";
import { getCustomer } from "@/app/lib/woocommerce";

const Productdetail = ({ productdetail }) => {
  const {
    productvariations,
    fetchvariations,
    accountemail,
    setuser,
    user,
    setcartproduct,
    cartproduct,
    productcolor,
    selectedsize,
    setSelectedsize,
  } = useStore((state) => state);

  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = sessionStorage.getItem("accountemail");

      const fetchData = async () => {
        try {
          await getCustomer(storedEmail, setuser);
        } catch (error) {}
      };

      fetchData();
    }
    toast("make sure you're logged in to shop!");

    setSelectedsize("select size");
  }, []);

  useEffect(() => {
    fetchvariations(productdetail.id);

    let imageSrc = "";

    if (productcolor === "blue") {
      const blueImage = productdetail.images.find(
        (image) => image.alt === "blue-side"
      );
      if (blueImage && blueImage.src) {
        imageSrc = blueImage.src;
      }
    } else if (productcolor === "red") {
      const redImage = productdetail.images.find(
        (image) => image.alt === "red-side"
      );
      if (redImage && redImage.src) {
        imageSrc = redImage.src;
      }
    } else {
      const greenImage = productdetail.images.find(
        (image) => image.alt === "green-side"
      );
      if (greenImage && greenImage.src) {
        imageSrc = greenImage.src;
      }
    }
    const productID = `${productdetail.id}-${productcolor}`;

    setcartproduct({
      id: productID,
      name: productdetail.name,
      price: parseFloat(productdetail.price),
      color: productcolor,
      size: selectedsize,
      image: imageSrc,
    });
  }, [productcolor, selectedsize]);

  const [price, setPrice] = useState("");

  useEffect(() => {
    if (productvariations && productvariations.length > 0) {
      const price = productvariations[0].regularPrice;
      setPrice(price);
    }
  }, [productvariations]);

  const { addItem } = useCart();

  const handleCart = () => {
    selectedsize === "select size"
      ? toast.warning("Please select a size")
      : (addItem(cartproduct),
        toast(
          `${cartproduct.name} added to cart with size: ${selectedsize} and color: ${productcolor}`
        ));
  };

  return (
    <CartProvider>
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
                <div>
                  -{Math.floor(100 - (productdetail.price * 100) / price)}%
                </div>
              </div>

              <button
                disabled={user.email === "" ? true : false}
                className={user.email == "" ? styles.disabledbutton : ""}
                onClick={() => handleCart()}
              >
                <i class="bi bi-cart3"></i>add to cart
              </button>
            </div>

            <div
              className={`${styles.reviews} ${
                user.email == "" ? styles.disabledbutton : ""
              }`}
            >
              <BasicRating productdetail={productdetail} />
            </div>
          </section>
        </section>
        <ToastContainer />
        {/* <RelatedProducts id={productdetail.id} /> */}
      </main>
    </CartProvider>
  );
};

export default Productdetail;
