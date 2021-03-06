import React from "react";
import styled from "styled-components";
import Table from "../table/table";
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100vw

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;
function ObservationTable(props) {
    
    const columns = React.useMemo(
        () => [
            {
                Header: "Weight of water from step 6.3",
                columns: [
                    {
                        Header: "Test Volume",
                        accessor: "testVolume"
                    },
                    {
                        Header: "Dispense - 1",
                        accessor: "dispense1"
                    },
                    {
                        Header: "Dispense - 2",
                        accessor: "dispense2"
                    },
                    {
                        Header: "Dispense - 3",
                        accessor: "dispense3"
                    },
                    {
                        Header: "Dispense - 4",
                        accessor: "dispense4"
                    }
                ]
            }
        ],
        []
    );

   

  
   

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...

    return (
        <Styles>
           
            <Table
                columns={columns}
                data={props.data}
                updateMyData={props.updateMyData}
               
            />
        </Styles>
    );
}

export default ObservationTable;
