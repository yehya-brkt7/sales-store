import Accordion from "react-bootstrap/Accordion";
import styles from "./profile.module.css";
import Link from "next/link";

function AccordionDetails({ customerLineItems }) {
  return (
    <Accordion style={{ width: "410px" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Items Bought</Accordion.Header>
        <Accordion.Body>
          {" "}
          {customerLineItems.map((item) => (
            <div className={styles.itemdetails}>
              <img src={item?.image?.src} className={styles.itemimage}></img>
              <Link
                href={`products/${item?.product_id}`}
                className={styles.itemtitle}
              >
                {item?.name}
              </Link>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionDetails;
