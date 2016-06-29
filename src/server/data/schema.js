import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    AddShopMutation,
} from './graphql/ShopMutations'

import {
    AddUserMutation
} from './graphql/UserMutation'

import {
    GraphQLRoot
} from './graphql/Model'


var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addShop: AddShopMutation,
        addUser: AddUserMutation
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot,
    mutation: Mutation
});
