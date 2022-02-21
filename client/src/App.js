import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Flow from "./flowchart";
import ObservationTable from "./observation-data/observation-table";
import ObservationSummary from "./observation-summary/observation-summary";

const ContainerDiv = styled(Container)`
  font-family: sans-serif;
`;
const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const FlowArea = styled(Col)`
  width: 100%;
  height: 55vh;
`;

export default function App() {
  const [data, setData] = useState({ observation: [], summary: [] });
  const [message, setMesssage] = useState("")
  const fetchData = () => {
    fetch("api/load-data")
      .then((response) => {
        return response.json();
      })

      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  const saveData = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    };
    fetch("api/save-data", requestOptions).then((response)=> {
      return response.json()
    }).then((res) => {
      
      setMesssage(res.message)
    });
  
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateObservation = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData((old) => {
      let obs = old["observation"].map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old["observation"][rowIndex],
            [columnId]: value,
          };
        }
        return row;
      });
      return {
        ...old,
        observation: obs,
      };
    });
  };
  const updateSummary = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData((old) => {
      let summary = old["summary"].map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old["summary"][rowIndex],
            [columnId]: value,
          };
        }
        return row;
      });
      return {
        ...old,
        summary: summary,
      };
    });
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
      <Button onClick={saveData}>Save Data</Button>{message}
      <ObservationTable
        updateMyData={updateObservation}
        data={data["observation"]}
        saveData={saveData}
      />
      <ObservationSummary
        updateMyData={updateSummary}
        data={data["summary"]}
        saveData={saveData}
      />
    </ContainerDiv>
  );
}
