const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = new Schema({
  name: {type : String},
  rating: {type : Number}
});

const Chef = mongoose.model('Chef', chefSchema);
module.exports = Chef;