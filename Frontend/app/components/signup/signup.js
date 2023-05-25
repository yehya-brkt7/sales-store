"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import { createCustomer } from "@/app/lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Signin from "./signin";
import Link from "next/link";

const Signup = () => {
  const {
    accountfirstname,
    accountlastname,
    accountemail,
    setaccountfirstname,
    setaccountlastname,
    setaccountemail,
    setuser,
  } = useStore((state) => state);

  const data = {
    email: accountemail,
    first_name: accountfirstname,
    last_name: accountlastname,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createCustomer(data, setuser);

      console.log(res);
      if (res.status == 201) {
        toast.success("User Created");
      } else if (res.status == 400) {
        toast.error("Email already exists");
      }
    } catch (error) {
      toast.error("Email already exists");
    }
    sessionStorage.setItem("accountemail", accountemail);

    return false;
  };

  const [iscustomer, setIscustomer] = useState(false);

  return (
    <main className={styles.main}>
      {!iscustomer && (
        <div className={styles.names}>
          <h2>Create account to shop!</h2>
          <form onSubmit={handleSubmit} className={styles.names}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={accountfirstname}
              onChange={(e) => setaccountfirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={accountlastname}
              onChange={(e) => setaccountlastname(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={accountemail}
              onChange={(e) => setaccountemail(e.target.value)}
              required
            />
            <button style={{ marginTop: "-10px" }} type="submit">
              Sign Up
            </button>
          </form>
          <span style={{ textAlign: "center", marginTop: "-10px" }}>
            or sign in if you already have an account
          </span>

          <div className={styles.buttons}>
            <button onClick={() => setIscustomer(true)}> Sign in</button>
            <Link href="/shipping">
              <button>Checkout</button>
            </Link>
            <Link href="/">
              <button>Let's shop</button>
            </Link>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      )}
      {iscustomer && (
        <Signin iscustomer={iscustomer} setIscustomer={setIscustomer} />
      )}
    </main>
  );
};

export default Signup;
