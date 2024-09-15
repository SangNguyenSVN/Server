var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const productControl = require("../../components/product/ProductControl");
const CategoryController = require('../../components/category/CategoryController');
const uploadFile = require('../../midle/uploadFile');
const e = require('express');


// hien thi danh sach san pham
// http://localhost:3000

/* GET users listing. */
// http://localhost:3000/cpanel/product
router.get('/', async (req, res, next) => {
    const products = await productControl.getAllProducts();
    res.render('product/list', { products });
});
// hien thi danh sach san pham
router.get('/list', async (req, res, next) => {
    const products = await productControl.getAllProducts();
    res.render('product/list', { products });
});

// http://localhost:3000/cpanel/product/:id/delete
// xoa san pham 
// hien thi danh sach san pham
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await productControl.deleteProductById(id);
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false });
    }

});

// http://localhost:3000/cpanel/product/:id/new
// hien thi san pham
router.get('/new', async (req, res, next) => {
    const categories = await CategoryController.getCategories();
    res.render('product/new', { categories });
});

// http://localhost:3000/cpanel/product/new
// xu li san pham
router.post('/new', [uploadFile.single('image')], async (req, res, next) => {
    try {
        // http://id wifi:3000/
        // detail check id wifi
        let { body, file } = req;
        if (file) {
            file = `http://192.168.1.16:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { name, price, quantity, category, image } = body;
        const result = await productControl.addNewProduct(name, price, quantity, image, category);
        console.log(">>>>>>> body: ", body);

        console.log(">>>>>>> result: ", result);

        if (result) {
            return res.redirect('/cpanel/product');

        } else {
            return res.redirect('/cpanel/product/new');
        }
    } catch (error) {
        next(error);
    }
});


// http://localhost:3000/cpanel/product/:id/edit
// hien thi trang thong tin san pham
router.get('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productControl.getAllProducts(id);
        let categories = await CategoryController.getCategories();
        // categories = categories.map(item => {
        //     item.selected = false;
        //     if (item._id.toString() == product.category.toString()) {
        //         item.selected = true;
        //     }
        //     return item;
        // });
        return res.render('product/edit', { product, categories });
    } catch (error) {
        next(error);

    }

});
// xu li them san pham
router.post('/:id/edit', [uploadFile.single('image')], async (req, res, next) => {
    try {
        // http://id wifi:3000/
        // detail check id wifi
        let { body, file } = req;
        let {id} = req.params;
        if (file) {
            file = `http://192.168.1.16:3000/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { name, price, quantity, category, image } = body;
        const result = await productControl.updateProducyById(id, name, price, quantity, image, category);

        if (result) {
            return res.redirect('/cpanel/product');

        } else {
            return res.redirect(`/cpanel/product/${id}/new`);
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
