import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../public/logo.png";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useCart } from "react-use-cart";

const NavBar = () => {
  const { totalItems } = useCart();
  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand>
          <Image
            loading="lazy"
            src={logo}
            height="60"
            width="60"
            className={styles.logo}
          ></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "400px" }}
            navbarScroll
          >
            <Nav.Link className={styles.navlink}>
              <Link className={styles.link} href="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className={styles.navlink}>
              <Link className={styles.link} href="/about">
                About
              </Link>
            </Nav.Link>

            <Nav.Link className={styles.navlink}>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
            </Nav.Link>
            <Nav.Link className={styles.navlink}>
              <Link className={styles.link} href="/profile">
                Profile
              </Link>
            </Nav.Link>
            <Nav.Link className={styles.navlink}>
              <Link className={styles.link} href="/adminpanel">
                Admin Panel
              </Link>
            </Nav.Link>
          </Nav>

          <Nav.Link className={styles.navlink}>
            <Link className={styles.link} href="/signup">
              Create-Account
            </Link>
          </Nav.Link>
          <Nav.Link className={`${styles.checkoutIcon} ${styles.navlink}`}>
            <Link href="/cart">
              <i style={{ color: "black" }} class="bi bi-cart3"></i>
            </Link>
            <div className={styles.itemcount}>
              <span>{totalItems}</span>
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
