const async = require("hbs/lib/async");
const productModel = require('./ProductModel');



const getAllProducts = async (size, page) => {
  try {
    return await productModel.find();
  } catch (error) {
    console.log("Err GetAllProduct from ProductService: ", error);
    throw error;
  }

}

const deleteProductById = async (id) => {
  try {
    const index = date.findIndex(item => item._id.toString() == id.toString());
    if (index >= 0) {
      data.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.log("Err DeleteProductById from ProductService: ", error);
    throw error;
  }

}
// add new product
const addNewProduct = async (name, price, quantity, image, category) => {
  try {
    // const newProduct = {
    //   _id: data.length + 1,
    //   name, price, quantity, image, category
    // }
    // data.push(newProduct);

    const newProduct = { name, price, quantity, image, category }
    const p = new productModel(newProduct);
    await p.save;
    return true;
  } catch (error) {
    console.log("Err AddNewProduct: ", error);
    return false;
  }
}

const getproductById = async (id) => {
  try {
    const product = data.find(item => item._id.toString() == id.toString());
    if (product) {
      return product;
    }
    return null;
  } catch (error) {
    console.log('Err get product by id: ', error);
    return null;
  }
}
// update product by id

const updateProductById = async (id, name, price, quantity, image, category) => {
  try {
    const product = data.find(item => item._id.toString() == id.toString());
    if (product) {
      data = data.map(item => {
        if (item._id.toString() == id.toString()) {
          item.name = name ? name : item.name;
          item.price = price ? price : item.price;
          item.quantity = quantity ? quantity : item.quantity;
          item.image = image ? image : item.image;
          item.category = category ? category : item.category;
        }
        return item;
      });
      return true;
    }
    return false;
  } catch (error) {
    console.log('Err update product by id: ', error);
    return false;
  }
}

const searchProductByName = async (name) => {
  try {
    return await product.find({ name: { $regex: name, $option: 'i' } });

  } catch (error) {
    console.log("Search By Name Err: ", error);
  }
}
module.exports = { searchProductByName, updateProductById, getproductById, getAllProducts, deleteProductById, addNewProduct };

var data = [{
  "_id": 20,
  "name": "Heller-Konopelski",
  "price": 932,
  "quantity": 61,
  "image": "http://dummyimage.com/136x100.png/cc0000/ffffff",
  "category": 6
}, {
  "_id": 19,
  "name": "Morar, Grimes and O'Kon",
  "price": 593,
  "quantity": 73,
  "image": "http://dummyimage.com/167x100.png/ff4444/ffffff",
  "category": 10
}];

