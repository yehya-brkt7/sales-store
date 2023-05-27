"use client";

import styles from "./profile.module.css";
import { getCustomer } from "@/app/lib/woocommerce";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultpic from "../../../public/avatarpic.png";

async function Profile() {
  const { user, accountemail, setuser, accountimage } = useStore(
    (state) => state
  );

  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = sessionStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3"></div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3"></div>
        <div className={`col-12 col-sm-6 col-md-4 col-lg-3 ${styles.ourTeam}`}>
          <div className={`${styles.ourTeam}`}>
            <div className={`${styles.picture}`}>
              <img className={`${styles.imgFluid}`} src={accountimage} alt="" />
            </div>
            <div className={`${styles.teamContent}`}>
              <h3 className={`${styles.name}`}>
                {typeof user == "undefined"
                  ? "go to -> create account -> create customer info to view info"
                  : user.first_name}{" "}
              </h3>
              <h4 className={`${styles.title}`}>
                {typeof user == "undefined" ? "" : user.email}
              </h4>
            </div>
            <ul className={`${styles.social}`}>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-facebook"
                  aria-hidden="true"
                ></a>
              </li>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-twitter"
                  aria-hidden="true"
                ></a>
              </li>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-google-plus"
                  aria-hidden="true"
                ></a>
              </li>
              <li>
                <a
                  href="https://codepen.io/collection/XdWJOQ/"
                  className="fa fa-linkedin"
                  aria-hidden="true"
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
