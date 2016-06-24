'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _ShopMutations = require('./graphql/ShopMutations');

var _Model = require('./graphql/Model');

var Mutation = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addShop: _ShopMutations.AddShopMutation
    }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: _Model.GraphQLRoot,
    mutation: Mutation
});