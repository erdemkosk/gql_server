const graphql = require('graphql');

const DishDataAccess = require('../data/data-access/dish');


const ChefDataAccess = require('../data/data-access/chef');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const DishType = new GraphQLObjectType({
  name: 'Dish',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    tasty: {
      type: GraphQLBoolean
    },
    country: {
      type: GraphQLString
    },
    chefs: {
      type: ChefType,
      resolve(parent, args) {
        return ChefDataAccess.getChef({id : parent.chefsId})
      }
    }
  })
});

const ChefType = new GraphQLObjectType({
  name: 'chefs',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    rating: {
      type: GraphQLFloat
    },
    dish: {
      type: new GraphQLList(DishType),
      resolve(parent, args) {
        return DishDataAccess.getDishByChefId({chef})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dish: {
      type: DishType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return DishDataAccess.getDish({id : args.id})
      }
    },
    chefs: {
      type: ChefType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return DishDataAccess.getDishByChefId({chef: args.id})
      }
    },
    dishes: {
      type: new GraphQLList(DishType),
      resolve(parent, args) {
        return DishDataAccess.getDishes();
      }
    },
    chefs: {
      type: new GraphQLList(ChefType),
      resolve(parent, args) {
        return ChefDataAccess.getChefs();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDish: {
      type: DishType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        country: {
          type: new GraphQLNonNull(GraphQLString)
        },
        tasty: {
          type: new GraphQLNonNull(GraphQLBoolean)
        }
      },
      resolve(parent, args) {
        return DishDataAccess.createDish({name :args.name , country : args.country, tasty :args.tasty});
      }
    },
    addChef: {
      type: ChefType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        rating: {
          type: new GraphQLNonNull(GraphQLFloat)
        }
      },
      resolve(parent, args) {
        return ChefDataAccess.createChef({ name: args.name, rating:args.rating ,});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});