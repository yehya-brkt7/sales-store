"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import { createCustomer } from "@/app/lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Signin from "./signin";

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

  const handleSubmit = async () => {
    createCustomer(data, setuser);
    sessionStorage.setItem("accountemail", accountemail);
  };

  const [iscustomer, setIscustomer] = useState(false);

  return (
    <main className={styles.main}>
      {!iscustomer && (
        <div className={styles.names}>
          <h2>Create account to shop!</h2>
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
          <button onClick={() => handleSubmit()} type="submit">
            Sign Up
          </button>
          <span style={{ textAlign: "center" }}>
            or sign in if you already have an account
          </span>
          <button onClick={() => setIscustomer(true)}> Sign in</button>
          <ToastContainer />
        </div>
      )}
      {iscustomer && <Signin />}
    </main>
  );
};

export default Signup;
