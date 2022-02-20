
import Flow from "./flowchart";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

const FlowArea = styled(Col)`
  width: 100%;
  height: 85vh;
`;

export default function App() {
  return (
    <ContainerDiv fluid>
      <Row>
        <Col>
          <h1>Routine Pipette Check and Calibration</h1>
        </Col>
      </Row>
      <Row>
        <FlowArea>
          <Flow />
        </FlowArea>
      </Row>
    </ContainerDiv>
  );
}
