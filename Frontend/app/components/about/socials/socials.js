import styles from "../about.module.css";

const Socials = () => {
  return (
    <ul className={styles.ul}>
      <li className={styles.li}>
        <a className={styles.facebook} href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="bi bi-facebook" aria-hidden="true"></i>
        </a>
      </li>
      <li className={styles.li}>
        <a className={styles.twitter} href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="bi bi-twitter" aria-hidden="true"></i>
        </a>
      </li>
      <li className={styles.li}>
        <a className={styles.instagram} href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="bi bi-instagram"></i>
        </a>
      </li>
      <li className={styles.li}>
        <a className={styles.youtube} href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="bi bi-youtube" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  );
};

export default Socials;
