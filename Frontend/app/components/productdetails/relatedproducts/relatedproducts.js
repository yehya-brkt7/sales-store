import Link from "next/link";
import styles from "./relatedproducts.module.css";
import { useEffect, useState } from "react";
import { useStore } from "../../../zustand/store";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { getAllProducts } from "@/app/lib/woocommerce";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const RelatedProducts = ({ id }) => {
  const { relatedproducttype, setrelatedproducttype } = useStore(
    (state) => state
  );

  const [storeproducts, setStoreproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productsLength, setProductslength] = useState(
    storeproducts.filter(
      (product) =>
        product.categories[0].name == relatedproducttype && product.id != id
    ).length
  );

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setStoreproducts(products);
        setLoading(true);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();

    if (relatedproducttype != "")
      localStorage.setItem("relatedtype", relatedproducttype);
  }, []);

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Save storeproducts in local storage

    setProductslength(
      storeproducts.filter(
        (product) =>
          product.categories[0].name == relatedproducttype && product.id != id
      ).length
    );
  }, [storeproducts]);

  useEffect(() => {
    if (relatedproducttype == "") {
      setrelatedproducttype(localStorage.getItem("relatedtype"));
    }
  }, [relatedproducttype]);

  return (
    <main className={styles.main}>
      <h1>You may also like</h1>

      <div className={styles.container}>
        {loading && productsLength > 0 ? (
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            navigation
            breakpoints={{
              300: {
                slidesPerView: 1,
              },

              840: {
                slidesPerView: productsLength == 1 ? 1 : 2,
              },

              1300: {
                slidesPerView:
                  productsLength == 1 ? 1 : productsLength == 2 ? 2 : 3,
              },
            }}
            className={styles.slider}
          >
            {storeproducts
              .filter(
                (product) =>
                  product.categories[0].name == relatedproducttype &&
                  product.id != id
              )
              .sort((a, b) => b.price - a.price)
              .map((p, index) => {
                return (
                  <SwiperSlide>
                    <div
                      data-aos="zoom-in-up"
                      key={index}
                      product={p}
                      index={index}
                      className={styles.productcontainer}
                    >
                      <div className={styles["page-wrapper"]}>
                        <div className={styles["page-inner"]}>
                          <div className={styles.row}>
                            <div className={styles["el-wrapper"]}>
                              <div className={styles["box-up"]}>
                                <Image
                                  loading="lazy"
                                  width="200"
                                  height="200"
                                  className={styles.img}
                                  src={
                                    p.images.find((i) =>
                                      i.name
                                        .toLowerCase()
                                        .includes("blue" || "red" || "green")
                                    ).src
                                  }
                                  alt=""
                                />

                                <div className={styles["img-info"]}>
                                  <div className={styles["info-inner"]}>
                                    <span className={styles["p-name"]}>
                                      {p.name}
                                    </span>

                                    {/* <span className={styles["p-company"]}>
                            {p.type}
                          </span> */}
                                  </div>
                                </div>
                              </div>

                              <div className={styles["box-down"]}>
                                <div className={styles["h-bg"]}>
                                  <div className={styles["h-bg-inner"]}></div>
                                </div>

                                <Link
                                  href={`/products/${p.id}`}
                                  className={styles.cart}
                                  onClick={handleClick}
                                >
                                  <span className={styles.price}>
                                    {p.price}$
                                  </span>
                                  <span className={styles["add-to-cart"]}>
                                    <span className={styles.txt}>
                                      View Item
                                    </span>
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        ) : (
          <>loading...</>
        )}
      </div>
    </main>
  );
};

export default RelatedProducts;
