const mongoose = require('mongoose');
const Dish = require('../models/dish');

module.exports = {
  async getDish({ id }) {
    return (
      Dish
        .findById(mongoose.Types.ObjectId(id))
        .lean()
        .exec()
    );
  },

  async getDishes() {
    return (
      Dish
        .find()
        .lean()
        .exec()
    );
  },

  async createDish({
    name, country, tasty, chef,
  }) {
    return (
      await Dish.create({
        name,
        country,
        tasty,
        chef : mongoose.Types.ObjectId(chef),
      })
    ).toObject();
  },

  async updateDish({
    id, name, country, tasty, chef,
  }) {
    return (
      Dish.findOneAndUpdate({ _id: id }, {
        $set: {
          name,
          country,
          tasty,
          chef : mongoose.Types.ObjectId(chef),
        },
      }, { new: true })
    );
  },

  async getDishByChefId({
    chef
  }) {
    return (
      Dish
        .find({chef})
        .lean()
        .exec()
    );
  },
};