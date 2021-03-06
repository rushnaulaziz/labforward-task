import React from "react";

export default [
    {
        id: "6.1",
        type: "input",
        data: {
            label: "Prepare balance"
        },
        position: { x: -700, y: 0 }
    },
    {
        id: "6.1.1",
        ype: "input",
        sourcePosition: 'right',
        targetPosition: 'top',
        data: {
            label: " Place a beaker with 1000ul of distilled H20 on the balance and tare"
        },
        position: { x: -700, y: 80 }
    },
    {
        id: "6.2",
        ype: "input",
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: "Place a new pipette tip on the pipettor"
        },
        position: { x: -500, y: 0 },
    },
    {
        id: "6.3",
        ype: "input",
        position: { x: -300, y: 0 },
        sourcePosition: 'bottom',
        targetPosition: 'left',
        data: {
            label: "Weigh the pipettes at 100% volume ﬁve times"
        }
    },
    {
        id: "6.3.1",
        sourcePosition: 'bottom',
        targetPosition: 'left',
        data: {
            label: "Aspirate and dispense 100% of the volume into the beaker"
        },
        position: { x: -300, y: 80 }
    },
    {
        id: "6.3.2",
        type: "input",
        data: {
            label: "Record the weight in the table in step 6.4"
        },
        position: { x: -300, y: 180 }
    },
    {
        id: "6.3.3",
        sourcePosition: 'top',
        targetPosition: 'right',
        data: { label: "Tare the balance" },
        position: { x: -500, y: 250 }
    },
    {
        id: "e1-2",
        source: "6.1",
        target: "6.1.1",
        type: "step"
    },
    {
        id: "e1-3",
        type: "step",
        source: "6.1.1",
        target: "6.2"
    },
    {
        id: "e3-4",
        source: "6.2",
        target: "6.3",
        type: "step",

    },
    {
        id: "e4-5",
        source: "6.3",
        target: "6.3.1",
        type: "smoothstep",
        label: ""
    },
    {
        id: "e5-6",
        source: "6.3.1",
        target: "6.3.2",
        type: "smoothstep",
    },
    {
        id: "e5-7",
        source: "6.3.2",
        target: "6.3.3",
        type: "step",
    },
    {
        id: "e5-8",
        source: "6.3.3",
        target: "6.3.1",
        animated: true,
        arrowHeadType: "arrow",
        label:"Repeat four more times"
    }
];
