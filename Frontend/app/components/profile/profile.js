"use client";

import styles from "./profile.module.css";
import { getCustomer, getOrders } from "@/app/lib/woocommerce";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";
import AccordionDetails from "./accordion";

async function Profile() {
  const { user, accountemail, setuser, accountimage, setaccountimage } =
    useStore((state) => state);

  //restore email from local storage
  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = localStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
    setaccountimage(localStorage.getItem("accountimage"));
  }, [accountemail]);

  const [customerOrder, setCustomerOrders] = useState([]);
  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        const res = await getOrders();

        const orders = res.filter((order) => order.billing.email == user.email);

        setCustomerOrders(orders);
      } catch (error) {
        console.log(error.message);
      }
    };

    getOrderHistory();
  }, [user]);

  const [customerLineItems, setCustomerLineItems] = useState([]);
  useEffect(() => {
    const getAllLineItems = () => {
      const lineItems = customerOrder.flatMap((order) => order.line_items);
      const uniqueItems = [];

      // Iterate through the line items and check for duplicates based on item name
      lineItems.forEach((item) => {
        const existingItem = uniqueItems.find(
          (uniqueItem) => uniqueItem.name === item.name
        );
        if (!existingItem) {
          uniqueItems.push(item);
        }
      });

      setCustomerLineItems(uniqueItems);
    };

    getAllLineItems();
  }, [customerOrder]);

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
                {typeof user == "undefined" || user.first_name == ""
                  ? "go to -> create account -> create/update customer info to view info"
                  : user.first_name + " "}
                {user.last_name}
              </h3>
              <h4 className={`${styles.title}`}>
                {typeof user == "undefined" ? "" : user.email}
              </h4>
            </div>
            <div className={styles.test}>
              <AccordionDetails customerLineItems={customerLineItems} />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3"></div>
      </div>
    </div>
  );
}

export default Profile;
