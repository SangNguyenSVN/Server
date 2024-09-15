var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const userControll = require('../components/user/UserControl');
//token
const jwt = require('jsonwebtoken');
const {checkTokenCpanel} = require('../midle/authen');


// http://localhost:3000
router.get('/', async (req, res, next)=> {
  res.render('index')
});
// http://localhost:3000/login
router.get('/login',[checkTokenCpanel], async (req, res, next) => {
  // view
  res.render('user/login');
});
// http://localhost:3000/login
router.post('/login', async (req, res, next) => {

  // code
  // xu li login
  const { email, pass } = req.body;
  const result = await userControll.login(email, pass);

  if (result) {
    
    // make token
    // save token
    const token = jwt.sign({ id: 1, name: "Sang" }, 'secret', { expiresIn: '1d' });
    req.session.token = token;

    return res.redirect('/');
  } else {

    return res.redirect('/login');

  }
});
// http://localhost:3000/logout
router.get('/logout', async(req,res,next)=>{
  req.session.destroy();
  res.redirect('/login');
})

module.exports = router;
