"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import { getCustomer } from "@/app/lib/woocommerce";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Signin = () => {
  const { accountemail, setaccountemail, setuser } = useStore((state) => state);

  const handleSubmit = () => {
    getCustomer(accountemail, setuser);
    sessionStorage.setItem("accountemail", accountemail);
  };

  return (
    <main className={styles.main}>
      <div className={styles.names}>
        <h2>Create account to shop!</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={accountemail}
          onChange={(e) => setaccountemail(e.target.value)}
          required
        />
        <button onClick={() => handleSubmit()} type="submit">
          Sign in
        </button>

        <Link href="/">
          <button>Let's Shop</button>
        </Link>

        <ToastContainer />
      </div>
    </main>
  );
};

export default Signin;
