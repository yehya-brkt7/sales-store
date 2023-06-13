"use client";

import styles from "./checkout.module.css";
import { useCart } from "react-use-cart";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import { getCustomer, createOrder } from "@/app/lib/woocommerce";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
  const { totalItems, items, cartTotal, emptyCart } = useCart();

  const { user, setuser, accountemail, orderdelete, setorderdelete } = useStore(
    (state) => state
  );

  //restore email from local storage to stay logged in
  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = localStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
  }, [accountemail]);

  //empty cart if order is made
  useEffect(() => {
    if (orderdelete == true) {
      emptyCart();
      setorderdelete(false);
    }
  }, [orderdelete]);

  const [paymentmethod, setPaymentmethod] = useState("");
  const [paymentmethodTitle, setPaymentmethodtitle] = useState("");

  const handleSelect = (e) => {
    setPaymentmethod(e.target.value);

    setPaymentmethodtitle(
      e.target.options[e.target.selectedIndex].getAttribute("name")
    );
  };

  //pass itemList to checkout data
  const [itemlist, setItemlist] = useState([]);
  useEffect(() => {
    const lineItems = items.map((item) => {
      return {
        product_id: parseInt(item.id.split("-")[0]),

        quantity: item.quantity,

        meta_data: [
          {
            key: "Color",
            value: item.color,
          },
          {
            key: "Size",
            value: item.size,
          },
        ],
      };
    });

    setItemlist(lineItems);
  }, [items]);

  const googleMapsLink = "https://www.google.com/maps/place/40.7128,-74.0060";
  //pass data to createOrder
  const data = {
    payment_method: paymentmethod,
    payment_method_title: paymentmethodTitle,
    set_paid: true,
    billing: {
      first_name: user.first_name,
      last_name: user.last_name,
      address_1: user.shipping.address_1 || "",
      address_2: user.shipping.address_2 || "",
      city: user.shipping.city,
      email: user.email,
      phone: user?.billing?.phone,
    },
    line_items: itemlist,
    status: "processing",
    meta_data: [
      {
        key: "google_maps_link",
        value: googleMapsLink,
      },
    ],
  };

  //createOrder
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create the order in WooCommerce
      const res = await createOrder(data);
      setorderdelete(true);
      toast.success("order created");
    } catch (error) {
      toast.error("failed to make order");
    }
  };

  useEffect(() => {
    console.log("pmt", paymentmethodTitle);
  }, [paymentmethodTitle]);

  return (
    <div className={styles.mainscreen}>
      <div className={styles.card}>
        <div className={styles.leftside}>
          {items.map((item) => (
            <div className={styles.itemcontainer}>
              <h6 className={styles.itemname}>({item.quantity})</h6>
              <h6 className={styles.itemname}>{item.name}</h6>
              <h6
                style={{
                  width: "30px",
                  height: "20px",
                  backgroundColor: item.color,
                  marginTop: "20px",
                }}
              ></h6>
            </div>
          ))}
        </div>
        <div className={styles.rightside}>
          <form action="" onSubmit={handleFormSubmit}>
            <h1>CheckOut</h1>
            <h2>Payment Information</h2>

            <p>Payment Method</p>
            <select
              onChange={handleSelect}
              value={paymentmethod}
              className={styles.inputbox}
              name="card_type"
              id="card_type"
              required
            >
              <option value="">Select method</option>
              <option name="Credit Card" value="credit-card">
                Credit Card
              </option>
              <option name="Bank Transfer" value="bacs">
                Bank transfer
              </option>
              <option name="Cash on Delivery (COD)" value="cod">
                {" "}
                Cash on delivery
              </option>
              <option name="PayPal" value="paypal">
                {" "}
                Paypal
              </option>
            </select>

            <div>
              <p>total items: {totalItems}</p>
              <p>total cost: ${cartTotal} + shipping cost:$10</p>
            </div>
            <p></p>
            <button type="submit" className={styles.button}>
              Confirm Purchase
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Checkout;
