"use client";

import Dropdown from "react-bootstrap/Dropdown";

function Statusdropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Change Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-2">Processing</Dropdown.Item>
        <Dropdown.Item href="#/action-3">On-hold</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Completed</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Canceled</Dropdown.Item>
      </Dropdown.Menu>
      <h5 style={{ marginTop: "20px" }}>Status</h5>
    </Dropdown>
  );
}

export default Statusdropdown;
