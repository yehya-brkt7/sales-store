"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "@/app/lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const Signin = ({ setIscustomer, userEmail, session }) => {
  const { setuser, user } = useStore((state) => state);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCustomer(userEmail, setuser);
      } catch (error) {}
    };

    fetchData();
  }, [userEmail]);

  const data = {
    email: userEmail,
    first_name: fname,
    last_name: lname,
    billing: {
      phone: phone,
    },
  };

  //login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCustomer(user.id, data);

      toast.success("user updated!");
    } catch (error) {
      localStorage.setItem("accountemail", userEmail);
      console.log("err", error.message);
    }

    return false;
  };

  // create Account or login user
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await createCustomer(data, setuser);

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
        <h6 style={{ textAlign: "center" }}>
          you can update account info if you already have an account
        </h6>
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
          <input
            type="phone"
            placeholder="phone number"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button style={{ width: "270px" }} type="submit">
            Create/Update Your Account
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
