"use client";

import styles from "./shipping.module.css";
import { useStore } from "../../zustand/store";
import { getCustomer, updateCustomer } from "@/app/lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    // toast("make sure you're logged in first");

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
          <section className={styles.inputs}>
            <div className={styles.firstcolumn}>
              <div className={styles.inputcontainer}>
                <label>
                  City:
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className={styles.inputcontainer}>
                <label>
                  {" "}
                  Street:
                  <input
                    type="text"
                    placeholder="Street"
                    name="street"
                    value={street}
                    onChange={(e) => setstreet(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className={styles.inputcontainer}>
                <label>
                  Home:
                  <input
                    type="email"
                    placeholder="Home"
                    name="home"
                    value={home}
                    onChange={(e) => sethome(e.target.value)}
                    required
                  />
                </label>
              </div>
              <p style={{ textAlign: "end", width: "400px" }}>
                {" "}
                You can use google maps to locate (optional) (turned off for
                now)
              </p>
            </div>
          </section>

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
        <ToastContainer />
      </div>
    </main>
  );
};

export default Shipping;
