"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import { getCustomer, createCustomer } from "@/app/lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const Signin = ({ setIscustomer, userEmail, session }) => {
  const { accountemail, setuser } = useStore((state) => state);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getCustomer(userEmail, setuser);

      if (Array.isArray(res.data) && res.data.length === 0) {
        toast.error("email doesn't exist");
      } else {
        toast.success("successfull login!");
      }
    } catch (error) {
      toast.error(error.message);
    }
    localStorage.setItem("accountemail", userEmail);

    return false;
  };

  const data = {
    email: userEmail,
    first_name: fname,
    last_name: lname,
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createCustomer(data, setuser);

      console.log(res);
      if (res.status == 201) {
        toast.success("User Created");
      } else if (res.status == 400) {
        handleSubmit(e);
      }
    } catch (error) {
      handleSubmit(e);
    }
    localStorage.setItem("accountemail", userEmail);

    return false;
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      setIscustomer(true);
    } else {
      setIscustomer(false);
    }
  }, [session]);

  return (
    <main className={styles.main}>
      <div className={styles.names}>
        <h2>Create account to shop!</h2>
        <form onSubmit={handleCreate} className={styles.names}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userEmail}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <button style={{ width: "270px" }} type="submit">
            Create/Retrieve Customer Account
          </button>
        </form>

        <div className={styles.buttons}>
          <Link href="/">
            <button>Let's Shop</button>
          </Link>
          <Link href="/signup">
            <button onClick={() => signOut()}>Sign out</button>
          </Link>
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </main>
  );
};

export default Signin;
