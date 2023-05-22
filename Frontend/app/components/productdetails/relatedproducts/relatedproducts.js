"use client";

import Link from "next/link";
import styles from "../../products/products.module.css";
import { useEffect, useState } from "react";
import { useStore } from "../../../zustand/store";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

async function RelatedProducts({ id }) {
  const { productcolor, setproductcolor, relatedproducttype, storeproducts } =
    useStore((state) => state);

  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    console.log("storeproducts", storeproducts, "related", relatedproducttype);
  }, []);

  const [productIndex, setIProductIndex] = useState(null);
  const handleChange = (c, id) => {
    setproductcolor(c);
    setIProductIndex(id);
  };

  const handleClick = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {Array.isArray(storeproducts) &&
          storeproducts
            .sort((a, b) => b.price - a.price)
            .filter(
              (product) => product.categories[0].name === relatedproducttype
            )
            .filter((product) => product.id != id)
            .map((p, index) => {
              return (
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
                              </div>
                              {/* <div className={styles["a-size"]}>
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
                                          onClick={() => handleChange(c, p.id)}
                                          tabIndex="-1"
                                        ></span>
                                      );
                                    })}
                                </span>
                              </div>*/}
                            </div>
                          </div>

                          <div className={styles["box-down"]}>
                            <div className={styles["h-bg"]}>
                              <div className={styles["h-bg-inner"]}></div>
                            </div>

                            {/* <a
                              onClick={(e) => {
                                e.preventDefault(); // Prevent the default link navigation
                                handleClick(p.id);
                              }}
                              className={styles.cart}
                              href="#"
                            >
                              <span className={styles.price}>{p.price}$</span>

                              <span className={styles["add-to-cart"]}>
                                <span className={styles.txt}>View Item</span>
                              </span>
                            </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </main>
  );
}

export default RelatedProducts;