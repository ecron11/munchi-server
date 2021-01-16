const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    inventoryId: {
        type: String, 
        required: true},
    name: {
        type: String, 
        required:true},
    qty: {
        type: Number, 
        required: true},
    qtyUnit: {
        type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('InventoryItem', ItemSchema);