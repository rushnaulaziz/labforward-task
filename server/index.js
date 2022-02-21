const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/load-data", (req, res) => {
  
    fs.readFile('./server/data.json', (err, data) => {
        if (err) throw err;
        res.json({data: JSON.parse(data).data});
    });
   
});

app.post("/api/save-data", (req, res) => {
  
 console.log(req.body)
 fs.writeFile("./server/data.json", JSON.stringify(req.body), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        res.json({message: err})
    }
 
    console.log("JSON file has been saved.");
    res.json({message: "Data has been saved"})
});

});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});