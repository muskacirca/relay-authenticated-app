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
    AddFileMutation
} from './graphql/FileMutation'


import {
    GraphQLRoot
} from './graphql/Model'


var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addShop: AddShopMutation,
        addUser: AddUserMutation,
        addFile: AddFileMutation
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot,
    mutation: Mutation
});
