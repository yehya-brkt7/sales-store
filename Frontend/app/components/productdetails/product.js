"use client";

import BreadcrumbExample from "./routes/breadcrumbs";
import Gallery from "./imagegallery/gallery";
import styles from "./product.module.css";
import BasicRating from "./inputs/rating";
// import Typography from "@mui/material/Typography";
import { useStore } from "../../zustand/store";
import Sizedropdown from "./inputs/sizedropdown";
import { useState, useEffect, useLayoutEffect } from "react";
import RelatedProducts from "./relatedproducts/relatedproducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider, useCart } from "react-use-cart";
import {
  getCustomer,
  getCustomerOrderHistory,
  getOrders,
} from "@/app/lib/woocommerce";
import AccordionDetails from "./inputs/accordion";

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

  //restore email from local storage to keep user logged in
  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = localStorage.getItem("accountemail");

      const fetchData = async () => {
        try {
          await getCustomer(storedEmail, setuser);
        } catch (error) {}
      };

      fetchData();
    }
  }, [accountemail]);

  useEffect(() => {
    setSelectedsize("select size");

    fetchvariations(productdetail.id);
  }, []);

  const [customerOrder, setCustomerOrders] = useState([]);
  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const res = await getOrders();

        const orders = res.filter((order) => order.billing.email == user.email);

        setCustomerOrders(orders);
      } catch (error) {
        console.log(error.message);
      }
    };

    getOrderHistory();
  }, [user]);

  const [customerItem, setCustomerItem] = useState(false);
  useEffect(() => {
    const checkIfCustomerHasItem = () => {
      for (const order of customerOrder) {
        for (const lineItem of order.line_items) {
          // Check if the line item matches the desired item
          if (lineItem.product_id === productdetail.id) {
            setCustomerItem(true);
            return; // Exit the loop if the item is found
          }
        }
      }
      setCustomerItem(false); // Item not found in the customer's order history
    };

    checkIfCustomerHasItem();
  }, [customerOrder, productdetail.id]);

  useLayoutEffect(() => {
    window.scroll({
      top: 0,

      behavior: "instant", // or 'instant' for immediate scroll
    });
  }, []);

  //set all images
  useEffect(() => {
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

  //fetch prices
  useEffect(() => {
    if (productvariations && productvariations.length > 0) {
      const price = productvariations[0].regularPrice;
      setPrice(price);
    }
  }, [productvariations]);

  const { addItem } = useCart();

  //product size select
  const handleCart = () => {
    selectedsize === "select size"
      ? toast.warning("Please select a size")
      : (addItem(cartproduct),
        toast.success(
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
                className={
                  user.email == "" ? styles.disabledbutton : styles.button
                }
                onClick={() => handleCart()}
              >
                <i class="bi bi-cart3"></i>add to cart
              </button>
            </div>

            <div className={styles.reviews}>
              <BasicRating
                productdetail={productdetail}
                style={!customerItem ? styles.disabledbutton : ""}
              />
            </div>
          </section>
          <AccordionDetails
            details={productdetail.description}
            className={styles.accordion}
          />
        </section>

        <ToastContainer position="bottom-right" />
        <RelatedProducts id={productdetail.id} />
      </main>
    </CartProvider>
  );
};

export default Productdetail;
