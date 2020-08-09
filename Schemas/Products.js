const {Schema} = require('mongoose');
module.exports = new Schema({
    category: Schema.Types.ObjectId,
    name: String,
    price: Number,
    description: String,
    url: String
});
