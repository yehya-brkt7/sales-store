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
  getVariation,
  updateVariation,
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
    setproductcolor,
    selectedsize,
    setSelectedsize,
    variationid,
    setvariationid,
    setproductid,
  } = useStore((state) => state);

  const [loading, setLoading] = useState(false); // Add loading state

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

    setproductcolor("blue");
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

  useEffect(() => {
    productvariations.map((variation) =>
      variation.attributes[0].option == productcolor
        ? setvariationid(variation.id)
        : ""
    );
  }, [productcolor]);

  const [stockquantity, setStockquantity] = useState();
  useEffect(() => {
    const fetchvariation = async () => {
      try {
        const response = await getVariation(productdetail.id, variationid);

        setStockquantity(response?.data?.stock_quantity);
      } catch (error) {}
    };

    fetchvariation();
  }, [variationid]);

  useEffect(() => {
    setproductid(productdetail.id);
  }, [productdetail.id]);

  const { addItem } = useCart();

  //product size select
  const handleCart = async () => {
    if (selectedsize === "select size") {
      toast.warning("Please select a size");
      return;
    }

    if (loading) return; // Disable button if loading
    setLoading(true); // Set loading state

    addItem(cartproduct);
    toast.success(
      `${cartproduct.name} added to cart with size: ${selectedsize} and color: ${productcolor}`
    );

    try {
      // Fetch the current stock quantity
      const response = await getVariation(productdetail.id, variationid);
      const currentStockQuantity = response?.data?.stock_quantity;

      if (currentStockQuantity > 0) {
        // Decrease the stock quantity by 1
        const updatedStockQuantity = currentStockQuantity - 1;

        // Update the stock quantity using the WooCommerce REST API
        const data = {
          stock_quantity: updatedStockQuantity,
        };

        const res = await updateVariation(productdetail.id, variationid, data);
        setStockquantity(res.data.stock_quantity);
      }
    } catch (error) {
      console.log("Error updating stock quantity:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
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
          <h5>quantity:{stockquantity}</h5>

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
                disabled={
                  user.email == ""
                    ? true
                    : false || loading || stockquantity == 0
                }
                className={
                  user.email == "" || loading || stockquantity == 0
                    ? styles.disabledbutton
                    : styles.button
                }
                onClick={() => handleCart()}
                title={user.email == "" ? "please login to add to cart" : ""}
              >
                <i class="bi bi-cart3"></i>add to cart
              </button>
            </div>

            <div className={styles.reviews}>
              <BasicRating
                productdetail={productdetail}
                style={
                  !customerItem || user.email == "" ? styles.disabledbutton : ""
                }
                customerItem={customerItem}
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
