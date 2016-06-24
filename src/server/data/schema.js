import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    AddShopMutation,
} from './graphql/ShopMutations'

import {
    GraphQLRoot
} from './graphql/Model'


var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addShop: AddShopMutation,
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot,
    mutation: Mutation
});
