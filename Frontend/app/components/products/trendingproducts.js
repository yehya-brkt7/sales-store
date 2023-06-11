"use client";

import styles from "./trendingproducts.module.css";
import { useStore } from "../../zustand/store";
import { useState, useEffect } from "react";
import Image from "next/image";
import Badge from "react-bootstrap/Badge";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Trending = ({ products }) => {
  const { productcolor, setproductcolor, setrelatedproducttype } = useStore(
    (state) => state
  );

  const router = useRouter();

  const [productIndex, setIProductIndex] = useState(null);
  const handleChange = (c, id) => {
    setproductcolor(c);
    setIProductIndex(id);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [productId, setproductId] = useState();

  const handleClick = (type) => {
    setrelatedproducttype(type);
    router.push(`/products/${productId}`);
  };

  return (
    <main className={styles.main}>
      <h1>Trending</h1>

      <div className={styles.container}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          navigation
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 1.3,
            },
            600: {
              slidesPerView: 1.6,
            },
            740: {
              slidesPerView: 1.8,
            },
            890: {
              slidesPerView: 2.2,
            },
            1000: {
              slidesPerView: 2.5,
            },
            1324: {
              slidesPerView: 3,
            },
          }}
          className={styles.slider}
        >
          {products

            .filter((product) => product.attributes[2].options[0] == "true")
            .sort((a, b) => b.price - a.price)
            .map((p, index) => {
              return (
                <SwiperSlide>
                  <div
                    onMouseEnter={() => {
                      setproductId(p.id);
                    }}
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
                              <Badge className={styles.badge} bg="danger">
                                Trending
                              </Badge>
                              {p.id === productIndex ? (
                                <Image
                                  loading="lazy"
                                  width="200"
                                  height="200"
                                  className={styles.img}
                                  src={
                                    p.images.find((i) =>
                                      i.name
                                        .toLowerCase()
                                        .includes(productcolor.toLowerCase())
                                    ).src
                                  }
                                  alt=""
                                />
                              ) : (
                                <Image
                                  loading="lazy"
                                  width="200"
                                  height="200"
                                  className={styles.img}
                                  src={p.images[0].src}
                                  alt=""
                                />
                              )}
                              <div className={styles["img-info"]}>
                                <div className={styles["info-inner"]}>
                                  <span className={styles["p-name"]}>
                                    {p.name}
                                  </span>

                                  {/* <span className={styles["p-company"]}>
                            {p.type}
                          </span> */}
                                </div>
                                <div className={styles["a-size"]}>
                                  Available sizes :{" "}
                                  <span className={styles.size}>
                                    {p.attributes[0].options
                                      .filter((s) => s != "all")
                                      .map((s) => {
                                        return (
                                          <span
                                            style={{
                                              display: "inline-block",
                                              color: "black",
                                              width: "40px",
                                              height: "20px",
                                              marginRight: "5px",
                                              borderRadius: "30%",
                                            }}
                                          >
                                            {s}
                                          </span>
                                        );
                                      })}
                                  </span>
                                </div>
                                <div className={styles["a-color"]}>
                                  Available color : {"  "}
                                  <span className={styles.color}>
                                    {p.attributes[1].options
                                      .filter((c) => c != "all")
                                      .map((c) => {
                                        return (
                                          <span
                                            className={styles.colors}
                                            style={{
                                              display: "inline-block",
                                              backgroundColor: c,
                                              width: "20px",
                                              height: "20px",
                                              marginRight: "5px",
                                              borderRadius: "50%",
                                              cursor: "pointer",
                                            }}
                                            key={c}
                                            onClick={() =>
                                              handleChange(c, p.id)
                                            }
                                            tabIndex="-1"
                                          ></span>
                                        );
                                      })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className={styles["box-down"]}>
                              <div className={styles["h-bg"]}>
                                <div className={styles["h-bg-inner"]}></div>
                              </div>

                              <a
                                onClick={() =>
                                  handleClick(p.categories[0].name)
                                }
                                className={styles.cart}
                                href="#"
                              >
                                <span className={styles.price}>{p.price}$</span>

                                <span className={styles["add-to-cart"]}>
                                  <span className={styles.txt}>View Item</span>
                                </span>
                              </a>
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
      </div>
    </main>
  );
};
export default Trending;
