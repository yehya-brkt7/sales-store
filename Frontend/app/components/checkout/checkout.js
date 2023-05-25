"use client";

import styles from "./checkout.module.css";
import { CartProvider, useCart } from "react-use-cart";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import { getCustomer, createOrder } from "@/app/lib/woocommerce";

const Checkout = () => {
  const { totalUniqueItems, items, cartTotal } = useCart();

  const { user, setuser, accountemail } = useStore((state) => state);

  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = sessionStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
  }, []);

  const [paymentmethod, setPaymentmethod] = useState("");
  const [paymentmethodTitle, setPaymentmethodtitle] = useState("");

  const handleSelect = (e) => {
    setPaymentmethod(e.target.value);
    setPaymentmethodtitle(e.target.name);
  };

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
    },
    line_items: items,
  };

  return (
    <div className={styles.mainscreen}>
      <div className={styles.card}>
        <div className={styles.leftside}>
          <img
            src="https://i.pinimg.com/originals/18/9d/dc/189ddc1221d9c1c779dda4ad37a35fa1.png"
            className={styles.product}
            alt="Shoes"
          />
        </div>
        <div className={styles.rightside}>
          <form action="">
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
            </select>

            <div>
              <p>total unique items: {totalUniqueItems}</p>
              <p>total cost: ${cartTotal} + shipping cost:$10</p>
            </div>
            <p></p>
            <button type="submit" className={styles.button}>
              Confirm Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
