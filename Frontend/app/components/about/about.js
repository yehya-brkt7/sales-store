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
    </main>
  );
};

export default About;
