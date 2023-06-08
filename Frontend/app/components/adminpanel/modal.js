import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./adminpanel.module.css";

function ModalDisplay(items) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#0d6efd",
          fontSize: "16px",
          letterSpacing: "3px",
          textDecoration: "underline",
          marginLeft: "-13px",
        }}
      >
        View Items
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items?.items.map((item) => (
            <div className={styles.items}>
              <span>({item.quantity})</span>
              <span>{item.name}</span>
              <span
                style={{
                  height: "20px",
                  width: "40px",
                  backgroundColor: item.meta_data[0]?.value,
                }}
              ></span>
              <span>{item.meta_data[1].value}</span>
              {/* <img className={styles.itemimage} src={item.image.src}></img> */}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDisplay;
