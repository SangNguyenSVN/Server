const mongooes = require('mongoose');
const Schema = mongooes.Schema;
const ObjectId = Schema.ObjectId;


const categorySchema =new Schema({
    id:{type: ObjectId},
    name:{type: String },
});

module.exports = mongooes.models.category || mongooes.model('category', categorySchema);