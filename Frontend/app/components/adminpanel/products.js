"use client";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductVariations,
  getVariation,
  updateVariation,
} from "@/app/lib/woocommerce";
import AccordionDetails from "./accordion";
import { Form } from "react-bootstrap";

const Products = () => {
  const [items, setitems] = useState([]);
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setitems(products);
      } catch (error) {
        // Handle the error here
        toast.error("failed to load products");
      }
    };

    fetchData();
  }, [items]);

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Products</h2>
      <Form onSubmit="" className="" style={{ marginBottom: "40px" }}>
        <Form.Control
          type="search"
          placeholder="Search Products"
          className="me-2"
          aria-label="Search"
          value={filter}
          onChange={handleSearchChange}
        />
      </Form>
      <section>
        {items.map(
          (item) =>
            item.name?.toLowerCase().includes(filter.toLowerCase()) && (
              <>
                <AccordionDetails name={item.name} productid={item.id} />
              </>
            )
        )}
      </section>
    </main>
  );
};

export default Products;
