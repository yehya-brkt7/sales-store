"use client";

import styles from "./shipping.module.css";
import { useStore } from "../../zustand/store";
import { getCustomer, updateCustomer } from "@/app/lib/woocommerce";
import { useState, useEffect } from "react";
import Link from "next/link";
import SimpleMap from "./maps";

const Shipping = () => {
  const {
    accountemail,
    setuser,
    user,
    city,
    setcity,
    street,
    setstreet,
    home,
    sethome,
  } = useStore((state) => state);

  useEffect(() => {
    const storedEmail = localStorage.getItem("accountemail");
    getCustomer(accountemail == "" ? storedEmail : accountemail, setuser);

    console.log("user", user);
  }, [user.city, user.address_1, user.address_2]);

  useEffect(() => {
    if (user) {
      setcity(user.shipping.city || "");
      setstreet(user.shipping.address_1 || "");
      sethome(user.shipping.address_2 || "");
    }
  }, [user]);

  const data = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    shipping: {
      city: city,
      address_1: street,
      address_2: home,
    },
  };

  const handleSubmit = async () => {
    updateCustomer(user.id, data);
  };

  return (
    <main className={styles.main}>
      <div className={styles.names}>
        <h2>Fill your shipping details!</h2>

        <section className={styles.container}>
          <div className={styles.firstcolumn}>
            <div className={styles.inputcontainer}>
              City
              <input
                type="text"
                placeholder="City"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputcontainer}>
              Street
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={street}
                onChange={(e) => setstreet(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputcontainer}>
              Home
              <input
                type="email"
                placeholder="Home"
                name="home"
                value={home}
                onChange={(e) => sethome(e.target.value)}
                required
              />
            </div>
            <p style={{ textAlign: "center", width: "400px" }}>
              {" "}
              You can use google maps to locate (optional) (turned off for now)
            </p>
          </div>

          <SimpleMap />
        </section>
        <Link href="/checkout">
          <button
            style={{ marginTop: "-10px" }}
            onClick={() => handleSubmit()}
            type="submit"
          >
            Checkout
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Shipping;
