import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";

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

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
        if (!isNaN(e.target.value)) {
            setValue(e.target.value);
        }
        else {
            e.target.value = 0
        }

    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} pattern="[0-9]*" inputMode="numeric" />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell
};

// Be sure to pass our updateMyData 
function Table({ columns, data, updateMyData }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
         
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData
        },
        usePagination
    );

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

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
            <button onClick={props.saveData}>Save</button>
            <Table
                columns={columns}
                data={props.data}
                updateMyData={props.updateMyData}
               
            />
        </Styles>
    );
}

export default ObservationTable;
