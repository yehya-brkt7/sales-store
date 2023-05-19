"use client";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import styles from "./buttongroup.module.css";
import { useStore } from "../../../../zustand/store";

function Categories(props) {
  const { category1, category2, category3, category4 } = props;

  const { setSelectedcategory } = useStore((state) => state);

  const handleClick = (event) => {
    const categoryName = event.target.name;
    setSelectedcategory(categoryName);
  };

  const emptycategory = () => {
    setSelectedcategory("");
  };
  return (
    <main className={styles.main}>
      <h2 className={styles.header}>Products</h2>
      <ButtonGroup aria-label="Basic example" className={styles.buttons}>
        <button
          name={category1}
          onClick={handleClick}
          className={styles.button}
        >
          {category1}
        </button>
        <button
          onClick={handleClick}
          name={category2}
          className={styles.button}
        >
          {category2}
        </button>
        <button
          onClick={handleClick}
          name={category3}
          className={styles.button}
        >
          {category3}
        </button>
      </ButtonGroup>
      <button
        onClick={emptycategory}
        name={category4}
        className={styles.button}
      >
        {category4}
      </button>
    </main>
  );
}

export default Categories;
