import styles from "../about.module.css";
import gridimage from "../../../../public/gif.gif";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.imagecontainer}>
          <Image className={styles.img} src={gridimage}></Image>
          <h1 className={styles.header}>About Us</h1>
        </div>
        <p className={styles.paragraph}>
          Our mission is to provide you, our valued customers, with a convenient
          and seamless online shopping experience. We are dedicated to offering
          an extensive range of high-quality products at competitive prices,
          catering to your diverse needs and preferences.
        </p>
      </section>
    </>
  );
};

export default Info;
