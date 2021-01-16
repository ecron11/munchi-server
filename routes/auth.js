const express = require('express');
const passport = require('passport');
const router = express.Router()

// @desc    Auth with Google
// @route   Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   Get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/${req.user._id}`);
})

module.exports = router;