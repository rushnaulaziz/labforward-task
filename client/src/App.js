import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Flow from "./flowchart";
import ObservationTable from "./observation-data/observation-table";


const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

const FlowArea = styled(Col)`
  width: 100%;
  height: 65vh;
`;

export default function App() {


  const [data, setData] = useState([])
  const fetchData = () => {

    fetch("api/load-data")

      .then(response => {

        return response.json()

      })

      .then(res => {
        console.log(res.data)
        setData(res.data)

      })

  }

  useEffect(() => {

    fetchData()

  }, [])


  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

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
      <ObservationTable updateMyData={updateMyData} data={data} />

    </ContainerDiv>
  );
}
