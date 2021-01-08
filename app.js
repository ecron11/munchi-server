const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

//connect to db
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000;

//Homepage
app.get('/', (req, res) => {
    res.send('This is the API for the Munchi Web App');
})

//CRUD functions for inventory items

//create item
app.post('/createInventoryItem', (req, res) => {
    console.log(`Creating inventory new item with name: ${req.body.name}`);
    res.json({
        test: "test"
    });
});

//get an inventory item by ID
app.get('/getInventoryItemByID/:id?', (req, res) => {
    console.log(`Getting inventory item with ID: ${req.params.id}`);
    res.json({
        test: "test"
    });
});

//get inventory items by userID
app.get('/getInventoryItemsByUser/:user?', (req, res)=>{
    console.log(`Getting inventory items for user: ${req.params.user}`);
    res.json({
        test: "test"
    })
})

//update an inventory item by id
app.put('/updateInventoryItemByID', (req,res) => {
    console.log(`Updating inventory item with ID: ${req.body.id}`);
    res.json({
        test: "test"
    })
})

//delete and inventory by id
app.delete('/deleteInventoryItemByID/:id?', (req,res) => {
    console.log(`Deleting inventory item with ID: ${req.params.id}`);
    res.json({
        test: "test"
    })
})

//check state of db
app.get('/checkdb', function (req, res) {
    let state = ""
    switch (mongoose.connection.readyState) {
        case 0:
            state="disconnected";
            break;
        case 1:
            state="connected";
            break;
        case 2:
            state="connecting";
            break;
        case 3:
            state="disconnecting";
            break;
        default:
            state="error";
    }
    res.json({
      state : state})
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})