"use client";

import styles from "./shipping.module.css";
import { useStore } from "../../zustand/store";
import { getCustomer, updateCustomer } from "@/app/lib/woocommerce";
import { useEffect } from "react";
import Link from "next/link";
import SimpleMap from "./maps";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  //restore email from local storage
  useEffect(() => {
    const storedEmail = localStorage.getItem("accountemail");
    getCustomer(accountemail == "" ? storedEmail : accountemail, setuser);
  }, [user.city, user.address_1, user.address_2]);

  //automatically fill user data
  useEffect(() => {
    if (user) {
      setcity(user.shipping.city || "");
      setstreet(user.shipping.address_1 || "");
      sethome(user.shipping.address_2 || "");
    }
  }, [user]);

  //pass data to update user shipping options
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city != "" && home != "" && street != "") {
      const response = await updateCustomer(user.id, data);
      router.push("/checkout");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.names}>
        <h2>Fill your shipping details!</h2>

        <section className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.firstcolumn}>
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
                type="text"
                placeholder="Home"
                name="home"
                value={home}
                onChange={(e) => sethome(e.target.value)}
                required
              />
            </div>
            <p style={{ textAlign: "center", width: "300px" }}>
              {" "}
              You can use google maps to locate (optional) (turned off for now)
            </p>
            <button style={{ marginTop: "-10px" }} type="submit">
              Checkout
            </button>
          </form>

          <SimpleMap />
        </section>
        <Link href="/checkout"></Link>
      </div>
    </main>
  );
};

export default Shipping;
