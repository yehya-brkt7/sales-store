import Accordion from "react-bootstrap/Accordion";

function AccordionDetails({ details }) {
  return (
    <Accordion style={{ width: "410px" }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Details</Accordion.Header>
        <Accordion.Body>{details}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionDetails;
