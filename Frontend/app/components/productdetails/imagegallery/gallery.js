import styles from "./gallery.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "../../../zustand/store";

const Gallery = ({ productdetail }) => {
  const { productcolor, setproductcolor } = useStore((state) => state);

  const handleColor = (color) => {
    setproductcolor(color);
  };

  function getProductImageByAlt(images, altText) {
    const image = images.find((image) => image.alt === altText);
    return image
      ? image.src
      : productdetail.images.find((image) => image.alt === "bluesideview").src;
  }

  const [photo, setPhoto] = useState(
    productdetail.images.find((image) => image.alt === "bluesideview").src
  );

  return (
    <section className={styles.gallery}>
      <div className={styles.imagecontainer}>
        <img className={styles.image} src={photo} />
      </div>
      <div className={styles.colorslist}>
        {productdetail.attributes[1].options
          .filter((color) => color != "all")
          .map((color) => (
            <div
              style={{
                display: "inline-block",
                backgroundColor: color,
                width: "20px",
                height: "20px",
                marginRight: "5px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              className={styles.colors}
              onClick={() => handleColor(color)}
              tabIndex="-1"
            ></div>
          ))}
      </div>

      <div className={styles.thumbnails}>
        <img
          className={styles.thumbnailimage}
          tabIndex="-1"
          onClick={() => {
            const selectedImageSrc =
              productcolor === "blue"
                ? getProductImageByAlt(productdetail.images, "bluesideview")
                : productcolor === "red"
                ? getProductImageByAlt(productdetail.images, "redsideview")
                : getProductImageByAlt(productdetail.images, "greensideview");

            setPhoto(selectedImageSrc);
          }}
          src={
            productcolor === "blue"
              ? getProductImageByAlt(productdetail.images, "bluesideview")
              : productcolor === "red"
              ? getProductImageByAlt(productdetail.images, "redsideview")
              : getProductImageByAlt(productdetail.images, "greensideview")
          }
        />
        <img
          className={styles.thumbnailimage}
          tabIndex="-1"
          onClick={() => {
            const selectedImageSrc =
              productcolor === "blue"
                ? getProductImageByAlt(productdetail.images, "bluetopview")
                : productcolor === "red"
                ? getProductImageByAlt(productdetail.images, "redtopview")
                : getProductImageByAlt(productdetail.images, "greentopview");

            setPhoto(selectedImageSrc);
          }}
          src={
            productcolor === "blue"
              ? getProductImageByAlt(productdetail.images, "bluetopview")
              : productcolor === "red"
              ? getProductImageByAlt(productdetail.images, "redtopview")
              : getProductImageByAlt(productdetail.images, "greentopview")
          }
        />
        <img
          className={styles.thumbnailimage}
          tabIndex="-1"
          onClick={() => {
            const selectedImageSrc =
              productcolor === "blue"
                ? getProductImageByAlt(productdetail.images, "bluebackview")
                : productcolor === "red"
                ? getProductImageByAlt(productdetail.images, "redbackview")
                : getProductImageByAlt(productdetail.images, "greenbackview");

            setPhoto(selectedImageSrc);
          }}
          src={
            productcolor === "blue"
              ? getProductImageByAlt(productdetail.images, "bluebackview")
              : productcolor === "red"
              ? getProductImageByAlt(productdetail.images, "redbackview")
              : getProductImageByAlt(productdetail.images, "greenbackview")
          }
        />
      </div>
    </section>
  );
};
export default Gallery;
