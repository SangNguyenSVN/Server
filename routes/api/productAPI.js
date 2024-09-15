const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const productControll = require('../../components/product/ProductControl');
const { checkTokenApp } = require('../../midle/authen');
const upload = require('../../midle/uploadFile');


// http:/localhost:3000/api/product

// http:/localhost:3000/api/product/get-all
router.get('/get-all', [checkTokenApp], async (req, res, next) => {
    try {
        const products = await productControll.getAllProducts();
        return res.status(200).json({ result: true, products: products });
    } catch (error) {
        console.log('Get all err: ', error);
        return res.status(500).json({ result: false, products: null });
    }
});


router.get('/upload-image', async (req, res, next) => {
    try {
        const { file } = req;
        if (file) {
            const link = `//${file.image}`
            return res.status(200).json({ result: true, link: link });
        }

        return res.status(400).json({ result: false, link: null });
    } catch (error) {
        console.log('Upload Image Err: ', error);
        return res.status(500).json({ result: false });
    }
});

// http://localhost:3000/api/product/...
router.get('/upload-image', async (req, res, next) => {
    try {
        const { files } = req;
        if (files && files.length > 0) {
            const links = []
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                links.push(``);
            }
            return res.status(200).json({ result: true, links: links });
        }

        return res.status(400).json({ result: false, link: null });
    } catch (error) {
        console.log('Upload Image Err: ', error);
        return res.status(500).json({ result: false });
    }
});
// http://localhost:3000/api/product/get-by-id
router.get('get-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const product = await productControll.getproductById(id);
        return res.status(200).json({ result: true, product: product });

    } catch (error) {
        console.log("Get by id err: ", error);
        return res.status(500).json({ result: false, product: null })
    }
})
// http://localhost:3000/api/product/get-by-name
router.get('search-by-name', async (req, res, next) => {
    try {
        const { name } = req.query;
        const product = await productControll.searchProductByName(name);
        return res.status(200).json({ result: true, product: product });
    } catch (error) {
        console.log("Get by name err: ", error);
        return res.status(500).json({ result: false, product: null })
    }
});
// http://localhost:3000/api/product/new
router.post('/new', [checkTokenApp, upload.single('image')], async (req, res, next) => {
    try {
        let { file, body } = req;
        if (file) {
            file = `http://localhost:3000/uploads/images/${file.filename}`;
            body = { ...body, image: file };
        }
        const { name, price, quantity, image, category } = body;
        await productControll.addNewProduct(name, price, quantity, image, category);

        return res.status(200).json({ result: true, product: product });
    } catch (error) {
        console.log("New Product err: ", error);
        return res.status(500).json({ result: false, product: null })
    }
})


module.exports = router;