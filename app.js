const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const cookieSession = require("cookie-session");
const InventoryItem = require("./Models/InventoryItem")

require('dotenv').config();
const app = express();



//Passport config
require('./config/passport')(passport);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL
  }));
  

//connect to db
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//express session middleware
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session())

//Routes
app.use('/inv', require('./routes/inventory'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 3000;

//Homepage
app.get('/', (req, res) => {
    res.send('This is the API for the Munchi Web App');
})

//CRUD functions for inventory items

//create item
app.post('/createInventoryItem', (req, res) => {
    console.log(`Creating inventory new item with name: ${req.body.name}`);
    let item = new InventoryItem(
        {
            userId: req.user.id,
            inventoryId: req.body.inventoryId,
            name: req.body.name,
            qty: req.body.qty,
            qtyUnit: req.body.qtyUnit
        });
        //should return the item ID to be used later
        item.save(function (err,data) {
            if (err) {
                console.error(err);
                res.json({
                    error: err
                })
            } else {
                res.json({
                    'item' : data
                });
            }
        });
    
});

//get an inventory item by ID
app.get('/getInventoryItemByID/:id?', (req, res) => {
    console.log(`Getting inventory item with ID: ${req.params.id}`);

    InventoryItem.findById(req.params.id, (err, data) => {
        if (err) {
            console.error(err);
            res.json({
                error: err
            })
        } else {
            res.json({
                'item' : data
            });
        }
    });
});

//get inventory items by inventoryId
app.get('/getInventoryItemsByInventoryId/:inventoryId?', (req, res)=>{
    console.log(`Getting inventory items for inventoryId: ${req.params.inventoryId}`);

    InventoryItem
    .find()
    .where('inventoryId').equals(req.params.inventoryId)
    .exec((err, data) => {
        if (err) {
            console.error(err);
            res.json({
                error: err
            })
        } else {
            res.json({
                'items' : data
            });
        }
        
    })
})

//update an inventory item by id
app.put('/updateInventoryItemByID/:id?', (req,res) => {
    console.log(`Updating inventory item with ID: ${req.body.id}`);

    let update = {};
    
    //Checks if prop exists and adds it to update object if it does.
    if(req.body.name) update.name = req.body.name;
    if(req.body.qty) update.qty = req.body.qty;
    if(req.body.qtyUnit) update.qtyUnit = req.body.qtyUnit;

    let options = {new: true};

    InventoryItem.findByIdAndUpdate(req.body.id, update, options, (err, data)=>{
        if (err) {
            console.error(err);
            res.json({
                error: err
            })
        } else {
            res.json({
                
                'item': data
            })
        }
    })
    
})

//delete and inventory by id
app.delete('/deleteInventoryItemByID/:id?', (req,res) => {
    console.log(`Deleting inventory item with ID: ${req.params.id}`);

    InventoryItem.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.error(err);
            res.json({
                error: err
            })
        } else {
            res.json({
                response: data
            })
        } 
    });
    
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