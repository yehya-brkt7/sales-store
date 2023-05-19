import { getProductById } from "../../lib/woocommerce";
import Link from "next/link";
import Productdetail from "@/app/components/productdetails/product";

async function Product({ params }) {
  const { productid } = params;
  const productdetail = await getProductById(productid);

  return <Productdetail productdetail={productdetail} />;
}

export default Product;
