const express = require('express');
const passport = require('passport');
const router = express.Router()

// @desc    Auth with Google
// @route   Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   Get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    // Our token expires after one day
    res.redirect(`${process.env.FRONTEND_URL}`);
})

// @desc    Check current user
// @route   /auth/checkCurrentUser
router.get('/checkCurrentUser', function(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json({
        user: req.user
    })
})

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) =>{
    req.logout()
    res.redirect(`${process.env.FRONTEND_URL}/`)
}) 

module.exports = router;