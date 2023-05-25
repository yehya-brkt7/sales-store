"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import { getCustomer } from "@/app/lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Signin = ({ isCustomer, setIscustomer }) => {
  const { accountemail, setaccountemail, setuser } = useStore((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getCustomer(accountemail, setuser);

      if (Array.isArray(res.data) && res.data.length === 0) {
        toast.error("email doesn't exist");
      } else {
        toast.success("successfull login!");
      }
    } catch (error) {
      toast.error(error.message);
    }
    sessionStorage.setItem("accountemail", accountemail);

    return false;
  };

  return (
    <main className={styles.main}>
      <div className={styles.names}>
        <h2>Create account to shop!</h2>
        <form onSubmit={handleSubmit} className={styles.names}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={accountemail}
            onChange={(e) => setaccountemail(e.target.value)}
            required
          />
          <button type="submit">Sign in</button>
        </form>

        <div className={styles.buttons}>
          <Link href="/shipping">
            <button>Checkout</button>
          </Link>
          <Link href="/">
            <button>Let's shop</button>
          </Link>

          <button onClick={() => setIscustomer(false)}>Creat Account</button>
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </main>
  );
};

export default Signin;
