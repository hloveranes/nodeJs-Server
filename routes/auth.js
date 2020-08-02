const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation.js');

// const value = await Promise.all([schema.validateAsync(req.body)]);

router.get('/all', async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json({ data: allUser })
    } catch (error) {
        res.status(500).json({ errMsg: error })
    }
})

router.post('/register', (req, res) => {
    // validate the data before creating a user
    registerValidation(req.body).then(something => {
        // const emailExist = await User.findOne({ email: req.body.email });
        User.findOne({ email: req.body.email }).then(emailExist => {
            if (emailExist) return res.status(400).json(`Email already exists ${emailExist.email}`);
            // const salt = await bcrypt.genSalt(10);
            bcrypt.genSalt(10).then(salt => {
                bcrypt.hash(req.body.password, salt).then(hashedPassword => {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    });
                    user.save().then(savedUser => { res.status(200).json({ data: savedUser }) }).catch(err => res.status(500).json(err));
                }).catch(err => { res.status(500).json(err); })
            }).catch(err => { res.status(500).json(err); })
        }).catch(err => { res.status(500).json(err); })
    }).catch(err => { res.status(400).json(err.details[0].message); })
});
module.exports = router;
