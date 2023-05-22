"use client";

import styles from "./profile.module.css";
import { getCustomer } from "@/app/lib/woocommerce";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function Profile() {
  const { user, accountemail, setuser } = useStore((state) => state);

  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = sessionStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
  }, []);

  return (
    <div>
      <div className={styles.background}></div>

      <div className={styles["outer-div"]}>
        <div className={styles["inner-div"]}>
          <div className={styles.front}>
            <div className={styles["front__bkg-photo"]}></div>
            <div className={styles["front__face-photo"]}></div>
            <div className={styles["front__text"]}>
              <h3 className={styles["front__text-header"]}>
                {user.first_name === ""
                  ? "Sign up / in to show profile"
                  : user.first_name}
              </h3>
              <p className={styles["front__text-para"]}>
                <i
                  className={`fas fa-map-marker-alt ${styles["front-icons"]}`}
                ></i>
                {user.last_name}
              </p>
              <h3 className={styles["front__text-header"]}>{user.email}</h3>

              <span className={styles["front__text-hover"]}>
                Hover to view other details
              </span>
            </div>
          </div>
          <div className={styles.back}>
            <div className={styles["social-media-wrapper"]}>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-codepen" aria-hidden="true"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-github-square" aria-hidden="true"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-linkedin-square" aria-hidden="true"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
