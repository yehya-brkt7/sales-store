"use client";

import styles from "./adminpanel.module.css";
import Statusdropdown from "./dropdown";
import { useEffect, useState } from "react";
import { getOrders, updateOrder, deleteOrder } from "../../lib/woocommerce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../../zustand/store";
import { Telex } from "next/font/google";

const Adminpanel = () => {
  const { accountimage, setaccountimage } = useStore((state) => state);

  const [orders, setOrders] = useState([]);

  //restore account image
  useEffect(() => {
    setaccountimage(localStorage.getItem("accountimage"));
  }, []);

  //get all orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderlist = await getOrders();
        setOrders(orderlist);
      } catch (error) {
        // Handle the error here
        toast.error("failed to load orders");
      }
    };

    fetchData();
  }, [orders]);

  //update order
  const updateOrderDetails = async (orderId, data) => {
    try {
      await updateOrder(orderId, data);
    } catch (error) {
      // Handle the error here
      toast.error(error.message);
    }
  };

  //delete order
  const handleDelete = async (id) => {
    await deleteOrder(id);
    toast.success("order deleted!");
  };

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row w-100">
          <div className="col-lg-12 col-md-12 col-12">
            <h3 className="display-5 mb-2 text-center">Orders</h3>
            <p className="mb-5 text-center">
              <i className="text-info font-weight-bold">total</i> orders{" "}
              {orders && orders.length}
            </p>
            <table
              id="shoppingCart"
              className="table table-condensed table-responsive"
            >
              <thead>
                <tr>
                  <th style={{ width: "60%" }}>Customer details</th>
                  <th style={{ width: "12%" }}>Price</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "16%" }}></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.length != 0 &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td data-th="Product">
                        <div className="row">
                          <div className="col-md-3 text-left">
                            <img
                              src={accountimage}
                              alt=""
                              className="img-fluid d-none d-md-block rounded mb-2 shadow"
                            />
                          </div>
                          <div className="col-md-9 text-left mt-sm-2">
                            <h4>name and number</h4>
                            <p className="font-weight-light">
                              {order.billing.first_name + " "}
                              {order.billing.last_name} / {"  "}
                              <a
                                href={`tel:${order.billing.phone}`}
                                style={{
                                  color: "#0d6efd",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                target="_blank"
                              >
                                {order.billing.phone}
                              </a>
                            </p>

                            <h4>location</h4>
                            <p className="font-weight-light">
                              {order.billing.city}, {order.billing.address_1},{" "}
                              {order.billing.address_2}
                            </p>

                            <a
                              style={{ cursor: "pointer" }}
                              href={order && order.meta_data[0].value}
                              target="_blank"
                            >
                              view location
                            </a>
                          </div>
                        </div>
                      </td>
                      <td data-th="Price">${order.total}</td>

                      <td data-th="Quantity">
                        <div className="quantity-input text-center">
                          <Statusdropdown
                            order={order}
                            updateOrderDetails={updateOrderDetails}
                            id={order.id}
                          />
                        </div>
                      </td>
                      <td className="actions" data-th="">
                        <div className="text-center">
                          <button
                            id={styles.btn}
                            className="btn btn-white border-secondary bg-white btn-md mb-2"
                            onClick={() => handleDelete(order.id)}
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {/* Repeat the above 'tr' block for each product */}
              </tbody>
            </table>
            <div className="float-right text-right">
              <h4>Number of orders</h4>
              <h1>{orders && orders.length}</h1>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </section>
  );
};

export default Adminpanel;
