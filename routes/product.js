var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();


// http://localhost:3000/product
// hien thi danh sach san pham


router.get('/product',async function(req, res, next) {
   
});
// http://localhost:3000/product/list
router.get('/list',async function(req, res, next) {
   res.render('product/list');
});

router.get('/', function(req, res, next) {
   res.send('respond with a resource');
 });

module.exports = router;