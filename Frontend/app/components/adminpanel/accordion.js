import Accordion from "react-bootstrap/Accordion";
import styles from "../profile/profile.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getProductVariations,
  getVariation,
  updateVariation,
} from "@/app/lib/woocommerce";

function AccordionDetails({ name, productid }) {
  const [variations, setVariations] = useState([]);

  const fetchVariation = async () => {
    try {
      const variations = await getProductVariations(productid);

      console.log("var", variations);
      setVariations(variations);
    } catch (error) {
      // Handle the error here
      toast.error("failed to load variations");
    }
  };

  useEffect(() => {
    fetchVariation();
  }, [variations]);

  const [loading, setLoading] = useState(false); // Add loading state

  const increasequantity = async (item) => {
    if (loading) return; // Disable button if loading
    setLoading(true); // Set loading state

    try {
      // Fetch the current stock quantity
      const response = await getVariation(productid, item.id);
      const currentStockQuantity = response?.data?.stock_quantity;

      if (currentStockQuantity >= 0) {
        // Decrease the stock quantity by 1
        const updatedStockQuantity = currentStockQuantity + 1;

        // Update the stock quantity using the WooCommerce REST API
        const data = {
          stock_quantity: updatedStockQuantity,
        };

        const res = await updateVariation(productid, item.id, data);
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

    try {
      // Fetch the current stock quantity
      const response = await getVariation(productid, item.id);
      const currentStockQuantity = response?.data?.stock_quantity;

      if (currentStockQuantity > 0) {
        // Decrease the stock quantity by 1
        const updatedStockQuantity = currentStockQuantity - 1;

        // Update the stock quantity using the WooCommerce REST API
        const data = {
          stock_quantity: updatedStockQuantity,
        };

        const res = await updateVariation(productid, item.id, data);
      }
    } catch (error) {
      console.log("Error updating stock quantity:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Accordion style={{ width: "100vw" }}>
      <Accordion.Item eventKey="0" onClick={fetchVariation}>
        <Accordion.Header>{name}</Accordion.Header>
        <Accordion.Body>
          {" "}
          {variations?.map((item) => (
            <section className="pt-5 pb-5">
              <div className="container">
                <div className="row w-100">
                  <div className="col-lg-12 col-md-12 col-12">
                    <table
                      id="shoppingCart"
                      className="table table-condensed table-responsive"
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "60%" }}>Product</th>
                          <th style={{ width: "12%" }}>Price</th>
                          <th style={{ width: "10%" }}>Stock Quantity</th>
                          <th style={{ width: "16%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-th="Product">
                            <div className="row">
                              {/* <div className="col-md-3 text-left">
                                <img
                                  src={
                                    item.attributes[0].option == "red"
                                      ? item.imageUrls[0]
                                      : item.attributes[0].option == "blue"
                                      ? item.imageUrls[1]
                                      : item.imageUrls[2]
                                  }
                                  alt=""
                                  className="img-fluid d-none d-md-block rounded mb-2 shadow"
                                />
                              </div> */}
                              <div className="col-md-9 text-left mt-sm-2">
                                <h4>name: {name}</h4>
                                <p className="font-weight-light">
                                  color: {item.attributes[0].option}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td data-th="Price">${item.salePrice}</td>

                          <td data-th="Quantity">
                            <div className="quantity-input text-center">
                              <button
                                className="quantity-button"
                                onClick={() => increasequantity(item)}
                                style={{ display: "" }}
                                disabled={loading}
                              >
                                <i class="bi bi-plus"></i>
                              </button>
                              <input
                                type="text"
                                className="form-control form-control-lg text-center"
                                value={item.stock_quantity}

                                // onChange={(e) =>
                                //   setItemcount(parseInt(e.target.value))
                                // }
                              />
                              <button
                                className="quantity-button"
                                onClick={() => decreasequantity(item)}
                                style={{ display: "" }}
                                disabled={loading || item.stock_quantity == 0}
                              >
                                <i class="bi bi-dash"></i>
                              </button>
                            </div>
                          </td>
                          {/* <td className="actions" data-th="">
                            <div className="text-center">
                              <button
                                onClick={() => removeproduct(item)}
                                className="btn btn-white border-secondary bg-white btn-md mb-2"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </td> */}
                        </tr>

                        {/* Repeat the above 'tr' block for each product */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionDetails;
