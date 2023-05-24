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

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Container fluid>
        <Navbar.Brand href="#">
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
            <Nav.Link href="#action1" className={styles.navlink}>
              <Link className={styles.link} href="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#action2" className={styles.navlink}>
              <Link className={styles.link} href="/about">
                About
              </Link>
            </Nav.Link>

            <Nav.Link href="#" className={styles.navlink}>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
            </Nav.Link>
            <Nav.Link
              style={{ marginRight: "20px" }}
              href="#action1"
              className={styles.navlink}
            >
              <Link className={styles.link} href="/profile">
                Profile
              </Link>
            </Nav.Link>
          </Nav>
          {/* <Form
            onSubmit={handleSearch}
            className="d-flex"
            style={{ marginRight: "20px" }}
          >
            <Form.Control
              type="search"
              placeholder="Search Products"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="dark">
              Search
            </Button>{" "}
          </Form> */}

          <Nav.Link href="#action1" className={styles.navlink}>
            <Link className={styles.link} href="/signup">
              Create-Account
            </Link>
          </Nav.Link>
          <Nav.Link
            href="#action1"
            className={`${styles.checkoutIcon} ${styles.navlink}`}
          >
            <Link href="/cart">
              <i class="bi bi-cart3"></i>
            </Link>
          </Nav.Link>

          <Nav.Link href="#action1" className={styles.checkoutButton}>
            <Button variant="outline-success">Checkout</Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
