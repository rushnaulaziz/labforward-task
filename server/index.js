const express = require("express");
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/api/load-data", (req, res) => {
  
    fs.readFile('./server/data.json', (err, data) => {
        if (err) throw err;
        res.json({data: JSON.parse(data).data});
    });
   
});

app.post("/api/store-data", (req, res) => {
  
    fs.readFile('./server/data.json', (err, data) => {
        if (err) throw err;
        res.json({data: JSON.parse(data).data});
    });
   
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});