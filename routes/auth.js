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

router.get('/checkCurrentUser', function(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json({
        user: req.user
    })
})

module.exports = router;