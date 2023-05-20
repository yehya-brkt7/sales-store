import Image from "next/image";
import styles from "./page.module.css";
import { getAllProducts } from "./lib/woocommerce";
import Link from "next/link";
import Products from "./components/products/products";
import NavBar from "./components/navbar/navbar";
import Trending from "./components/products/trendingproducts";
import Filters from "./components/products/filters/filters";
import ControlledCarousel from "./components/products/filters/categoryslider";
import "bootstrap/dist/css/bootstrap.min.css";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className={styles.main}>
      <Trending products={products} />
      <ControlledCarousel />
      <Filters />
      <Products products={products} />
    </main>
  );
}
