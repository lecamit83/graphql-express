const { GraphQLEnumType } = require('graphql');
const { DESCENDING, ASCENDING } = require('../utils/constants');
const OrderByInput = new GraphQLEnumType({
  name : 'OrderBy',
  values : {
    ASC : { value : ASCENDING },
    DESC : { value : DESCENDING }
  }
});

module.exports = OrderByInput;
