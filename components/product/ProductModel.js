const mongooes = require('mongoose');
const Schema = mongooes.Schema;
const ObjectId = Schema.ObjectId;

/* GET users listing. */
const productSchema =new Schema({
  id:{type: ObjectId},
  name:{type: String },
  price:{type: Number},
  quantity:{type: Number},
  image:{type: String},
  category:{type: ObjectId, ref: 'category'},
});
module.exports = mongooes.models.prodcut || mongooes.model('product', productSchema);
