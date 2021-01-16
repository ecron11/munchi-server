const mongoose = require('mongoose');

const InventoryShema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Inventory', InventoryShema, 'inventory');