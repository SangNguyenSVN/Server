const async = require('hbs/lib/async');
const CategoryServices = require('./categoryServices');


const getCategories = async()=>{
    try {
        return await CategoryServices.getCategories();
    } catch (error) {
        console.log("CategoryController Err: ",error);
    }
}

module.exports = {getCategories};