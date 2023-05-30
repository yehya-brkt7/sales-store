"use client";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function Statusdropdown({ order, updateOrderDetails, id }) {
  const [orderStatus, setOrderStatus] = useState(order.status);

  const handleOrderStatus = (value) => {
    setOrderStatus(value);
  };

  //update order status
  useEffect(() => {
    const data = {
      status: orderStatus,
    };
    updateOrderDetails(id, data);
  }, [orderStatus]);

  return (
    <Dropdown onSelect={handleOrderStatus}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Change Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="processing">Processing</Dropdown.Item>
        <Dropdown.Item eventKey="on-hold">On-hold</Dropdown.Item>
        <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
        <Dropdown.Item eventKey="cancelled">Canceled</Dropdown.Item>
      </Dropdown.Menu>
      <h5 style={{ marginTop: "20px" }}>{order.status}</h5>
    </Dropdown>
  );
}

export default Statusdropdown;
