const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const UserControl = require('../../components/user/UserControl')
const jwt = require('jsonwebtoken');
const {validationRegister} = require('../../midle/validate');
// http://localhost:3000/api/user
// http://localhost:3000/api/user/login

router.post("/login", async (req, res, next) => {
    try {
        const { email, pass } = req.body;
        const user = await UserControl.login(email, pass);
        if (user) {const token = jwt.sign({user} , 'serect' , {expiresIn: '1h'});
            return res.status(200).json({ result: true, user: user, token});
        } else {
            return res.status(400).json({ result: false, user: null });
        }
    } catch (error) {
        console.log(error);
        return resizeBy.status(500).json({ result: false, user: null });
    }
});


router.post('/register',[validationRegister], async (req, res, next) => {
    try {
        const { email, pass, name } = req.body;
        const user = await UserControl.register(email, pass, name);
        if (user) {
            return res.status(200).json({ result: true, user: user })
        }
    } catch (error) {
        console.log(error);
        return resizeBy.status(500).json({ result: false, user: null });
    }
})



module.exports = router;