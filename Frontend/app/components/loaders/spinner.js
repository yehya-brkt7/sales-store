"use client";

import Spinner from "react-bootstrap/Spinner";

function Spinnercircle() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </main>
  );
}

export default Spinnercircle;
