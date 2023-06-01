"use client";

import styles from "./signup.module.css";
import { useStore } from "../../zustand/store";
import { createCustomer } from "@/app/lib/woocommerce";
import { useEffect, useState } from "react";
import Signin from "./signin";
import Link from "next/link";

import { signIn, useSession, signOut } from "next-auth/react";

const Signup = () => {
  const {
    accountfirstname,
    accountlastname,
    accountemail,
    setaccountimage,
    accountimage,
  } = useStore((state) => state);

  const session = useSession();

  const [userEmail, setUserEmail] = useState("");

  //set user email and image
  useEffect(() => {
    if (
      session &&
      session.data &&
      session.data.user &&
      session.data.user.email
    ) {
      setUserEmail(session.data.user.email);
      setaccountimage(session.data.user.image);
    }
  }, [session]);

  //navigate to sign in if user is authenticated with google
  useEffect(() => {
    if (session.status == "authenticated") {
      setIscustomer(true);
    } else {
      setIscustomer(false);
    }
  }, [session]);

  //set user email and image to local storage
  useEffect(() => {
    localStorage.setItem("accountemail", userEmail);
    localStorage.setItem("accountimage", accountimage);
  }, [userEmail, accountimage]);

  const [iscustomer, setIscustomer] = useState(false);

  return (
    <main className={styles.main}>
      {!iscustomer && (
        <div className={styles.names}>
          <h2>Create account to shop!</h2>
          sign in with google
          <button
            type="button"
            style={{ marginTop: "-10px" }}
            onClick={() => signIn("google")}
          >
            <i class="bi bi-google"></i>
          </button>
          <Link href="/signup">
            <button onClick={() => signOut()}>Sign out</button>
          </Link>
        </div>
      )}
      {iscustomer && (
        <Signin
          setIscustomer={setIscustomer}
          userEmail={userEmail}
          session={session}
        />
      )}
    </main>
  );
};

export default Signup;
