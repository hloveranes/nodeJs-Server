const { required } = require('@hapi/joi');

const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {
    try {
        const userFound = await User.find({ _id: req.user });
        res.status(200).json(userFound);
    } catch (err) {
        res.status(500).json(`${err}`);
    }
});


module.exports = router;