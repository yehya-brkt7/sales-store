"use client";

import { getProductById } from "../../lib/woocommerce";
import Link from "next/link";
import Productdetail from "@/app/components/productdetails/product";
import { useStore } from "../../zustand/store";
import { useEffect, useState } from "react";

async function Product({ params }) {
  const { productsarray } = useStore((state) => state);

  const { productid } = params;

  const productdetail = productsarray.find(
    (product) => product.id == productid
  );

  // const productdetail = await getProductById(productid);

  return <Productdetail productdetail={productdetail} />;
}

export default Product;
