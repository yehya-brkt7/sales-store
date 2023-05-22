"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";

const Cart = () => {
  const { cartproducts } = useStore((state) => state);

  // const [itemcount, setItemcount] = useState(1);

  // const handleIncrement = (e) => {
  //   setItemcount((itemcount) => itemcount + 1);
  // };

  // const handleDecrement = (e) => {
  //   itemcount > 1
  //     ? setItemcount((itemcount) => itemcount - 1)
  //     : setItemcount(1);
  // };

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row w-100">
          <div className="col-lg-12 col-md-12 col-12">
            <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
            <p className="mb-5 text-center">
              <i className="text-info font-weight-bold">3</i> items in your cart
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
                {cartproducts.map((product) => (
                  <tr>
                    <td data-th="Product">
                      <div className="row">
                        <div className="col-md-3 text-left">
                          <img
                            src="https://via.placeholder.com/250x250/5fa9f8/ffffff"
                            alt=""
                            className="img-fluid d-none d-md-block rounded mb-2 shadow"
                          />
                        </div>
                        <div className="col-md-9 text-left mt-sm-2">
                          <h4>{item.name}</h4>
                          <p className="font-weight-light">Brand &amp; Name</p>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">{product.price}</td>

                    <td data-th="Quantity">
                      <div className="quantity-input text-center">
                        <button
                          className="quantity-button"
                          // onClick={() =>
                          //   updateItemQuantity(product.id, product.quantity + 1)
                          // }
                          style={{ display: "" }}
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                        <input
                          type="text"
                          className="form-control form-control-lg text-center"
                          value={product.quantity}
                          // onChange={(e) =>
                          //   setItemcount(parseInt(e.target.value))
                          // }
                        />
                        <button
                          className="quantity-button"
                          // onClick={() =>
                          //   updateItemQuantity(item.id, item.quantity - 1)
                          // }
                          style={{ display: "" }}
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                      </div>
                    </td>
                    <td className="actions" data-th="">
                      <div className="text-center">
                        <button
                          // onClick={() => removeItem(item.id)}
                          className="btn btn-white border-secondary bg-white btn-md mb-2"
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
              <h1>$99.00</h1>
            </div>
          </div>
        </div>
        <div className="row mt-4 d-flex align-items-center ">
          <div className="col-sm-6 order-md-2 text-right">
            <Link
              href="/checkout"
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
  );
};

export default Cart;
