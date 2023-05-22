import styles from "./about.module.css";
import Videoplayer from "./video/video";
import Info from "./info/info";
import Achievements from "./achievements/achievements";
import Socials from "./socials/socials";

const About = () => {
  return (
    <main className={styles.main}>
      <Info />
      <Achievements />
      <Socials />
      <Videoplayer />

      {/* <section className={styles.creators}>
        <h1>Creators</h1>

        <div className={styles.avatars}>
          <div className={styles.avatarcontent}>
            <p>name 1</p>
            <span className={styles.avatar}>
              <Image
                loading="lazy"
                className={styles.avatarimage}
                src={person1}
              ></Image>
            </span>
          </div>
          <div className={styles.avatarcontent}>
            <p>name 2</p>
            <span className={styles.avatar}>
              <Image
                loading="lazy"
                className={styles.avatarimage}
                src={person2}
              ></Image>
            </span>
          </div>
          <div className={styles.avatarcontent}>
            <p>name 3</p>
            <span className={styles.avatar}>
              <Image
                loading="lazy"
                className={styles.avatarimage}
                src={person3}
              ></Image>
            </span>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default About;
