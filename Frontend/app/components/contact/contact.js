"use client";

import styles from "./contact.module.css";
import Image from "next/image";
import bg from "../../../public/contact.jpg";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../../zustand/store";
import { getCustomer } from "@/app/lib/woocommerce";

const Contact = () => {
  const { user, accountemail, setuser } = useStore((state) => state);

  useEffect(() => {
    if (accountemail === "") {
      const storedEmail = sessionStorage.getItem("accountemail");

      getCustomer(storedEmail, setuser);
    }
  }, []);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    setFname(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLname(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("http://localhost:4000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fname, lname, phone, email, message }),
      });

      toast("Message Sent!");
      if (response.ok) {
        console.log("success");
        setFname("");
        setLname("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        console.log("Failed to send email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main} id="contact">
      <section className={styles.firstcolumn}>
        <Image loading="lazy" className={styles.background} src={bg}></Image>
        <div className={styles.backgroundcontent}>
          <h2>E-commerce</h2>
          <p>
            [Company Name] is a premier e-commerce company that specializes in
            offering [insert product category or niche].
          </p>
          <div className={styles.socials}>
            <span>
              <i class="bi bi-instagram"></i>
            </span>
            <span>
              <i class="bi bi-facebook"></i>
            </span>
            <span>
              <i class="bi bi-twitter"></i>
            </span>
            <span>
              <i class="bi bi-youtube"></i>
            </span>
          </div>
        </div>
      </section>
      <section className={styles.secondcolumn}>
        <div className={styles.headers}>
          <h2>Get in Touch</h2>
          <p>24/7 we will answer your questions</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.secondcolumn}>
          <div className={styles.names}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={user.first_name === "" ? fname : user.first_name}
              onChange={handleFirstNameChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={user.last_name === "" ? lname : user.last_name}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email === "" ? email : user.email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          <textarea
            className={styles.textarea}
            rows="4"
            wrap="soft"
            placeholder="Describe your problem"
            name="message"
            value={message}
            onChange={handleMessageChange}
            required
          />
          <button type="submit">send</button>
          <ToastContainer />
        </form>
      </section>
    </main>
  );
};

export default Contact;
