const mongoose = require('mongoose');
const Chef = require('../models/chef');

module.exports = {
  async getChef({ id }) {
    return (
      Chef
        .findById(mongoose.Types.ObjectId(id))
        .lean()
        .exec()
    );
  },

  async getChefs() {
    return (
      Chef
        .find()
        .lean()
        .exec()
    );
  },

  async createChef({
    name, rating,
  }) {
    return (
      await Chef.create({
        name,
        rating
      })
    ).toObject();
  },

  async updateChef({
    id, name, rating
  }) {
    return (
      Chef.findOneAndUpdate({ _id: id }, {
        $set: {
          name,
          rating
        },
      }, { new: true })
    );
  },
};