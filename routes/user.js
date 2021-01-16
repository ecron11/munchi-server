const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User');
const router = express.Router()

router.get('/:id', (req, res) => {
    try {
        let user = User.findById(req.params.id, (err, user) => {
            if (err) {
                console.error(err);
                res.json({
                    error: err
                })
            } else {
                res.json({
                    'user': user
                });
            }
        });        
    }
    catch (err) {
        console.error(err);
        res.json({
            error : err
        });
    }
}) 

module.exports = router;