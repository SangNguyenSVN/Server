const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    email: { type: String },
    pass: { type: String },
    role: { type: Number, default: 1 },
})
module.exports = mongoose.models.user || mongoose.model('user', userSchema);
