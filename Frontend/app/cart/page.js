"use client";
import Link from "next/link";
import { CartProvider, useCart } from "react-use-cart";
import { useStore } from "../zustand/store";
import { getVariation, updateVariation } from "../lib/woocommerce";
import { useState, useEffect } from "react";
import styles from "./cart.module.css";

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  const { variationid, productid, setvariationid, productvariations } =
    useStore((state) => state);

  const [loading, setLoading] = useState(false); // Add loading state

  const [numberofitems, setNumberofitems] = useState(3);

  const increasequantity = async (item) => {
    if (loading) return; // Disable button if loading
    setLoading(true); // Set loading state
    updateItemQuantity(item.id, item.quantity + 1);

    try {
      const varid = productvariations.filter(
        (variation) =>
          variation.attributes[1].option == item.color &&
          variation.attributes[0].option == item.size
      )[0].id;

      // Fetch the current stock quantity
      const response = await getVariation(productid, varid);

      const currentStockQuantity = response?.data?.stock_quantity;

      setNumberofitems(currentStockQuantity);

      if (currentStockQuantity > 0) {
        // Decrease the stock quantity by 1
        const updatedStockQuantity = currentStockQuantity - 1;

        // Update the stock quantity using the WooCommerce REST API
        const data = {
          stock_quantity: updatedStockQuantity,
        };

        const res = await updateVariation(productid, varid, data);
      }
    } catch (error) {
      console.log("Error updating stock quantity:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const decreasequantity = async (item) => {
    if (loading) return; // Disable button if loading
    setLoading(true); // Set loading state
    updateItemQuantity(item.id, item.quantity - 1);

    try {
      // Fetch the current stock quantity
      const varid = productvariations.filter(
        (variation) =>
          variation.attributes[1].option == item.color &&
          variation.attributes[0].option == item.size
      )[0].id;

      const response = await getVariation(productid, varid);

      const currentStockQuantity = response?.data?.stock_quantity;
      setNumberofitems(currentStockQuantity);

      if (currentStockQuantity > 0) {
        // Decrease the stock quantity by 1
        const updatedStockQuantity = currentStockQuantity + 1;

        // Update the stock quantity using the WooCommerce REST API
        const data = {
          stock_quantity: updatedStockQuantity,
        };

        const res = await updateVariation(productid, varid, data);
      }
    } catch (error) {
      console.log("Error updating stock quantity:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const removeproduct = async (item) => {
    if (loading) return; // Disable button if loading
    setLoading(true); // Set loading state
    removeItem(item.id);
    try {
      const varid = productvariations.filter(
        (variation) =>
          variation.attributes[1].option == item.color &&
          variation.attributes[0].option == item.size
      )[0].id;

      // Fetch the current stock quantity
      const response = await getVariation(productid, varid);
      const currentStockQuantity = response?.data?.stock_quantity;

      if (currentStockQuantity >= 0) {
        // Decrease the stock quantity by 1
        const updatedStockQuantity = currentStockQuantity + item.quantity;

        // Update the stock quantity using the WooCommerce REST API
        const data = {
          stock_quantity: updatedStockQuantity,
        };

        const res = await updateVariation(productid, varid, data);
      }
    } catch (error) {
      console.log("Error updating stock quantity:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    console.log("n", numberofitems);
  }, [numberofitems]);

  return (
    <CartProvider>
      {isEmpty ? (
        <p
          style={{ textAlign: "center", marginTop: "100px", fontSize: "20px" }}
        >
          Cart is Empty
        </p>
      ) : (
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="row w-100">
              <div className="col-lg-12 col-md-12 col-12">
                <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                <p className="mb-5 text-center">
                  <i className="text-info font-weight-bold">
                    {totalUniqueItems}
                  </i>{" "}
                  items in your cart
                </p>
                <table
                  id="shoppingCart"
                  className="table table-condensed table-responsive"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "60%" }}>Product</th>
                      <th style={{ width: "12%" }}>Price</th>
                      <th style={{ width: "10%" }}>Quantity</th>
                      <th style={{ width: "16%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr>
                        <td data-th="Product">
                          <div className="row">
                            <div className="col-md-3 text-left">
                              <img
                                src={item.image}
                                alt=""
                                className="img-fluid d-none d-md-block rounded mb-2 shadow"
                              />
                            </div>
                            <div className="col-md-9 text-left mt-sm-2">
                              <h4>{item.name}</h4>
                              <p className="font-weight-light">
                                size: {item.size} &amp; color: {item.color}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price">${item.price}</td>

                        <td data-th="Quantity">
                          <div className="quantity-input text-center">
                            <button
                              className="quantity-button"
                              onClick={() => increasequantity(item)}
                              style={{ display: "" }}
                              disabled={loading || numberofitems == 1}
                            >
                              <i class="bi bi-plus"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control form-control-lg text-center"
                              value={item.quantity}
                              // onChange={(e) =>
                              //   setItemcount(parseInt(e.target.value))
                              // }
                            />
                            <button
                              className="quantity-button"
                              onClick={() => decreasequantity(item)}
                              style={{ display: "" }}
                              disabled={loading}
                            >
                              <i class="bi bi-dash"></i>
                            </button>
                          </div>
                        </td>
                        <td className="actions" data-th="">
                          <div className="text-center">
                            <button
                              onClick={() => removeproduct(item)}
                              disabled={loading}
                              className="btn btn-white border-secondary bg-white btn-md mb-2"
                              id={styles.btn}
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
                  <h4>Subtotal:</h4>
                  <h1>${cartTotal}</h1>
                </div>
              </div>
            </div>
            <div className="row mt-4 d-flex align-items-center ">
              <div className="col-sm-6 order-md-2 text-right">
                <Link
                  href="/shipping"
                  className="btn btn-primary mb-4 btn-lg pl-5 pr-5"
                >
                  Checkout
                </Link>
              </div>
              <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">
                <Link href="/">
                  <i className="fas fa-arrow-left mr-2" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </CartProvider>
  );
};

export default Cart;
