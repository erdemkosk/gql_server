const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const dishSchema = new Schema({
  name: {type : String},
  country:  {type : String},
  tasty:  {type : Boolean},
  chef: {type : ObjectId , ref: 'Chef'},
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;