const router = require('express').Router();
const User = require('../model/User');

// validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {

    // validate the data before creating a user
    try {

        const value = await Promise.all([schema.validateAsync(req.body)]);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(savedUser => {
                res.status(200).json({ data: savedUser });
            })
            .catch(err => console.log(err));
    } catch (err) {
        res.status(400).send(err.details[0].message);
    }
})

module.exports = router;
