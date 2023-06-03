import styles from "./gallery.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "../../../zustand/store";

const Gallery = ({ productdetail }) => {
  const { productcolor, setproductcolor } = useStore((state) => state);
  const [selectedView, setSelectedView] = useState("side");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    productdetail.attributes[1].options
      .filter((color) => color !== "all")
      .forEach((color) => {
        const image = new window.Image();
        image.src = getProductImageByColorAndOption(color, selectedView);
      });
  }, [productdetail]);

  useEffect(() => {
    setSelectedImage(
      getProductImageByColorAndOption(productcolor, selectedView)
    );
  }, [productcolor, selectedView]);

  useEffect(() => {
    setproductcolor("blue");
  }, []);

  const handleColor = (color) => {
    setproductcolor(color);
  };

  const handleView = (view) => {
    setSelectedView(view);
  };

  const getProductImageByColorAndOption = (color, option) => {
    const filteredImages = productdetail.images.filter((image) => {
      const altText = image.alt.toLowerCase();
      return altText.includes(color) && altText.includes(option);
    });

    return filteredImages.length > 0 ? filteredImages[0].src : "";
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.imagecontainer}>
        <img className={styles.image} src={selectedImage} />
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
          onClick={() => handleView("side")}
          src={getProductImageByColorAndOption(productcolor, "side")}
        />
        <img
          className={styles.thumbnailimage}
          tabIndex="-1"
          onClick={() => handleView("top")}
          src={getProductImageByColorAndOption(productcolor, "top")}
        />
        <img
          className={styles.thumbnailimage}
          tabIndex="-1"
          onClick={() => handleView("back")}
          src={getProductImageByColorAndOption(productcolor, "back")}
        />
      </div>
    </section>
  );
};
export default Gallery;
