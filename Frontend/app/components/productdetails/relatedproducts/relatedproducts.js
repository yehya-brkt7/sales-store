import Link from "next/link";
import styles from "./relatedproducts.module.css";
import { useEffect, useState } from "react";
import { useStore } from "../../../zustand/store";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const RelatedProducts = ({ id }) => {
  const { relatedproducttype, storeproducts } = useStore((state) => state);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const totalProducts = storeproducts.filter(
      (product) =>
        product.categories[0].name == relatedproducttype && product.id != id
    ).length;

    if (totalProducts === 1) {
      setSlidesPerView(1); // Display only 1 slide when there's only 1 product
    } else if (totalProducts === 2) {
      setSlidesPerView(2); // Display 2 slides when there are 2 products
    } else {
      setSlidesPerView(3); // Display 3 slides for all other cases
    }
  }, [storeproducts]);

  return (
    <main className={styles.main}>
      <h1>You may also like</h1>

      <div className={styles.container}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={slidesPerView}
          className={styles.slider}
        >
          {storeproducts.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>No products found</h2>
          ) : (
            storeproducts

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
              })
          )}
        </Swiper>
      </div>
    </main>
  );
};

export default RelatedProducts;
