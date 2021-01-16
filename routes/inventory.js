const express = require('express');
const Inventory = require('../Models/Inventory');
const router = express.Router()

router.get('/getInventoriesByUser', async (req, res) => {
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

router.post('/getInventory', (req, res) => {
    
})

module.exports = router;