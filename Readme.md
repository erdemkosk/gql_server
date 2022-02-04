## Run tests

```sh
// Get Single Dish

query getSingleDish($id: ID!) {
    dish(id: $id) {
        name
        country
    }
}
{
  "id": "61fd9c88a00d8a1f26ead08c"
}
///////////////////////////////////////////////
```

```sh
// Add dish
mutation addDish($name: String!, $country: String!, $tasty: Boolean!) {
  addDish(name: $name, country: $country, tasty: $tasty) {
    ... on Dish {
      name
      country
      tasty
    }
  }
}



{
  "name": "Example Dish",
  "country": "TR",
  "tasty" : true
}

/////////////////////////////////////////////////////////////////////
```