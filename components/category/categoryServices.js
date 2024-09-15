const async = require("hbs/lib/async");
const CategoryModel = require("./CategoryModel");

const getCategories = async () => {
    try {
        return await CategoryModel.find();
    } catch (error) {
        console.log("CategoryServices Err: ", error);
    }
}

module.exports = { getCategories };

var data = [{
    "_id": 1,
    "name": "Timmie"
}, {
    "_id": 2,
    "name": "Caresa"
}, {
    "_id": 3,
    "name": "Carin"
}, {
    "_id": 4,
    "name": "Gaylene"
}, {
    "_id": 5,
    "name": "Whitney"
}, {
    "_id": 6,
    "name": "Euphemia"
}, {
    "_id": 7,
    "name": "Misti"
}, {
    "_id": 8,
    "name": "Iver"
}, {
    "_id": 9,
    "name": "Penrod"
}, {
    "_id": 10,
    "name": "Delainey"
}];