


const async = require('hbs/lib/async');
const productService = require('./ProductServices');


const getAllProducts = async () => {
  try {
    return await productService.getAllProducts();
  } catch (error) {
    throw error;
  }

}


const deleteProductById = async (id) => {
  try {
    return await productService.deleteProductById(id);

  } catch (error) {
    throw error;
  }
}


const addNewProduct = async (name, price, category) => {
  try {
    return await productService.addNewProduct(name, price, quantity, image, category);

  } catch (error) {
    return false;
  }
}
const getproductById = async (id) => {
  try {
    return await productService.getproductById(id);
  } catch (error) {
    return null;
  }
}

const updateProductById = async (id, name, price, quantity, image, category) => {
  try {
    return await productService.updateProductById(id, name, price, quantity, image, category);

  } catch (error) {
    return false;
  }
}


const searchProductByName = async(name) =>{
  try {
    return await productService.searchProductByName(name);
  } catch (error) {
    return null;
  }
}
module.exports = {searchProductByName, updateProductById, getproductById, getAllProducts, deleteProductById, addNewProduct };
