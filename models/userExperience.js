// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const ue = new Schema({
//     userName: String,
//     rating: Number,
// });

// module.exports = mongoose.model('userexperience', ue);

const model = require('./');

module.exports = model('userexperience');
