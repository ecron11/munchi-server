const express = require('express');
const InventoryItem = require('../Models/InventoryItem');
const Inventory = require('../Models/Inventory');
const router = express.Router()

router.get('/getInventoriesByUser', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    await Inventory
    .find()
    .where('userId').equals(req.user.id)
    .exec((err, data) => {
        if (err) {
            console.error(err);
            res.json({
                error: err
            })
        } else {
            res.json({
                'inventories' : data
            });
        }
        
    })
});

router.get('/createInventory/:name?', async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    try {
        const newInventory = {
            name: req.params.name,
            userId: req.user.id
        }
        let inventory = await Inventory.findOne({ name: req.params.name }).lean()

        if(inventory) {
            inventory.found = true;
        } else {
            inventory = await Inventory.create(newInventory);
            inventory = inventory.toObject();
            inventory.found = false;
        }

        inventory.items = [];
        console.log(inventory);

        
        InventoryItem
        .find()
        .where('inventoryId').equals(inventory._id)
        .exec((err, data) => {
            console.log(data);
            if (err) {
                console.error(err);
                res.json({error: err})
            } else {
                inventory.items = data;
            }
        })
        console.log(inventory);
        res.json(inventory);
    } catch (err) {
        console.error(err);
        res.json({
            error: err
        })
    }
})

module.exports = router;